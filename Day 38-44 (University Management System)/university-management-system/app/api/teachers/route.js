import dbConnect from "@/lib/dbConnect";
import Teacher from "@/Models/Teacher";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/teachers?search=&page=&limit=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { employeeId: { $regex: search, $options: "i" } },
    ];
  }

  const [teachers, total] = await Promise.all([
    Teacher.find(filter)
      .populate("userId", "username email isActive")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Teacher.countDocuments(filter),
  ]);

  return success(teachers, 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// POST /api/teachers
export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const required = ["userId", "employeeId", "name", "phoneNumber"];
  const missing = required.filter((f) => !body[f]);
  if (missing.length) {
    return fail(`Missing required fields: ${missing.join(", ")}`, 400);
  }

  await dbConnect();

  const teacher = await Teacher.create(body);
  return success(teacher, 201);
});
