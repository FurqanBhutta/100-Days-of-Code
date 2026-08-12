import dbConnect from "@/lib/dbConnect";
import Teacher from "@/Models/Teacher";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const teacher = await Teacher.findById(id).populate("userId", "username email isActive");
  if (!teacher) return fail("Teacher not found", 404);

  return success(teacher);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const teacher = await Teacher.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!teacher) return fail("Teacher not found", 404);

  return success(teacher);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) return fail("Teacher not found", 404);

  return success({ message: "Teacher deleted successfully" });
});
