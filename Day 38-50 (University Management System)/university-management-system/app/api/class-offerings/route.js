import dbConnect from "@/lib/dbConnect";
import ClassOffering from "@/Models/ClassOffering";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/class-offerings?courseId=&teacherId=&departmentId=&semesterId=&sectionId=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const filterFields = ["courseId", "teacherId", "departmentId", "semesterId", "sectionId", "session"];
  const filter = {};
  for (const field of filterFields) {
    const value = searchParams.get(field);
    if (value) filter[field] = value;
  }

  const classOfferings = await ClassOffering.find(filter)
    .populate("courseId", "title code credits")
    .populate("teacherId", "name employeeId")
    .populate("departmentId", "name code")
    .populate("semesterId", "name number")
    .populate("sectionId", "name")
    .sort({ createdAt: -1 });

  return success(classOfferings);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const required = ["courseId", "teacherId", "departmentId", "semesterId", "sectionId", "session"];
  const missing = required.filter((f) => !body[f]);
  if (missing.length) {
    return fail(`Missing required fields: ${missing.join(", ")}`, 400);
  }

  await dbConnect();

  const classOffering = await ClassOffering.create(body);
  return success(classOffering, 201);
});
