"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { login, logout } from "@/redux/slices/authslice";

export default function AuthInitializer() {

    
    const dispatch = useDispatch();

    useEffect(() => {

        const restoreUser = async () => {
            try {
                const response = await fetch("/api/auth/me");
                if (!response.ok) {
                    dispatch(logout());
                    return;
                }
                const data = await response.json();
                // console.log("AuthInitializer response:", data);
                if (data.success) {
                    dispatch(login(data));
                }
            } catch (error) {
                console.error("Failed to restore authentication:", error);

                dispatch(logout());
            }
        }
        restoreUser();
    }, [ dispatch]);

    return null;
}