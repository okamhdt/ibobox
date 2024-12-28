import User from "@/models/userModel"

import { NextResponse, NextRequest } from "next/server"
import { errorHandler } from "@/utils/errorHandler"
import { createToken } from "@/utils/jwt"
import { compare } from "@/utils/bcrypt"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = body

        const user = await User.findOne({ email })
        
        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordValid = compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error("Invalid email or password")
        }

        const token = createToken({ 
            id: user.id, 
            email: user.email, 
            username: user.username 
        })

        const response = NextResponse.json({ access_token: token })
        response.cookies.set('Authorization', `Bearer ${token}`)

        return response

    } catch (error) {
        return errorHandler(error as Error)
    }
}