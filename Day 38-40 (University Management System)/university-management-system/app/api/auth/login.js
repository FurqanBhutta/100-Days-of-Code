
export async function POST(Request) {
    const { email, password } = await Request.json();

    if (!email || !password) {
        const message = "Email and Password are required!";
        return NextResponse.json({ success: false, message });
    }
    
}