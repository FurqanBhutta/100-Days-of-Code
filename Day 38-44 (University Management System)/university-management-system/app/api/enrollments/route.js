import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/Models/Enrollment";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/enrollments?studentId=&classOfferingId=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const classOfferingId = searchParams.get("classOfferingId");

  const filter = {};
  if (studentId) filter.studentId = studentId;
  if (classOfferingId) filter.classOfferingId = classOfferingId;

  const enrollments = await Enrollment.find(filter)
    .populate("studentId", "firstName lastName registrationNumber")
    .populate({
      path: "classOfferingId",
      populate: [
        { path: "courseId", select: "title code" },
        { path: "sectionId", select: "name" },
      ],
    })
    .sort({ createdAt: -1 });

  return success(enrollments);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.studentId || !body.classOfferingId) {
    return fail("studentId and classOfferingId are required", 400);
  }

  await dbConnect();

  const existing = await Enrollment.findOne({
    studentId: body.studentId,
    classOfferingId: body.classOfferingId,
  });
  if (existing) {
    return fail("Student is already enrolled in this class offering", 409);
  }

  const enrollment = await Enrollment.create(body);
  return success(enrollment, 201);
});
