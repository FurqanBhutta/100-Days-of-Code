import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import Student from "@/Models/Student";
import Teacher from "@/Models/Teacher";
import Department from "@/Models/Department";
import Course from "@/Models/Course";
import ClassOffering from "@/Models/ClassOffering";
import Notice from "@/Models/Notice";
import { requireRole } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

export const GET = withErrorHandling(async () => {
  const { error } = await requireRole(["admin"]);
  if (error) return fail(error.message, error.status);

  await dbConnect();

  const [
    totalStudents,
    totalTeachers,
    totalDepartments,
    totalCourses,
    totalClassOfferings,
    activeUsers,
    inactiveUsers,
    recentNotices,
  ] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Department.countDocuments(),
    Course.countDocuments(),
    ClassOffering.countDocuments(),
    User.countDocuments({ isActive: true }),
    User.countDocuments({ isActive: false }),
    Notice.find().sort({ createdAt: -1 }).limit(5).populate("createdBy", "username role"),
  ]);

  const studentsByDepartment = await Student.aggregate([
    { $group: { _id: "$departmentId", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "department",
      },
    },
    { $unwind: { path: "$department", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        departmentId: "$_id",
        departmentName: "$department.name",
        count: 1,
      },
    },
  ]);

  return success({
    totals: {
      students: totalStudents,
      teachers: totalTeachers,
      departments: totalDepartments,
      courses: totalCourses,
      classOfferings: totalClassOfferings,
    },
    users: { active: activeUsers, inactive: inactiveUsers },
    studentsByDepartment,
    recentNotices,
  });
});
