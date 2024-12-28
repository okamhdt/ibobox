import Wishlist from "@/models/wishlistModel";

import { NextResponse, NextRequest } from "next/server";
import { errorHandler } from "@/utils/errorHandler";

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id')
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }
        const wishlist = await Wishlist.findByUserId(userId)
        return NextResponse.json(wishlist)
    } catch (error) {
        return errorHandler(error as Error)
    }
}

export async function POST(request: NextRequest) {
    try {
        const { productId } = await request.json()
        const userId = request.headers.get('x-user-id')
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }
        const wishlist = await Wishlist.create({ userId, productId })
        return NextResponse.json(wishlist)
    } catch (error) {
        return errorHandler(error as Error)
    }
}