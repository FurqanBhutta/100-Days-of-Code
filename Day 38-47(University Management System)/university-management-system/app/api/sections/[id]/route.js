import dbConnect from "@/lib/dbConnect";
import Section from "@/Models/Section";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const section = await Section.findById(id)
    .populate("departmentId", "name code")
    .populate("semesterId", "name number");

  if (!section) return fail("Section not found", 404);

  return success(section);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const section = await Section.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!section) return fail("Section not found", 404);

  return success(section);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const section = await Section.findByIdAndDelete(id);
  if (!section) return fail("Section not found", 404);

  return success({ message: "Section deleted successfully" });
});
