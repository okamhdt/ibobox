import Product from "@/models/productModel";

import { NextResponse, NextRequest } from "next/server";
import { errorHandler } from "@/utils/errorHandler";

export async function GET(request: NextRequest) {
    try {
        // Get query params
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search') || ""
        const start = parseInt(searchParams.get('start') || "0")
        const limit = parseInt(searchParams.get('limit') || "10")
        const sortField = searchParams.get('sortField') as 'price' | 'createdAt' | 'name' || 'createdAt'
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc'

        // Get products with filters
        const result = await Product.findAll({
            search,
            start,
            limit,
            sort: {
                field: sortField,
                order: sortOrder
            }
        })

        return NextResponse.json(result);
    } catch (error) {
        return errorHandler(error as Error);
    }
}