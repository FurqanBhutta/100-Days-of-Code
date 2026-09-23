import dbConnect from "@/lib/dbConnect";
import Course from "@/Models/Course";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const course = await Course.findById(id).populate("departmentId", "name code");
  if (!course) return fail("Course not found", 404);

  return success(course);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const course = await Course.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!course) return fail("Course not found", 404);

  return success(course);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const course = await Course.findByIdAndDelete(id);
  if (!course) return fail("Course not found", 404);

  return success({ message: "Course deleted successfully" });
});
