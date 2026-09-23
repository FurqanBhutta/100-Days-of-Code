import dbConnect from "@/lib/dbConnect";
import Result from "@/Models/Result";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/results?studentId=&classOfferingId=
export const GET = withErrorHandling(async (request) => {
  const { session, error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const classOfferingId = searchParams.get("classOfferingId");
  let studentId = searchParams.get("studentId");

  const filter = {};
  if (classOfferingId) filter.classOfferingId = classOfferingId;

  if (session.role === "student") {
    const student = await Student.findOne({ userId: session.id });
    if (!student) return fail("Student profile not found", 404);
    filter.studentId = student._id;
  } else if (studentId) {
    filter.studentId = studentId;
  }

  const results = await Result.find(filter)
    .populate("studentId", "firstName lastName registrationNumber")
    .populate({ path: "classOfferingId", populate: [{ path: "courseId", select: "title code" }] })
    .sort({ createdAt: -1 });

  return success(results);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const { classOfferingId, studentId, totalMarks, grade } = body;

  if (!classOfferingId || !studentId || totalMarks === undefined || !grade) {
    return fail("classOfferingId, studentId, totalMarks and grade are required", 400);
  }

  await dbConnect();

  const result = await Result.create(body);
  return success(result, 201);
});
