import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import { signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Email and password are required" });
        }

        await dbConnect();

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: "Invalid email or password" });
        }

        const payload = { id: user._id.toString(), role: user.role };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        await setAuthCookies({ accessToken, refreshToken });

        return NextResponse.json({
            success: true,
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        );
    }

};
