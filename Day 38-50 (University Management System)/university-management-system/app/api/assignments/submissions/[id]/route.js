import dbConnect from "@/lib/dbConnect";
import Submission from "@/Models/Submission";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const submission = await Submission.findById(id)
    .populate("assignmentId", "title dueDate totalMarks")
    .populate("studentId", "firstName lastName registrationNumber userId");

  if (!submission) return fail("Submission not found", 404);

  if (session.role === "student" && submission.studentId.userId.toString() !== session.id) {
    return fail("Forbidden", 403);
  }

  return success(submission);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { session, error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  await dbConnect();

  const submission = await Submission.findById(id).populate("studentId", "userId");
  if (!submission) return fail("Submission not found", 404);

  if (session.role === "student") {
    if (submission.studentId.userId.toString() !== session.id) {
      return fail("Forbidden", 403);
    }
    if (submission.marksObtained !== null) {
      return fail("Cannot resubmit after grading", 400);
    }
    if (body.fileURL) submission.fileURL = body.fileURL;
    submission.submittedAt = new Date();
  } else if (["admin", "teacher"].includes(session.role)) {
    if (body.marksObtained !== undefined) submission.marksObtained = body.marksObtained;
  }

  await submission.save();
  return success(submission);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const submission = await Submission.findByIdAndDelete(id);
  if (!submission) return fail("Submission not found", 404);

  return success({ message: "Submission deleted successfully" });
});
