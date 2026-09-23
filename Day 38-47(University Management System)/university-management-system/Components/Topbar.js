"use client";

import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authslice";

const Topbar = ({ title }) => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                dispatch(logout())
                console.log("Logout successful");
                router.push("/login");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <header className="flex h-16 items-center justify-between border-b border-navy-100 bg-white px-6">
            <h1 className="font-display text-lg font-bold text-navy-900">{title}</h1>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-navy-600">
                    <UserIcon className="h-4 w-4 text-navy-400" />
                    {user?.username}
                </div>
                <button
                    onClick={handleLogout}
                    className="btn-ghost px-3 py-1.5 text-sm flex items-center gap-2 text-navy-600 hover:text-red-600 cursor-pointer"
                >
                    <LogOut className="h-4 w-4 cursor-pointer" />
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Topbar
