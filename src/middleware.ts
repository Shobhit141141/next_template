import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; 

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.log("User:", user.id);
    const headers = new Headers(req.headers);
    headers.set("x-user-id", user.id as string);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", (error as Error).message);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/movies/:path*"], 
};
