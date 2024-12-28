import fs from "fs/promises";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";

import { ProductType } from "../models/productModel";

const collectionName = "Products"

export const seedProducts = async () => {
    try {
        const productCollection = await getCollection(collectionName);

        const products = JSON.parse(
            await fs.readFile("./src/data/products.json", "utf-8")
        );

        products.map((el: ProductType) => {
            el._id = new ObjectId(el._id);
            el.createdAt = new Date();
            el.updatedAt = new Date();
            return el;
        });

        await productCollection.insertMany(products);
        console.log("Product seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding products:", error);
    }
}