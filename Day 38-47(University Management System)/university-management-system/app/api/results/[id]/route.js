import dbConnect from "@/lib/dbConnect";
import Result from "@/Models/Result";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const result = await Result.findById(id)
    .populate("studentId", "firstName lastName registrationNumber userId")
    .populate({ path: "classOfferingId", populate: [{ path: "courseId", select: "title code" }] });

  if (!result) return fail("Result not found", 404);

  if (session.role === "student") {
    const student = await Student.findOne({ userId: session.id });
    if (!student || result.studentId._id.toString() !== student._id.toString()) {
      return fail("Forbidden", 403);
    }
  }

  return success(result);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const result = await Result.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!result) return fail("Result not found", 404);

  return success(result);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const result = await Result.findByIdAndDelete(id);
  if (!result) return fail("Result not found", 404);

  return success({ message: "Result deleted successfully" });
});
