import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/Models/Enrollment";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const enrollment = await Enrollment.findById(id)
    .populate("studentId", "firstName lastName registrationNumber")
    .populate({
      path: "classOfferingId",
      populate: [{ path: "courseId", select: "title code" }],
    });

  if (!enrollment) return fail("Enrollment not found", 404);

  return success(enrollment);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const enrollment = await Enrollment.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!enrollment) return fail("Enrollment not found", 404);

  return success(enrollment);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const enrollment = await Enrollment.findByIdAndDelete(id);
  if (!enrollment) return fail("Enrollment not found", 404);

  return success({ message: "Enrollment deleted successfully" });
});
