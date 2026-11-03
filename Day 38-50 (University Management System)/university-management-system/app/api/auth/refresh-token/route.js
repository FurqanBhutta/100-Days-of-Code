import { cookies } from "next/headers";
import {
  REFRESH_COOKIE_NAME,
  verifyRefreshToken,
  signAccessToken,
  setAuthCookies,
  signRefreshToken,
} from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const POST = withErrorHandling(async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return fail("No refresh token provided. Please log in again.", 401);
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return fail("Refresh token is invalid or expired. Please log in again.", 401);
  }

  const payload = { id: decoded.id, role: decoded.role };
  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload); // rotate refresh token

  await setAuthCookies({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  return success({ message: "Token refreshed" });
});
