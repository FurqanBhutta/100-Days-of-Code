import dbConnect from "@/lib/dbConnect";
import Assignment from "@/Models/Assignment";
import Teacher from "@/Models/Teacher";
import ClassOffering from "@/Models/ClassOffering";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/assignments?classOfferingId=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const classOfferingId = searchParams.get("classOfferingId");

  const filter = {};
  if (classOfferingId) filter.classOfferingID = classOfferingId;

  const assignments = await Assignment.find(filter)
    .populate({ path: "classOfferingID", populate: [{ path: "courseId", select: "title code" }] })
    .sort({ dueDate: -1 });

  return success(assignments);
});

export const POST = withErrorHandling(async (request) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const { classOfferingID, title, description, dueDate, totalMarks } = body;

  if (!classOfferingID || !title || !description || !dueDate || totalMarks === undefined) {
    return fail("classOfferingID, title, description, dueDate and totalMarks are required", 400);
  }

  await dbConnect();

  if (session.role === "teacher") {
    const teacher = await Teacher.findOne({ userId: session.id });
    const classOffering = await ClassOffering.findById(classOfferingID);
    if (!teacher || !classOffering || classOffering.teacherId.toString() !== teacher._id.toString()) {
      return fail("You can only create assignments for your own classes", 403);
    }
  }

  const assignment = await Assignment.create(body);
  return success(assignment, 201);
});
