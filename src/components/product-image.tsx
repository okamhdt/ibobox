"use client"

import Image from "next/image"
import { useState } from "react"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface ProductImageProps {
    images: string[]
    name: string
}

export default function ProductImage({ images, name }: ProductImageProps) {
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    return (
        <div className="space-y-6">
            {/* Main Image with Arrows */}
            <div className="w-[85%] mx-auto aspect-square relative group">
                <Image
                    src={images[currentImage]}
                    alt={name}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Arrow Buttons */}
                <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full
                        shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        hover:bg-white"
                >
                    <IoChevronBackOutline 
                        className="w-5 h-5 text-gray-800"
                    />
                </button>
                
                <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full
                        shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        hover:bg-white"
                >
                    <IoChevronForwardOutline 
                        className="w-5 h-5 text-gray-800"
                    />
                </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="w-[85%] mx-auto grid grid-cols-5 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={img}
                        onClick={() => setCurrentImage(idx)}
                        className={`
                            aspect-square relative cursor-pointer
                            transition-all duration-200
                            ${currentImage === idx 
                                ? "ring-2 ring-blue-500" 
                                : "hover:opacity-80"
                            }
                        `}
                    >
                        <Image
                            src={img}
                            alt={`${name} view ${idx + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 20vw, 10vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
} 