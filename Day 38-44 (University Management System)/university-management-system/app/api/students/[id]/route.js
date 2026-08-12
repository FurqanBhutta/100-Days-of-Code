import dbConnect from "@/lib/dbConnect";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const student = await Student.findById(id)
    .populate("userId", "username email isActive")
    .populate("departmentId", "name code")
    .populate("semesterId", "name number")
    .populate("sectionId", "name");

  if (!student) return fail("Student not found", 404);

  return success(student);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const student = await Student.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!student) return fail("Student not found", 404);

  return success(student);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const student = await Student.findByIdAndDelete(id);
  if (!student) return fail("Student not found", 404);

  return success({ message: "Student deleted successfully" });
});
