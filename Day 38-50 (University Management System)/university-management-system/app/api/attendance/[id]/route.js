import dbConnect from "@/lib/dbConnect";
import Attendance from "@/Models/Attendance";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const record = await Attendance.findById(id)
    .populate("studentId", "firstName lastName registrationNumber")
    .populate({ path: "classOfferingId", populate: [{ path: "courseId", select: "title code" }] });

  if (!record) return fail("Attendance record not found", 404);

  return success(record);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const record = await Attendance.findByIdAndUpdate(
    id,
    { status: body.status },
    { new: true, runValidators: true }
  );

  if (!record) return fail("Attendance record not found", 404);

  return success(record);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const record = await Attendance.findByIdAndDelete(id);
  if (!record) return fail("Attendance record not found", 404);

  return success({ message: "Attendance record deleted successfully" });
});
