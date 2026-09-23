"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  ClipboardList,
  CalendarCheck,
  FileText,
  Award,
  Megaphone,
  Rows3,
  UserCog,
} from "lucide-react";

const NAV_BY_ROLE = {
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: UserCog },
    { href: "/admin/departments", label: "Departments", icon: Building2 },
    { href: "/admin/semesters", label: "Semesters", icon: Layers },
    { href: "/admin/sections", label: "Sections", icon: Rows3 },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/class-offerings", label: "Class Offerings", icon: ClipboardList },
    { href: "/admin/students", label: "Students", icon: GraduationCap },
    { href: "/admin/teachers", label: "Teachers", icon: Users },
    { href: "/admin/notices", label: "Notices", icon: Megaphone },
  ],
  teacher: [
    { href: "/teacher", label: "Overview", icon: LayoutDashboard },
    { href: "/teacher/classes", label: "My Classes", icon: ClipboardList },
    { href: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/teacher/assignments", label: "Assignments", icon: FileText },
    { href: "/teacher/results", label: "Results", icon: Award },
  ],
  student: [
    { href: "/student", label: "Overview", icon: LayoutDashboard },
    { href: "/student/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/student/assignments", label: "Assignments", icon: FileText },
    { href: "/student/results", label: "Results", icon: Award },
    { href: "/student/notices", label: "Notices", icon: Megaphone },
  ],
};

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const items = NAV_BY_ROLE[user?.role] || [];
  const pathname = usePathname();
  console.log("Sidebar user:", user);
  return (
    <aside className=" w-64 shrink-0 flex-col bg-cyan-900 px-4 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-600 font-display text-sm font-extrabold text-cyan-900">
          U
        </div>
        <span className="font-display text-sm font-bold tracking-wide text-white">
          UNIVERSITY MS
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/student"
              ? pathname === href
              : pathname === href || pathname.startsWith(href + "/");
          // const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active
                ? "bg-cyan-700 text-gray-700"
                : "text-gray-700 hover:bg-cyan-800/60 hover:text-white"
                }`}
            >
              <Icon className="h-4 w-4 shrink-0 text-gray-300" />
              <span className="text-gray-300">{label}</span>
            </Link>
          );
        })}
      </nav>

      <p className="px-3 text-xs text-navy-500 text-gray-300">
        Signed in as <span className="capitalize text-navy-300 font-bold">{user?.role}</span>
      </p>
    </aside>
  )
}

export default Sidebar
