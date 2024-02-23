
import { NextResponse } from "next/server";
export async function GET(
    request: Request) {
    return NextResponse.json({message: "Login is not supported yet"}, { status: 200 });
}