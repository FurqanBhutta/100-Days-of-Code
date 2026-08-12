import dbConnect from "@/lib/dbConnect";
import Teacher from "@/Models/Teacher";
import ClassOffering from "@/Models/ClassOffering";
import Enrollment from "@/Models/Enrollment";
import Assignment from "@/Models/Assignment";
import Submission from "@/Models/Submission";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// Equivalent to /api/teachers/dashboard - kept here to match the spec'd route tree.
export const GET = withErrorHandling(async () => {
  const { session, error } = await requireRole(["teacher"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const teacher = await Teacher.findOne({ userId: session.id });
  if (!teacher) return fail("Teacher profile not found", 404);

  const classOfferings = await ClassOffering.find({ teacherId: teacher._id })
    .populate("courseId", "title code")
    .populate("sectionId", "name")
    .populate("semesterId", "name number");

  const classOfferingIds = classOfferings.map((c) => c._id);

  const [enrollmentCounts, assignments] = await Promise.all([
    Enrollment.aggregate([
      { $match: { classOfferingId: { $in: classOfferingIds } } },
      { $group: { _id: "$classOfferingId", count: { $sum: 1 } } },
    ]),
    Assignment.find({ classOfferingID: { $in: classOfferingIds } }).sort({ dueDate: -1 }).limit(5),
  ]);

  const assignmentIds = assignments.map((a) => a._id);
  const pendingGradingCount = await Submission.countDocuments({
    assignmentId: { $in: assignmentIds },
    marksObtained: null,
  });

  const enrollmentMap = Object.fromEntries(
    enrollmentCounts.map((e) => [e._id.toString(), e.count])
  );

  return success({
    teacher: { id: teacher._id, name: teacher.name, employeeId: teacher.employeeId },
    totalClasses: classOfferings.length,
    classes: classOfferings.map((c) => ({
      id: c._id,
      course: c.courseId,
      section: c.sectionId,
      semester: c.semesterId,
      studentsEnrolled: enrollmentMap[c._id.toString()] || 0,
    })),
    recentAssignments: assignments,
    pendingGradingCount,
  });
});
