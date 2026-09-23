import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import { requireAuth } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";
import { NextResponse } from "next/server";

export const GET = withErrorHandling(async () => {
  const { session, error } = await requireAuth();
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const user = await User.findById(session.id).select("-password");
  if (!user) return fail("User not found", 404);

  return NextResponse.json({
    success: true,
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});
