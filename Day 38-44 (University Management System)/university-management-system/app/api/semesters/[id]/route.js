import dbConnect from "@/lib/dbConnect";
import Semester from "@/Models/Semester";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const semester = await Semester.findById(id);
  if (!semester) return fail("Semester not found", 404);

  return success(semester);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const semester = await Semester.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!semester) return fail("Semester not found", 404);

  return success(semester);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const semester = await Semester.findByIdAndDelete(id);
  if (!semester) return fail("Semester not found", 404);

  return success({ message: "Semester deleted successfully" });
});
