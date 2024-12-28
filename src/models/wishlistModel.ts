import { z } from "zod";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";
// import { errorHandler } from "@/utils/errorHandler";

const collectionName = "Wishlists"

const wishlistSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    userId: z.string(),
    productId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export type WishlistType = z.infer<typeof wishlistSchema>

export default class Wishlist {
    static async create(input: WishlistType) {
        try {
            const collection = await getCollection(collectionName)
            const wishlist = wishlistSchema.parse(input)
            const newWishlist = {
                ...wishlist,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const result = await collection.insertOne(newWishlist)

            if (!result.acknowledged) {
                throw new Error("Failed to create wishlist")
            }

            return result
        } catch (error) {
            throw error
        }
    }

    static async findAll() {
        try {
            const collection = await getCollection(collectionName)
            const wishlist = await collection.find({}).toArray()

            if (!wishlist.length) {
                throw new Error("Wishlist not found")
            }

            return wishlist
        } catch (error) {
            throw error
        }
    }

    static async findByUserId(userId: string) {
        try {
            const collection = await getCollection(collectionName)
            const wishlist = await collection.find({ userId }).toArray()

            return wishlist
        } catch (error) {
            throw error
        }
    }

    static async update(id: string, input: Partial<WishlistType>) {
        try {
            const collection = await getCollection(collectionName)
            const updatedWishlist = {
                ...input,
                updatedAt: new Date()
            }

            const result = await collection.updateOne(
                { _id: new ObjectId(id) }, 
                { 
                    $set: updatedWishlist
                }
            )

            if (!result.matchedCount) {
                throw new Error("Wishlist not found")
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
                throw new Error("Wishlist not found")
            }

            return result
        } catch (error) {
            throw error
        }
    }
}

// async function test() {
//     try {
//         // Test data
//         const sampleWishlist = {
//             userId: "user123",
//             productId: "product456"
//         }

//         // Test CREATE
//         console.log("\n=== Testing CREATE Wishlist ===")
//         const newWishlist = await Wishlist.create(sampleWishlist)
//         console.log("✅ CREATE Success:", newWishlist)

//         // Get _id
//         const _id = newWishlist.insertedId.toString()
//         console.log("✅ _id Success:", _id)

//         // Test READ (Get By User ID)
//         console.log("\n=== Testing READ Wishlist by User ID ===")
//         const userWishlist = await Wishlist.findByUserId(sampleWishlist.userId)
//         console.log("✅ READ By User ID Success:", userWishlist)

//         // Test READ (Get All)
//         console.log("\n=== Testing READ All Wishlists ===")
//         const wishlists = await Wishlist.findAll()
//         console.log("✅ READ All Success:", wishlists)

//         // Test UPDATE
//         console.log("\n=== Testing UPDATE Wishlist ===")
//         const updateData = {
//             productId: "newProduct789",
//             updatedAt: new Date()
//         }
//         const updatedWishlist = await Wishlist.update(_id, updateData)
//         console.log("✅ UPDATE Success:", updatedWishlist)

//         // Test DELETE
//         console.log("\n=== Testing DELETE Wishlist ===")
//         const deletedWishlist = await Wishlist.delete(_id)
//         console.log("✅ DELETE Success:", deletedWishlist)

//     } catch (error) {
//         return errorHandler(error as Error)
//     } finally {
//         process.exit(0)
//     }
// }

// Uncomment to run tests
// test()