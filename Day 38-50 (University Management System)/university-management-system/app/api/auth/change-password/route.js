import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import { requireAuth } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const PATCH = withErrorHandling(async (request) => {
  const { session, error } = await requireAuth();
  if (error) return fail(error.message, error.status);

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return fail("Current password and new password are required", 400);
  }
  if (newPassword.length < 8) {
    return fail("New password must be at least 8 characters", 400);
  }

  await dbConnect();

  const user = await User.findById(session.id);
  if (!user) return fail("User not found", 404);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return fail("Current password is incorrect", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return success({ message: "Password updated successfully" });
});
