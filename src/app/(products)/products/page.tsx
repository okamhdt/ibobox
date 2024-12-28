"use client"

import { useEffect, useState } from "react"
import { ProductType } from "@/models/productModel"
import ProductsList from "../product-list"
import Loading from "@/app/loading"

type SortFieldType = "price" | "createdAt" | "name"
type SortOrderType = "asc" | "desc"

export default function Products() {
    const [products, setProducts] = useState<ProductType[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [sortField, setSortField] = useState<SortFieldType>("createdAt")
    const [sortOrder, setSortOrder] = useState<SortOrderType>("desc")
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [shouldFetch, setShouldFetch] = useState(true)
    
    const PRODUCTS_PER_PAGE = 9

    useEffect(() => {
        let isMounted = true

        const fetchProducts = async () => {
            if (!shouldFetch) return
            
            try {
                setIsLoading(true)
                const start = (page - 1) * PRODUCTS_PER_PAGE
                
                const queryParams = new URLSearchParams({
                    search: searchQuery,
                    start: start.toString(),
                    limit: PRODUCTS_PER_PAGE.toString(),
                    sortField,
                    sortOrder
                })

                const response = await fetch(`/api/products?${queryParams}`)
                const data = await response.json()
                await new Promise(resolve => setTimeout(resolve, 500))

                if (isMounted) {
                    if (page === 1) {
                        setProducts(data.products)
                    } else {
                        setProducts(prev => [...prev, ...data.products])
                    }
                    setHasMore(data.hasMore)
                    setShouldFetch(false)
                }
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchProducts()

        return () => {
            isMounted = false
        }
    }, [page, searchQuery, sortField, sortOrder, shouldFetch])

    useEffect(() => {
        const handleScroll = () => {
            if (isLoading || !hasMore) return

            const isNearBottom = window.innerHeight + window.pageYOffset >= 
                document.documentElement.scrollHeight - 100

            if (isNearBottom) {
                setPage(prev => prev + 1)
                setShouldFetch(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [hasMore, isLoading])

    const handleSort = (value: string) => {
        const [field, order] = value.split('-') as [SortFieldType, SortOrderType]
        setSortField(field)
        setSortOrder(order)
        setPage(1)
        setShouldFetch(true)
    }

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        setPage(1)
        setShouldFetch(true)
    }

    if (isLoading && (!products || products.length === 0)) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
            </div>
        )
    }

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-48">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-[#1d1d1f]">
                        All Products
                        <span className="block text-lg font-normal text-[#86868b] mt-2">
                            Find your perfect device
                        </span>
                    </h1>

                    <div className="flex gap-4 items-center">
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-[300px] px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1d1d1f] bg-[#f5f5f7]"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>
                        </div>

                        <div className="flex items-center gap-2 bg-[#f5f5f7] px-4 py-2.5 rounded-xl">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select
                                value={`${sortField}-${sortOrder}`}
                                onChange={(e) => handleSort(e.target.value)}
                                className="bg-transparent text-sm focus:outline-none cursor-pointer"
                            >
                                <option value="createdAt-desc">Newest First</option>
                                <option value="createdAt-asc">Oldest First</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                        </div>
                    </div>
                </div>

                {products && <ProductsList products={products} />}

                {isLoading && products?.length > 0 && (
                    <div className="flex flex-col items-center justify-center mt-8 pb-8">
                        <Loading small />
                        <p className="text-sm text-gray-500 mt-3">Loading more products...</p>
                    </div>
                )}

                {!hasMore && products?.length > 0 && (
                    <div className="flex flex-col items-center justify-center mt-8 pb-8">
                        <div className="w-16 h-[1px] bg-gray-200 mb-8"></div>
                        <p className="text-sm text-gray-500">You&apos;ve reached the end! 🎉</p>
                    </div>
                )}

                {products?.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center mt-8 pb-8">
                        <p className="text-lg text-gray-500 mb-2">No products found 😢</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}