import dbConnect from "@/lib/dbConnect";
import Attendance from "@/Models/Attendance";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// GET /api/attendance/class?classOfferingId=&date=
export const GET = withErrorHandling(async (request) => {
  const { error } = await requireRole(["admin", "teacher"]);
  if (error) return fail(error.message, error.status);

  const { searchParams } = new URL(request.url);
  const classOfferingId = searchParams.get("classOfferingId");
  const date = searchParams.get("date");

  if (!classOfferingId) {
    return fail("classOfferingId query parameter is required", 400);
  }

  await dbConnect();

  const filter = { classOfferingId };
  if (date) {
    const day = new Date(date);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    filter.date = { $gte: day, $lt: nextDay };
  }

  const records = await Attendance.find(filter)
    .populate("studentId", "firstName lastName registrationNumber")
    .sort({ date: -1 });

  // Per-student attendance percentage summary for this class
  const summaryMap = {};
  for (const r of records) {
    const key = r.studentId?._id?.toString();
    if (!key) continue;
    if (!summaryMap[key]) {
      summaryMap[key] = { student: r.studentId, present: 0, total: 0 };
    }
    summaryMap[key].total += 1;
    if (r.status === "present") summaryMap[key].present += 1;
  }

  const summary = Object.values(summaryMap).map((s) => ({
    ...s,
    percentage: s.total > 0 ? Math.round((s.present / s.total) * 10000) / 100 : 0,
  }));

  return success({ records, summary });
});
