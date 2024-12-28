"use client"

import Link from "next/link";
import Image from 'next/image';

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ProductType } from "@/models/productModel";
import AddToWishlist from "@/components/add-to-wishlist"

import "./(styles)/products.css"

// Constants
const ANIMATION_DURATION = 300

interface FeaturedProductsProps {
    products: ProductType[];
}

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [visibleCount, setVisibleCount] = useState(getVisibleCardCount());

    function getVisibleCardCount() {
        if (typeof window === 'undefined') return 3;
        
        if (window.innerWidth < 640) return 1;        // mobile
        if (window.innerWidth < 1024) return 2;       // tablet
        return 3;                                     // desktop & larger screens
    }

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCardCount());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        if (currentIndex + visibleCount < products.length && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => prev + visibleCount);
            setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(prev => prev - visibleCount);
            setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
        }
    };

    const visibleProducts = Array.isArray(products) 
        ? products.slice(currentIndex, currentIndex + visibleCount)
        : [];

    return (
        <div className="py-16 bg-white w-full relative">
            <div className="max-w-[1400px] mx-auto px-48">
                <div className="flex justify-between items-center mb-5 flex-col md:flex-row gap-5 md:gap-0">
                    <h1 className="text-[3.5rem] md:text-4xl font-bold text-[#1d1d1f]">
                        Top Products
                        <span className="block text-lg font-normal text-[#86868b] mt-3">
                            Most viewed by customers
                        </span>
                    </h1>
                </div>

                <button 
                    onClick={handlePrev} 
                    disabled={currentIndex === 0 || isAnimating}
                    className="absolute left-24 top-1/2 w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <IoChevronBackOutline size={24} />
                </button>

                <div className="w-full overflow-hidden py-2.5">
                    <div className="flex gap-6">
                        {visibleProducts.map((product) => (
                            <div 
                                key={`${product._id}`} 
                                className="flex-1 min-w-0 max-w-full sm:max-w-[calc(100%-1rem)] md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1rem)] bg-white rounded-[20px] overflow-visible transition-all duration-300 shadow-sm border border-gray-200 flex flex-col relative z-[2] hover:-translate-y-1.5 hover:shadow-md slide-in"
                            >
                                <div className="w-full aspect-square p-4 bg-[#fbfbfd] relative overflow-hidden rounded-t-[20px]">
                                    <div className="absolute top-4 right-4 z-10">
                                        <AddToWishlist productId={product._id?.toString() || ''} />
                                    </div>
                                    <Image 
                                        src={product.thumbnail} 
                                        alt={product.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-contain rounded-[20px] bg-white shadow-sm transition-transform duration-300 group-hover:scale-102"
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-3 flex-1">
                                    <h3 className="text-lg font-semibold text-[#1d1d1f]">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-[#86868b] line-clamp-2">
                                        {product.excerpt}
                                    </p>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <p className="text-lg font-semibold text-[#1d1d1f]">
                                            Rp {product.price.toLocaleString()}
                                        </p>
                                        <a 
                                            href={`/products/${product.slug}`} 
                                            className="w-full py-2.5 bg-[#1d1d1f] text-white text-center rounded-[15px] text-sm font-medium transition-all duration-300 hover:bg-black hover:-translate-y-0.5"
                                        >
                                            See Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleNext}
                    disabled={currentIndex + visibleCount >= products.length || isAnimating}
                    className="absolute right-24 top-1/2 w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <IoChevronForwardOutline size={24} />
                </button>

                <div className="mt-5">
                    <Link href="/products" className="group inline-flex items-center gap-1.5 text-[#1d1d1f] no-underline text-sm font-medium transition-all duration-300 py-2 relative float-right hover:text-black">
                        See All Products
                        <IoChevronForwardOutline size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute bottom-1.5 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
} 