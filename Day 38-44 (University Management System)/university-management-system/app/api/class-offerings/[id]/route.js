import dbConnect from "@/lib/dbConnect";
import ClassOffering from "@/Models/ClassOffering";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const classOffering = await ClassOffering.findById(id)
    .populate("courseId", "title code credits")
    .populate("teacherId", "name employeeId")
    .populate("departmentId", "name code")
    .populate("semesterId", "name number")
    .populate("sectionId", "name");

  if (!classOffering) return fail("Class offering not found", 404);

  return success(classOffering);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const classOffering = await ClassOffering.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!classOffering) return fail("Class offering not found", 404);

  return success(classOffering);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const classOffering = await ClassOffering.findByIdAndDelete(id);
  if (!classOffering) return fail("Class offering not found", 404);

  return success({ message: "Class offering deleted successfully" });
});
