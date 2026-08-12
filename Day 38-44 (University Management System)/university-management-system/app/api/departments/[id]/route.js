import dbConnect from "@/lib/dbConnect";
import Department from "@/Models/Department";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const department = await Department.findById(id).populate("hod", "name employeeId");
  if (!department) return fail("Department not found", 404);

  return success(department);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const department = await Department.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!department) return fail("Department not found", 404);

  return success(department);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const department = await Department.findByIdAndDelete(id);
  if (!department) return fail("Department not found", 404);

  return success({ message: "Department deleted successfully" });
});
