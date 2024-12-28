"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

import { carouselImages } from './(constants)/carousel'
import './(styles)/carousel.css'

// Constants
const SLIDE_WIDTH = 840
const SLIDE_INTERVAL = 5000
const CONTAINER_WIDTH = 800

interface CarouselSlide {
    url: string
    title: string
}

export default function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)
        }, SLIDE_INTERVAL)
        return () => clearInterval(timer)
    }, [])

    // Get adjusted slides
    const adjustedSlides = [
        carouselImages[carouselImages.length - 1],
        ...carouselImages,
        carouselImages[0]
    ]

    // Calculate transform
    const trackTransform = !windowWidth 
        ? 'none' 
        : `translateX(calc(${-((activeSlide + 1) * SLIDE_WIDTH) + (windowWidth - CONTAINER_WIDTH) / 2}px))`

    return (
        <div className="carousel-container">
            <div className="carousel-track" style={{ transform: trackTransform }}>
                {adjustedSlides.map((slide, index) => (
                    <CarouselSlide 
                        key={index}
                        slide={slide}
                        index={index}
                        isActive={index - 1 === activeSlide}
                        onSlideClick={() => setActiveSlide(index - 1)}
                    />
                ))}
            </div>
            <CarouselDots 
                count={carouselImages.length}
                activeSlide={activeSlide}
                onDotClick={setActiveSlide}
            />
        </div>
    )
} 

// Separate components
const CarouselSlide = ({ slide, index, isActive, onSlideClick }: {
    slide: CarouselSlide
    index: number
    isActive: boolean
    onSlideClick: () => void
}) => (
    <div 
        className={isActive ? 'carousel-slide active' : 'carousel-slide'}
        onClick={onSlideClick}
    >
        <Image 
            src={slide.url} 
            alt={slide.title}
            width={SLIDE_WIDTH}
            height={472}
            priority={index === 0}
            className="object-cover"
        />
        <div className="carousel-caption">
            <h2>{slide.title}</h2>
            <button className="stream-now">Stream now</button>
        </div>
    </div>
)

const CarouselDots = ({ count, activeSlide, onDotClick }: {
    count: number
    activeSlide: number
    onDotClick: (index: number) => void
}) => (
    <div className="carousel-dots">
        {Array.from({ length: count }).map((_, index) => (
            <button
                key={index}
                className={`carousel-dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => onDotClick(index)}
            />
        ))}
    </div>
) 