import dbConnect from "@/lib/dbConnect";
import Student from "@/Models/Student";
import Enrollment from "@/Models/Enrollment";
import Attendance from "@/Models/Attendance";
import Assignment from "@/Models/Assignment";
import Submission from "@/Models/Submission";
import Result from "@/Models/Result";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async () => {
  const { session, error } = await requireRole(["student"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const student = await Student.findOne({ userId: session.id });
  if (!student) return fail("Student profile not found", 404);

  const enrollments = await Enrollment.find({ studentId: student._id }).populate({
    path: "classOfferingId",
    populate: [{ path: "courseId", select: "title code" }],
  });

  const classOfferingIds = enrollments.map((e) => e.classOfferingId?._id).filter(Boolean);

  const [attendanceRecords, results, upcomingAssignments, submissions] = await Promise.all([
    Attendance.find({ studentId: student._id, classOfferingId: { $in: classOfferingIds } }),
    Result.find({ studentId: student._id }).populate({
      path: "classOfferingId",
      populate: [{ path: "courseId", select: "title code" }],
    }),
    Assignment.find({
      classOfferingID: { $in: classOfferingIds },
      dueDate: { $gte: new Date() },
    })
      .sort({ dueDate: 1 })
      .limit(5),
    Submission.find({ studentId: student._id }),
  ]);

  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter((a) => a.status === "present").length;
  const attendancePercentage =
    totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 10000) / 100 : null;

  const submittedAssignmentIds = new Set(submissions.map((s) => s.assignmentId.toString()));
  const pendingAssignments = upcomingAssignments.filter(
    (a) => !submittedAssignmentIds.has(a._id.toString())
  );

  return success({
    student: {
      id: student._id,
      name: `${student.firstName} ${student.lastName}`,
      registrationNumber: student.registrationNumber,
      cgpa: student.cgpa,
    },
    enrollmentsCount: enrollments.length,
    attendance: {
      percentage: attendancePercentage,
      present: presentCount,
      total: totalAttendance,
    },
    recentResults: results.slice(0, 5),
    upcomingAssignments: pendingAssignments,
  });
});
