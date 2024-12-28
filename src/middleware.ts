import { NextRequest, NextResponse } from "next/server"
import { readPayloadJose } from "./utils/jwt"
import { errorHandler } from "./utils/errorHandler"
import { cookies } from "next/headers"

export async function middleware(req: NextRequest) {
    try {
        const cookieStore = await cookies()
        const auth = cookieStore.get('Authorization')?.value
        // console.log("🔑 Auth:", auth)

        if (!auth) {
            throw new Error("Unauthorized")
        }

        const token = auth.split(' ')[1]

        if (!token) {
            throw new Error("Unauthorized")
        }

        const payload = await readPayloadJose(token)
        // console.log("🔑 Payload:", payload)

        const reqHeaders = new Headers(req.headers)
        reqHeaders.set('x-user-id', payload.id as string)
        reqHeaders.set('x-user-email', payload.email as string)
        reqHeaders.set('x-user-username', payload.username as string)

        return NextResponse.next({
            request: {
                headers: reqHeaders
            }
        })
    } catch (error) {
        return errorHandler(error as Error)
    }
}

export const config = {
    matcher: ['/api/wishlist/:path*'],
}