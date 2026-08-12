import dbConnect from "@/lib/dbConnect";
import Section from "@/Models/Section";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/sections?departmentId=&semesterId=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");
  const semesterId = searchParams.get("semesterId");

  const filter = {};
  if (departmentId) filter.departmentId = departmentId;
  if (semesterId) filter.semesterId = semesterId;

  const sections = await Section.find(filter)
    .populate("departmentId", "name code")
    .populate("semesterId", "name number")
    .sort({ name: 1 });

  return success(sections);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.name || !body.departmentId || !body.semesterId) {
    return fail("name, departmentId and semesterId are required", 400);
  }

  await dbConnect();

  const section = await Section.create(body);
  return success(section, 201);
});
