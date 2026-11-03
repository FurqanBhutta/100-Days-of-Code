import dbConnect from "@/lib/dbConnect";
import Student from "@/Models/Student";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/students?departmentId=&semesterId=&sectionId=&search=&page=&limit=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");
  const semesterId = searchParams.get("semesterId");
  const sectionId = searchParams.get("sectionId");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const filter = {};
  if (departmentId) filter.departmentId = departmentId;
  if (semesterId) filter.semesterId = semesterId;
  if (sectionId) filter.sectionId = sectionId;
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { registrationNumber: { $regex: search, $options: "i" } },
    ];
  }

  const [students, total] = await Promise.all([
    Student.find(filter)
      .populate("userId", "username email isActive")
      .populate("departmentId", "name code")
      .populate("semesterId", "name number")
      .populate("sectionId", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Student.countDocuments(filter),
  ]);

  return success(students, 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// POST /api/students
export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const required = [
    "userId",
    "registrationNumber",
    "firstName",
    "lastName",
    "departmentId",
    "semesterId",
    "sectionId",
    "phoneNumber",
    "address",
    "dateOfBirth",
  ];
  const missing = required.filter((f) => !body[f]);
  if (missing.length) {
    return fail(`Missing required fields: ${missing.join(", ")}`, 400);
  }

  await dbConnect();

  const student = await Student.create(body);
  return success(student, 201);
});
