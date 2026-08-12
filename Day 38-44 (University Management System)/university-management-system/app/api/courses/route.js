import dbConnect from "@/lib/dbConnect";
import Course from "@/Models/Course";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/courses?departmentId=&search=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");
  const search = searchParams.get("search");

  const filter = {};
  if (departmentId) filter.departmentId = departmentId;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { code: { $regex: search, $options: "i" } },
    ];
  }

  const courses = await Course.find(filter).populate("departmentId", "name code").sort({ title: 1 });
  return success(courses);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.title || !body.code || body.credits === undefined) {
    return fail("title, code and credits are required", 400);
  }

  await dbConnect();

  const course = await Course.create(body);
  return success(course, 201);
});
