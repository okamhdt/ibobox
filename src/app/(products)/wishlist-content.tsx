"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import { FaTrash } from "react-icons/fa"
import Link from 'next/link'
import type { ProductType } from '@/models/productModel'
import type { WishlistType } from '@/models/wishlistModel'

// Types
interface WishlistItem extends Omit<WishlistType, '_id' | 'productId'> {
    _id?: string
    productId: string
    product?: ProductType
}

export default function WishlistContent() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

    // Fetch wishlist & products
    const fetchWishlist = async () => {
        try {
            // Get wishlist items
            const wishlistRes = await fetch('/api/wishlist')
            
            if (!wishlistRes.ok) {
                throw new Error('Failed to fetch wishlist')
            }

            const wishlistData = await wishlistRes.json()

            // Get all products in one go
            const productsRes = await fetch('/api/products')
            const { products } = await productsRes.json()

            // Match products with wishlist items
            const itemsWithProducts = wishlistData.map((item: WishlistItem) => {
                const product = products.find((p: ProductType) => p._id?.toString() === item.productId)
                return { ...item, product }
            })

            setWishlistItems(itemsWithProducts)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Remove from wishlist
    const removeFromWishlist = async (wishlistId: string) => {
        try {
            await fetch(`/api/wishlist/${wishlistId}`, {
                method: 'DELETE'
            })
            // Update local state
            setWishlistItems(prev => prev.filter(item => item._id !== wishlistId))
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-48">
                <h1 className="text-4xl font-bold text-[#1d1d1f]">
                    My Wishlist
                    <span className="block text-lg font-normal text-[#86868b] mt-2">
                        Your favorite items in one place
                    </span>
                </h1>
                
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Your wishlist is empty 😢</p>
                        <Link 
                            href="/products" 
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 mt-8">
                        {wishlistItems.map((item) => (
                            <Link 
                                href={`/products/${item.product?.slug}`}
                                key={item._id} 
                                className="flex items-center gap-6 p-6 border rounded-xl hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300"
                            >
                                <div className="w-[120px] h-[120px] relative bg-[#fbfbfd] rounded-lg p-2">
                                    <Image
                                        src={item.product?.thumbnail || ''}
                                        alt={item.product?.name || ''}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-[#1d1d1f]">
                                        {item.product?.name}
                                    </h3>
                                    <p className="text-[#86868b] mt-1 line-clamp-2">
                                        {item.product?.description}
                                    </p>
                                    <p className="text-lg font-semibold mt-2 text-[#1d1d1f]">
                                        Rp {item.product?.price.toLocaleString()}
                                    </p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault() // Prevent link navigation
                                        removeFromWishlist(item._id?.toString() || '')
                                    }}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Remove from wishlist"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}