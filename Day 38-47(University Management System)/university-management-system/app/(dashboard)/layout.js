"use client";
import "../globals.css";
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";
import { usePathname } from "next/navigation";
import AuthInitializer from "@/Components/AuthInitializer";

function titleFromPath(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (segments.length <= 1) return "Overview";
  return last
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default function RootLayout({ children }) {
    const pathname = usePathname();
  return (
    <div className="flex h-screen bg-parchment">
      <AuthInitializer />
      <Sidebar/>
      <div className="flex flex-1 flex-col overflow-hidden ">
        <Topbar title={titleFromPath(pathname)}/>
        <main className="flex-1 overflow-y-auto p-6 bg-stone-200">{children}</main>
      </div>
    </div>
  );
}
