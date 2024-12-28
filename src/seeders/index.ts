import { connect, getDb } from "../config";
import { seedUsers } from "./userSeeder";
import { seedProducts } from "./productSeeder";
import { seedWishlists } from "./wishlistSeeder";

//! ini untuk drop collection sebelum seed data dummy
async function dropCollections() {
    try {
        const db = await getDb();
        
        // Drop all collections with better error handling
        const collections = [
            { name: "Users", drop: () => db.collection("Users").drop() },
            { name: "Products", drop: () => db.collection("Products").drop() },
            { name: "Wishlists", drop: () => db.collection("Wishlists").drop() }
        ];

        for (const collection of collections) {
            try {
                await collection.drop();
            } catch {
                console.log(`⚠️ ${collection.name} collection not found, skipping...`);
            }
        }

        console.log("✨ Successfully dropped all collections!");
    } catch (error) {
        console.error("❌ Failed to drop collections:", error);
        throw error;
    }
}

async function seed() {
    try {
        await connect(); //! connect to database
        await dropCollections(); //! drop existing collections

        // Seed all data
        await Promise.all([
            seedUsers(),     //! seed users
            seedProducts(),  //! seed products
            seedWishlists() //! seed wishlists
        ]);

        console.log("🌱 Seeding completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        process.exit(0); //! exit process when done
    }
}

seed();