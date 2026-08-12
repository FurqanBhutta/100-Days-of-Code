import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/users?role=&isActive=&page=&limit=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const isActive = searchParams.get("isActive");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const filter = {};
  if (role) filter.role = role;
  if (isActive !== null && isActive !== undefined && isActive !== "") {
    filter.isActive = isActive === "true";
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return success(users, 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// POST /api/users
export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const { username, email, password, role, isActive } = body;

  if (!username || !email || !password) {
    return fail("username, email and password are required", 400);
  }

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    isActive,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return success(userObj, 201);
});
