import fs from "fs/promises";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";
import { hash } from "../utils/bcrypt";
import { UserType } from "../models/userModel";

const collectionName = "Users"

export const seedUsers = async () => {
    try {
        const userCollection = await getCollection(collectionName);

        // Read users from correct path
        const users = JSON.parse(
            await fs.readFile("./src/data/users.json", "utf-8")
        );

        // Transform user data
        const transformedUsers = users.map((el: UserType) => ({
            ...el,
            _id: new ObjectId(el._id),
            password: hash(el.password),
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        await userCollection.insertMany(transformedUsers);
        console.log("✅ User seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding users:", error);
        throw error; // Re-throw error for proper handling
    }
};
