"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

type Props = {
    productId: string
}

interface WishlistResponse {
    _id: string
    productId: string
}

export default function AddToWishlist({ productId }: Props) {
    const [isLiked, setIsLiked] = useState(false)
    const [wishlistId, setWishlistId] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    // Check if product is in wishlist
    useEffect(() => {
        const checkWishlist = async () => {
            try {
                const res = await fetch("/api/wishlist")
                const data = await res.json() as WishlistResponse[]
                
                // Check if data is array and has items
                const wishlists = Array.isArray(data) ? data : []
                
                const found = wishlists.find((w) => w.productId === productId)
                if (found) {
                    setIsLiked(true)
                    setWishlistId(found._id)
                }
            } catch (error) {
                console.error("Error checking wishlist:", error)
            }
        }

        checkWishlist()
    }, [productId])

    const handleToggleWishlist = async () => {
        try {
            setIsLoading(true)

            if (isLiked) {
                // Unlike
                const res = await fetch(`/api/wishlist/${wishlistId}`, {
                    method: "DELETE"
                })

                if (!res.ok) throw new Error("Failed to remove from wishlist")
                
                setIsLiked(false)
                setWishlistId("")
                toast.success("Removed from wishlist")
            } else {
                // Like
                const res = await fetch("/api/wishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productId })
                })

                if (!res.ok) throw new Error("Failed to add to wishlist")
                
                const data = await res.json() as { insertedId: string }
                setIsLiked(true)
                setWishlistId(data.insertedId)
                toast.success("Added to wishlist")
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button 
            onClick={handleToggleWishlist}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
            {isLiked ? (
                <AiFillHeart className="w-6 h-6 text-red-500" />
            ) : (
                <AiOutlineHeart className="w-6 h-6 text-[#86868b]" />
            )}
        </button>
    )
}