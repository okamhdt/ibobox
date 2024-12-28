import Carousel from "./carousel"
import HeroVideo from "./hero-video"
import FeaturedProducts from "./featured-products"
import StoreLocations from "./store-locations"
import Product from "@/models/productModel"

async function getFeaturedProducts() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const result = await Product.findAll({
            limit: 6,
            sort: {
                field: 'createdAt',
                order: 'desc'
            }
        })
        return result.products
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

export default async function HomePage() {  // renamed from Home to HomePage
    const products = await getFeaturedProducts()
    
    return (
        <div className="pt-16">
            <HeroVideo />
            <FeaturedProducts products={products} />
            <Carousel />
            <StoreLocations />
        </div>
    )
}