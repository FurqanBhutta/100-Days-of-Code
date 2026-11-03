import dbConnect from "@/lib/dbConnect";
import Attendance from "@/Models/Attendance";
import Teacher from "@/Models/Teacher";
import ClassOffering from "@/Models/ClassOffering";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/attendance?studentId=&classOfferingId=&date=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const classOfferingId = searchParams.get("classOfferingId");
  const date = searchParams.get("date");

  const filter = {};
  if (studentId) filter.studentId = studentId;
  if (classOfferingId) filter.classOfferingId = classOfferingId;
  if (date) {
    const day = new Date(date);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    filter.date = { $gte: day, $lt: nextDay };
  }

  const records = await Attendance.find(filter)
    .populate("studentId", "firstName lastName registrationNumber")
    .populate({ path: "classOfferingId", populate: [{ path: "courseId", select: "title code" }] })
    .sort({ date: -1 });

  return success(records);
});

export const POST = withErrorHandling(async (request) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  await dbConnect();

  // Teachers may only mark attendance for their own classes
  if (session.role === "teacher") {
    const teacher = await Teacher.findOne({ userId: session.id });
    const classOffering = await ClassOffering.findById(body.classOfferingId);
    if (!teacher || !classOffering || classOffering.teacherId.toString() !== teacher._id.toString()) {
      return fail("You can only mark attendance for your own classes", 403);
    }
  }

  if (Array.isArray(body.records)) {
    if (!body.classOfferingId || !body.date) {
      return fail("classOfferingId and date are required for bulk attendance", 400);
    }

    const ops = body.records.map((r) => ({
      updateOne: {
        filter: {
          classOfferingId: body.classOfferingId,
          studentId: r.studentId,
          date: new Date(body.date),
        },
        update: {
          $set: {
            classOfferingId: body.classOfferingId,
            studentId: r.studentId,
            date: new Date(body.date),
            status: r.status,
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);
    return success({ message: `Attendance marked for ${ops.length} students` }, 201);
  }

  const { classOfferingId, studentId, date, status } = body;
  if (!classOfferingId || !studentId || !date || !status) {
    return fail("classOfferingId, studentId, date and status are required", 400);
  }

  const record = await Attendance.findOneAndUpdate(
    { classOfferingId, studentId, date: new Date(date) },
    { classOfferingId, studentId, date: new Date(date), status },
    { new: true, upsert: true, runValidators: true }
  );

  return success(record, 201);
});
