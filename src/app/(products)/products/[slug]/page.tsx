import { notFound } from "next/navigation"
import { Metadata } from "next"
import AddToWishlist from "@/components/add-to-wishlist"
import ProductImage from "@/components/product-image"
import Product, { ProductType } from "@/models/productModel"

async function getProduct(slug: string): Promise<ProductType | null> {
    try {
        const product = await Product.findBySlug(slug)
        return product ? JSON.parse(JSON.stringify(product)) : null
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

type Props = {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        return {
            title: 'Product Not Found',
            description: 'The product you are looking for does not exist'
        }
    }

    return {
        title: product.name,
        description: product.excerpt,
        openGraph: {
            title: product.name,
            description: product.excerpt,
            images: [
                {
                    url: product.thumbnail,
                    width: 800,
                    height: 600,
                    alt: product.name
                }
            ],
            url: `/products/${slug}`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.excerpt,
            images: [product.thumbnail]
        }
    }
}

function ProductInfo({ product }: { product: ProductType }) {
    return (
        <div className="py-8">
            <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">
                {product.name}
            </h1>
            
            <p className="text-lg text-[#86868b] mb-8">
                {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
                <p className="text-3xl font-bold text-[#1d1d1f]">
                    Rp {product.price.toLocaleString()}
                </p>
                <AddToWishlist productId={product._id?.toString() || ''} />
            </div>
        </div>
    )
}

export default async function ProductDetail({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-48">
                <div className="grid grid-cols-2 gap-12">
                    <ProductImage 
                        images={product.images}
                        name={product.name}
                    />
                    <ProductInfo product={product} />
                </div>
            </div>
        </div>
    )
}