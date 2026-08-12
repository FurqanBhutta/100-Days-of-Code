import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const user = await User.findById(id).select("-password");
  if (!user) return fail("User not found", 404);

  return success(user);
});

export const PATCH = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  const body = await request.json();

  // Password changes go through /api/auth/change-password
  delete body.password;

  await dbConnect();

  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) return fail("User not found", 404);

  return success(user);
});

export const DELETE = withErrorHandling(async (request, { params }) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const { id } = await params;
  await dbConnect();

  const user = await User.findByIdAndDelete(id);
  if (!user) return fail("User not found", 404);

  return success({ message: "User deleted successfully" });
});
