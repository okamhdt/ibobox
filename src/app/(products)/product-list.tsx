"use client"

import { ProductType } from "@/models/productModel"
import { IoChevronForwardOutline } from "react-icons/io5"
import Image from 'next/image'

export default function ProductsList({ products }: { products: ProductType[] }) {
    // Double check for safety
    if (!Array.isArray(products)) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: ProductType, index: number) => (
                <div 
                    key={`${product._id}-${index}`}
                    className="bg-white rounded-[20px] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                    <div className="aspect-square p-4 bg-[#fbfbfd]">
                        <Image 
                            src={product.thumbnail}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">
                            {product.name}
                        </h3>
                        <p className="text-sm text-[#86868b] mb-4 line-clamp-2">
                            {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold text-[#1d1d1f]">
                                Rp {product.price.toLocaleString()}
                            </p>
                            <a 
                                href={`/products/${product.slug}`}
                                className="group flex items-center gap-1 text-[#1d1d1f] text-sm font-medium hover:text-black"
                            >
                                View Details
                                <IoChevronForwardOutline 
                                    size={16} 
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 