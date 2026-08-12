import { NextResponse } from "next/server";

export function success(data, status = 200, extra = {}) {
  return NextResponse.json({ success: true, data, ...extra }, { status });
}

export function fail(message = "Something went wrong", status = 500, details = undefined) {
  return NextResponse.json(
    { success: false, message, ...(details ? { details } : {}) },
    { status }
  );
}

/**
 * Wraps a route handler with a try/catch so every route returns a
 * consistent error shape instead of a raw 500 HTML page.
 */
export function withErrorHandling(handler) {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (err) {
      console.error("API Error:", err);

      if (err.name === "ValidationError") {
        return fail("Validation failed", 400, err.errors);
      }
      if (err.code === 11000) {
        return fail("Duplicate value for a unique field", 409, err.keyValue);
      }
      if (err.name === "CastError") {
        return fail("Invalid ID format", 400);
      }

      return fail(err.message || "Internal Server Error", 500);
    }
  };
}
