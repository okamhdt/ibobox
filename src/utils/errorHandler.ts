import { NextResponse } from "next/server"
import { z } from "zod"

type CustomError = Error | z.ZodError

export const errorHandler = (error: CustomError) => {
    // Validation errors (Zod)
    if (error instanceof z.ZodError) {
        const { message } = error.issues[0]
        return NextResponse.json({ 
            message: message 
        }, { status: 422 })
    }

    // Known operational errors
    if (error instanceof Error) {
        // Handle unique constraint errors
        if (error.message.includes('already exists')) {
            return NextResponse.json({ 
                message: error.message 
            }, { status: 409 }) // Conflict
        }

        if (error.message.includes('not found')) {
            return NextResponse.json({ 
                message: error.message 
            }, { status: 404 }) // Not Found
        }
        
        if (error.message.includes('unauthorized')) {
            return NextResponse.json({ 
                message: error.message 
            }, { status: 401 }) // Unauthorized
        }

        return NextResponse.json({ 
            message: error.message 
        }, { status: 400 }) // Bad Request
    }

    // Unknown errors
    return NextResponse.json({ 
        message: "Internal Server Error" 
    }, { status: 500 }) // Internal Server Error
}