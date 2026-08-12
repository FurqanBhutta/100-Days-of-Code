import dbConnect from "@/lib/dbConnect";
import Notice from "@/Models/Notice";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const notice = await Notice.findById(id)
    .populate("createdBy", "username role")
    .populate("departmentId", "name code");

  if (!notice) return fail("Notice not found", 404);

  return success(notice);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const notice = await Notice.findById(id);
  if (!notice) return fail("Notice not found", 404);

  if (session.role === "teacher" && notice.createdBy.toString() !== session.id) {
    return fail("You can only edit notices you created", 403);
  }

  Object.assign(notice, body);
  await notice.save();

  return success(notice);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const notice = await Notice.findById(id);
  if (!notice) return fail("Notice not found", 404);

  if (session.role === "teacher" && notice.createdBy.toString() !== session.id) {
    return fail("You can only delete notices you created", 403);
  }

  await Notice.findByIdAndDelete(id);
  return success({ message: "Notice deleted successfully" });
});
