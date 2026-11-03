import dbConnect from "@/lib/dbConnect";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// Fields a student is allowed to self-edit. Academic fields (department,
// semester, section, registrationNumber, cgpa) are managed by admins only.
const EDITABLE_FIELDS = ["phoneNumber", "address", "profilePicture"];

export const GET = withErrorHandling(async () => {
  const { session, error } = await requireRole(["student"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const student = await Student.findOne({ userId: session.id })
    .populate("departmentId", "name code")
    .populate("semesterId", "name number")
    .populate("sectionId", "name");

  if (!student) return fail("Student profile not found", 404);

  return success(student);
});

export const PATCH = withErrorHandling(async (request) => {
  const { session, error } = await requireRole(["student"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const updates = {};
  for (const field of EDITABLE_FIELDS) {
    if (body[field] !== undefined) updates[field] = body[field];
  }

  await dbConnect();

  const student = await Student.findOneAndUpdate({ userId: session.id }, updates, {
    new: true,
    runValidators: true,
  });

  if (!student) return fail("Student profile not found", 404);

  return success(student);
});
