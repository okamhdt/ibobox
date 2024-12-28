import { NextResponse, NextRequest } from "next/server"
import { errorHandler } from "@/utils/errorHandler"
import Wishlist from "@/models/wishlistModel"

type Params = Promise<{ id: string }>

export async function DELETE(
    req: NextRequest,
    { params }: { params: Params }
) {
    try {
        const { id } = await params
        const userId = req.headers.get('x-user-id')
        if (!userId) {
            throw new Error('User ID is required')
        }

        // Get user's wishlists
        const userWishlists = await Wishlist.findByUserId(userId)
        
        // Check if this wishlist belongs to user
        const isOwner = userWishlists.some(w => w._id.toString() === id)
        if (!isOwner) {
            throw new Error('Unauthorized: This wishlist belongs to another user')
        }

        const result = await Wishlist.delete(id)
        return NextResponse.json(result)
    } catch (error) {
        return errorHandler(error as Error)
    }
}