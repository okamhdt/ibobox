import User from "@/models/userModel";

import { NextResponse, NextRequest } from "next/server";
import { errorHandler } from "@/utils/errorHandler";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const newUser = await User.create(body)

        return NextResponse.json({ message: "User created successfully", user: newUser })
    } catch (error) {
        return errorHandler(error as Error)
    }
}