import {NextRequest, NextResponse } from "next/server";

class User {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
const users = [];

export async function POST(Request) {
    let data = await Request.json();
    const user = new User(data.name, data.address);
    users.push(user);
    console.log(users);
    return NextResponse.json({success: true,
        data: "yes"
    })
}