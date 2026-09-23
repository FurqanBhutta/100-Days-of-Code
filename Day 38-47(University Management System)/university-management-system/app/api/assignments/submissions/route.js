import dbConnect from "@/lib/dbConnect";
import Submission from "@/Models/Submission";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/assignments/submissions?assignmentId=&studentId=
export const GET = withErrorHandling(async (request) => {
  const { session, error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const assignmentId = searchParams.get("assignmentId");
  let studentId = searchParams.get("studentId");

  const filter = {};
  if (assignmentId) filter.assignmentId = assignmentId;

  // Students may only view their own submissions
  if (session.role === "student") {
    const student = await Student.findOne({ userId: session.id });
    if (!student) return fail("Student profile not found", 404);
    filter.studentId = student._id;
  } else if (studentId) {
    filter.studentId = studentId;
  }

  const submissions = await Submission.find(filter)
    .populate("assignmentId", "title dueDate totalMarks")
    .populate("studentId", "firstName lastName registrationNumber")
    .sort({ submittedAt: -1 });

  return success(submissions);
});

// POST /api/assignments/submissions - student submits an assignment
export const POST = withErrorHandling(async (request) => {
  const { session, error } = await requireRole(["student"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const { assignmentId, fileURL } = body;

  if (!assignmentId || !fileURL) {
    return fail("assignmentId and fileURL are required", 400);
  }

  await dbConnect();

  const student = await Student.findOne({ userId: session.id });
  if (!student) return fail("Student profile not found", 404);

  const existing = await Submission.findOne({ assignmentId, studentId: student._id });
  if (existing) {
    return fail("You have already submitted this assignment. Use PATCH to update it.", 409);
  }

  const submission = await Submission.create({
    assignmentId,
    studentId: student._id,
    fileURL,
    submittedAt: new Date(),
  });

  return success(submission, 201);
});
