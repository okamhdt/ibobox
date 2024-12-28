import fs from "fs/promises";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";
import { WishlistType } from "../models/wishlistModel";

const collectionName = "Wishlists"

export const seedWishlists = async () => {
    try {
        const wishlistCollection = await getCollection(collectionName);

        // Read wishlists from correct path
        const wishlists = JSON.parse(
            await fs.readFile("./src/data/wishlists.json", "utf-8")
        );

        // Transform wishlist data
        const transformedWishlists = wishlists.map((el: WishlistType) => ({
            ...el,
            _id: new ObjectId(el._id),
            userId: new ObjectId(el.userId),
            productId: new ObjectId(el.productId),
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        await wishlistCollection.insertMany(transformedWishlists);
        console.log("✅ Wishlist seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding wishlists:", error);
        throw error;
    }
};
