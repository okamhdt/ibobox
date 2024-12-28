import Product from "@/models/productModel";

import { NextResponse, NextRequest } from "next/server";
import { errorHandler } from "@/utils/errorHandler";

export async function GET(
    req: NextRequest, 
    res: NextResponse,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        if (!slug) {
            throw new Error("Slug is required")
        }

        const product = await Product.findBySlug(slug);

        if (!product) {
            throw new Error("Product not found")
        }

        return NextResponse.json(product);
    } catch (error) {
        return errorHandler(error as Error);
    }
}