"use client";

import { GraduationCap } from "lucide-react";
import { useState } from "react";
import {useRouter} from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authslice";

const ROLE_HOME = { admin: "/admin", teacher: "/teacher", student: "/student" };

const Page = () => {
  const router = useRouter();
   const dispatch = useDispatch();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setForm({
          email: "",
          password: "",
        });

        dispatch(login(data));
        router.push(ROLE_HOME[data.role]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-600">
        <GraduationCap className="h-6 w-6 text-navy-900" />
      </div>

      <h1 className="text-2xl font-bold text-white">
        University MS
      </h1>

      <p className="text-gray-300">
        Sign in to your account
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-6 w-full max-w-sm bg-white rounded-lg p-6 text-gray-900"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            className="block w-full border border-gray-300 p-1 rounded placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            className="block w-full border border-gray-300 p-1 rounded placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Page;