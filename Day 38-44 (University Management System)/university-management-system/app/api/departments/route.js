import dbConnect from "@/lib/dbConnect";
import Department from "@/Models/Department";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole([]); // any authenticated user
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { code: { $regex: search, $options: "i" } },
    ];
  }

  const departments = await Department.find(filter)
    .populate("hod", "name employeeId")
    .sort({ name: 1 });

  return success(departments);
});

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  const body = await request.json();
  if (!body.name || !body.code) {
    return fail("name and code are required", 400);
  }

  await dbConnect();

  const department = await Department.create(body);
  return success(department, 201);
});
