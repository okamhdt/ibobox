import User from "@/models/userModel"
import { NextResponse } from "next/server"
import { errorHandler } from "@/utils/errorHandler"

export async function GET() {
    try {
        const users = await User.findAll()
        return NextResponse.json(users)
    } catch (error) {
        return errorHandler(error as Error)
    }
}