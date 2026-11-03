import dbConnect from "@/lib/dbConnect";
import Teacher from "@/Models/Teacher";
import ClassOffering from "@/Models/ClassOffering";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// Equivalent to /api/teachers/classes - kept here to match the spec'd route tree.
export const GET = withErrorHandling(async () => {
  const { session, error } = await requireRole(["teacher"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const teacher = await Teacher.findOne({ userId: session.id });
  if (!teacher) return fail("Teacher profile not found", 404);

  const classOfferings = await ClassOffering.find({ teacherId: teacher._id })
    .populate("courseId", "title code credits")
    .populate("departmentId", "name code")
    .populate("semesterId", "name number")
    .populate("sectionId", "name")
    .sort({ createdAt: -1 });

  return success(classOfferings);
});
