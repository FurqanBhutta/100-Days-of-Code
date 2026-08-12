import dbConnect from "@/lib/dbConnect";
import Notice from "@/Models/Notice";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/notices?departmentId=&classOfferingId=
export const GET = withErrorHandling(async (request) => {
  const { session, error } = await requireRole([]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");
  const classOfferingId = searchParams.get("classOfferingId");

  const filter = {};
  if (departmentId) filter.departmentId = departmentId;
  if (classOfferingId) filter.classOfferingId = classOfferingId;

  // Non-admins only see notices meant for their role (or "all")
  if (session.role !== "admin") {
    filter.audience = { $in: [session.role === "student" ? "students" : "teachers", "all"] };
  }

  const notices = await Notice.find(filter)
    .populate("createdBy", "username role")
    .populate("departmentId", "name code")
    .sort({ createdAt: -1 });

  return success(notices);
});

export const POST = withErrorHandling(async (request) => {
  const { session, error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  const { title, description, audience } = body;

  if (!title || !description || !audience) {
    return fail("title, description and audience are required", 400);
  }

  await dbConnect();

  const notice = await Notice.create({ ...body, createdBy: session.id });
  return success(notice, 201);
});
