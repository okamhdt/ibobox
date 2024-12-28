import { z } from "zod";
import { getCollection } from "../config";
import { ObjectId, Sort } from "mongodb";
// import { errorHandler } from "@/utils/errorHandler";

const collectionName = "Products"

const productSchema = z.object({
    
    _id: z.instanceof(ObjectId)
        .optional(),

    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(30, { message: "Name must be at most 30 characters" }),
    
    slug: z.string()
        .min(3, { message: "Slug must be at least 3 characters" })
        .max(30, { message: "Slug must be at most 30 characters" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters" })
        .max(1000, { message: "Description must be at most 1000 characters" }),
    
    excerpt: z.string()
        .min(10, { message: "Excerpt must be at least 10 characters" })
        .max(1000, { message: "Excerpt must be at most 1000 characters" }),
    
    price: z.number()
        .min(0, { message: "Price must be at least 0" }),
    
    tags: z.array(z.string())
        .min(1, { message: "At least one tag is required" }),
    
    thumbnail: z.string()
        .min(1, { message: "Thumbnail is required" }),
    
    images: z.array(z.string())
        .min(1, { message: "At least one image is required" }),
    
    createdAt: z.date()
        .optional(),

    updatedAt: z.date()
        .optional(),

})

export type ProductType = z.infer<typeof productSchema>

interface FindAllOptions {
    search?: string;
    start?: number;
    limit?: number;
    sort?: {
        field: 'price' | 'createdAt' | 'name';
        order: 'asc' | 'desc';
    };
}

export default class Product {
    
    static async create(input: ProductType) {
        try {
            const product = productSchema.parse(input)
            const collection = await getCollection(collectionName)
            
            const newProduct = {
                ...product,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const result = await collection.insertOne(newProduct)
            
            if (!result.acknowledged) {
                throw new Error("Failed to create product")
            }

            return result
        } catch (error) {
            throw error
        }
    }

    static async findAll(options: FindAllOptions = {}) {
        try {
            const { 
                search = "", 
                start = 0, 
                limit = 10,
                sort = { field: 'createdAt', order: 'desc' }
            } = options

            const collection = await getCollection(collectionName)
            
            // Build query
            const query = search ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            } : {}

            // Build sort with proper type
            const sortQuery = { 
                [sort.field]: sort.order === 'asc' ? 1 : -1 
            } as Sort

            // Get total count for pagination
            const total = await collection.countDocuments(query)

            // Get products with pagination & sorting
            const products = await collection
                .find(query)
                .sort(sortQuery)
                .skip(start)
                .limit(limit)
                .toArray()
            
            return {
                products: JSON.parse(JSON.stringify(products)),
                total,
                hasMore: total > start + products.length
            }
        } catch (error) {
            throw error
        }
    }


    static async findById(id: string) {
        try {
            const collection = await getCollection(collectionName)
            const product = await collection.findOne({ _id: new ObjectId(id) })

            if (!product) {
                throw new Error("Product not found")
            }

            return product
        } catch (error) {
            throw error // just re-throw the error
        }
    }

    static async findBySlug(slug: string) {
        try {
            const collection = await getCollection(collectionName)
            const product = await collection.findOne({ slug })

            if (!product) {
                throw new Error("Product not found")
            }

            return product
        } catch (error) {
            throw error
        }
    }

    static async update(id: string, input: Partial<ProductType>) {
        try {
            const product = productSchema.partial().parse(input)
            const collection = await getCollection(collectionName)
            
            const updatedProduct = {
                ...product,
                updatedAt: new Date()
            }

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedProduct }
            )

            if (!result.matchedCount) {
                throw new Error("Product not found")
            }

            return result
        } catch (error) {
            throw error
        }
    }

    static async delete(id: string) {
        try {
            const collection = await getCollection(collectionName)
            const result = await collection.deleteOne({ _id: new ObjectId(id) })

            if (!result.deletedCount) {
                throw new Error("Product not found")
            }

            return result
        } catch (error) {
            throw error
        }
    }

}

// async function test() {
//     try {
//         const sampleProduct = {
//             name: "r", // This should fail validation
//             slug: "rosee", 
//             description: "rosee",
//             excerpt: "rosee",
//             price: 100000,
//             tags: ["rosee"],
//             thumbnail: "rosee",
//             images: ["rosee"]
//         }

//         try {
//             productSchema.parse(sampleProduct)
//         } catch (error) {
//             const response = errorHandler(error as Error)
//             console.log("❌ Error Response:", await response.json())
//             return
//         }

//         // If validation passes, continue with create
//         const newProduct = await Product.create(sampleProduct)
//         console.log("✅ CREATE Success:", newProduct)

//         // _id
//         const _id = newProduct.insertedId.toString()
//         console.log("✅ _id Success:", _id)

//         // Test READ (Get By ID)
//         console.log("\n=== Testing READ Product by ID ===")
//         const product = await Product.findById(_id)
//         console.log("✅ READ By ID Success:", product)

//         // Test READ (Get All)
//         console.log("\n=== Testing READ All Products ===")
//         const products = await Product.findAll()
//         console.log("✅ READ All Success:", products)

//         // Test UPDATE
//         console.log("\n=== Testing UPDATE Product ===")
//         const updateData = {
//             name: "Updated Rosee",
//             price: 50000,
//             updatedAt: new Date()
//         }
//         const updatedProduct = await Product.update(_id, updateData)
//         console.log("✅ UPDATE Success:", updatedProduct)

//         // Test DELETE
//         console.log("\n=== Testing DELETE Product ===")
//         const deletedProduct = await Product.delete(_id)
//         console.log("✅ DELETE Success:", deletedProduct)

//     } catch (error) {
//         const response = errorHandler(error as Error)
//         console.log("❌ Error Response:", await response.json())
//     }
// }

// Uncomment to run tests
// test()