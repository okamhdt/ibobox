"use client"

import { Suspense } from 'react'
import WishlistContent from "../wishlist-content"
import Loading from '@/app/loading'

export default function Wishlist() {
    return (
        <Suspense fallback={<Loading />}>
            <WishlistContent />
        </Suspense>
    )
}