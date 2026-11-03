import dbConnect from "@/lib/dbConnect";
import Assignment from "@/Models/Assignment";
import Teacher from "@/Models/Teacher";
import ClassOffering from "@/Models/ClassOffering";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const assignment = await Assignment.findById(id).populate({
    path: "classOfferingID",
    populate: [{ path: "courseId", select: "title code" }],
  });

  if (!assignment) return fail("Assignment not found", 404);

  return success(assignment);
});

async function assertTeacherOwnsAssignment(session, assignment) {
  if (session.role !== "teacher") return null;
  const teacher = await Teacher.findOne({ userId: session.id });
  const classOffering = await ClassOffering.findById(assignment.classOfferingID);
  if (!teacher || !classOffering || classOffering.teacherId.toString() !== teacher._id.toString()) {
    return { message: "You can only modify assignments for your own classes", status: 403 };
  }
  return null;
}

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const existing = await Assignment.findById(id);
  if (!existing) return fail("Assignment not found", 404);

  const ownershipError = await assertTeacherOwnsAssignment(session, existing);
  if (ownershipError) return fail(ownershipError.message, ownershipError.status);

  const assignment = await Assignment.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  return success(assignment);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const existing = await Assignment.findById(id);
  if (!existing) return fail("Assignment not found", 404);

  const ownershipError = await assertTeacherOwnsAssignment(session, existing);
  if (ownershipError) return fail(ownershipError.message, ownershipError.status);

  await Assignment.findByIdAndDelete(id);
  return success({ message: "Assignment deleted successfully" });
});
