"use client"

import { useRef, useEffect } from 'react'
    
export default function HeroVideo() {
    const videoContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (videoContainerRef.current) {
                // Hitung progress scroll (0-1)
                const scrollProgress = Math.max(0, Math.min(1, 
                    window.scrollY / (window.innerHeight * 0.4)
                ))
                
                // Apply transform & border radius
                videoContainerRef.current.style.transform = `
                    scale(${1 - (scrollProgress * 0.3)})
                    translateY(${scrollProgress * 100}px)
                `
                
                // Bikin rounded corners pas di scroll
                videoContainerRef.current.style.borderRadius = `${scrollProgress * 32}px`
                videoContainerRef.current.querySelector('video')!.style.borderRadius = `${scrollProgress * 32}px`
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="relative w-full h-[90vh] mt-0 overflow-hidden flex justify-center items-center bg-white">
            <div 
                className="w-full h-full transition-all duration-75 ease-out overflow-hidden bg-white" 
                ref={videoContainerRef}
            >
                <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src="https://res.cloudinary.com/dngm0voif/video/upload/v1729942060/watchvid_slh3nk.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
} 