import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const ACCESS_COOKIE_NAME = "accessToken";
export const REFRESH_COOKIE_NAME = "refreshToken";


export function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export async function setAuthCookies({ accessToken, refreshToken }) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE_NAME, accessToken, {
    ...baseCookieOptions,
    maxAge: 60 * 15, // 15 minutes
  });
  cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
    ...baseCookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE_NAME, "", { ...baseCookieOptions, maxAge: 0 });
  cookieStore.set(REFRESH_COOKIE_NAME, "", { ...baseCookieOptions, maxAge: 0 });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return { session: null, error: { message: "Unauthorized. Please log in.", status: 401 } };
  }
  return { session, error: null };
}

export async function requireRole(roles = []) {
  const { session, error } = await requireAuth();
  if (error) return { session: null, error };

  if (roles.length > 0 && !roles.includes(session.role)) {
    return {
      session: null,
      error: { message: "Forbidden. You do not have access to this resource.", status: 403 },
    };
  }

  return { session, error: null };
}
