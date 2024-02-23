import { dbClient, tododb, todos } from "@/app/_lib/mongo";
import { NextResponse } from "next/server";
export async function GET(
    request: Request) {
    try{
        await dbClient.connect();
        await dbClient.db("tododb").command({ ping: 1 });
    }catch(e){
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Database connected" }, { status: 200 });
}