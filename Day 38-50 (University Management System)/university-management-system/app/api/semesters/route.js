import dbConnect from "@/lib/dbConnect";
import Semester from "@/Models/Semester";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const isActive = searchParams.get("isActive");

  const filter = {};
  if (isActive !== null && isActive !== undefined && isActive !== "") {
    filter.isActive = isActive === "true";
  }

  const semesters = await Semester.find(filter).sort({ number: 1 });
  return success(semesters);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.name || body.number === undefined) {
    return fail("name and number are required", 400);
  }

  await dbConnect();

  const semester = await Semester.create(body);
  return success(semester, 201);
});
