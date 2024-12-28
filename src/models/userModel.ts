import { z } from "zod";
import { getCollection } from "../config";
import { ObjectId } from "mongodb";
import { hash } from "@/utils/bcrypt";
// import { errorHandler } from "@/utils/errorHandler";

const collectionName = "Users"

const userSchema = z.object({

    _id: z.instanceof(ObjectId)
        .optional(),
    
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(30, { message: "Name must be at most 30 characters" })
        .optional(),
    
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(30, { message: "Username must be at most 30 characters" })
        .optional(),
    
    email: z.string()
        .email({ message: "Invalid email address" }),
    
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .transform((password) => hash(password)),
    
    createdAt: z.date()
        .optional(),
    
    updatedAt: z.date()
        .optional(),
    
})

export type UserType = z.infer<typeof userSchema>

export default class User {

    static async create(input: UserType) {
        try {
            const user = userSchema.parse(input)
            const collection = await getCollection(collectionName)

            // Check unique email & username
            const existingUser = await collection.findOne({
                $or: [
                    { email: user.email },
                    { username: user.username }
                ]
            })

            if (existingUser) {
                if (existingUser.email === user.email) {
                    throw new Error("Email already exists")
                }
                throw new Error("Username already exists")
            }

            if (!user.name) {
                user.name = user.email?.split('@')[0]
            }

            if (!user.username) {
                user.username = user.email?.split('@')[0]
            }

            const newUser = {
                ...user,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const result = await collection.insertOne(newUser)

            //? untuk mengecek apakah user berhasil dibuat
            if (!result.acknowledged) {
                throw new Error("Failed to create user")
            }

            return result
        } catch (error) {
            throw error
        }
    }

    static async findAll() {
        try {
            const collection = await getCollection(collectionName)
            const users = await collection.find({}).toArray()

            if (!users.length) {
                throw new Error("Users not found")
            }

            return users
        } catch (error) {
            throw error
        }
    }

    static async findById(id: string) {
        try {
            const collection = await getCollection(collectionName)
            const user = await collection.findOne({ _id: new ObjectId(id) })

            if (!user) {
                throw new Error("User not found")
            }

            return user
        } catch (error) {
            throw error
        }
    }

    static async findOne(input: Partial<UserType>) {
        try {
            const collection = await getCollection(collectionName)
            const user = await collection.findOne(input)

            if (!user) {
                throw new Error("Invalid email or password")
            }

            return user
        } catch (error) {
            throw error
        }
    }

    static async update(id: string, input: Partial<UserType>) {
        try {
            const user = userSchema.partial().parse(input)
            const collection = await getCollection(collectionName)

            // Check unique email & username if they're being updated
            if (user.email || user.username) {
                const existingUser = await collection.findOne({
                    _id: { $ne: new ObjectId(id) }, // exclude current user
                    $or: [
                        ...(user.email ? [{ email: user.email }] : []),
                        ...(user.username ? [{ username: user.username }] : [])
                    ]
                })

                if (existingUser) {
                    if (user.email && existingUser.email === user.email) {
                        throw new Error("Email already exists")
                    }
                    throw new Error("Username already exists")
                }
            }

            if (!user.name) {
                user.name = user.email?.split('@')[0]
            }

            if (!user.username) {
                user.username = user.email?.split('@')[0]
            }

            const updatedData = {
                ...user,
                updatedAt: new Date()
            }

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            )

            if (!result.matchedCount) {
                throw new Error("User not found")
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
                throw new Error("User not found")
            }

            return result
        } catch (error) {
            throw error
        }
    }
}

// async function test() {
//     try {
//         const sampleUser = {
//             name: "r",
//             username: "rosee",
//             email: "rosee@gmail.com",
//             password: "rosee12345",
//         }

//         try {
//             userSchema.parse(sampleUser)
//         } catch (error) {
//             const response = errorHandler(error as Error)
//             console.log("❌ Error Response:", await response.json())
//             return
//         }

//         // Klo udh valid, lanjut create
//         const newUser = await User.create(sampleUser)
//         console.log("✅ CREATE Success:", newUser)

//         // _id
//         const _id = newUser.insertedId.toString()
//         console.log("✅ _id Success:", _id)

//         // Test READ (Get By ID)
//         console.log("\n=== Testing READ User by ID ===")
//         const user = await User.findById(_id)
//         console.log("✅ READ By ID Success:", user)

//         // Test READ (Get All)
//         console.log("\n=== Testing READ All Users ===")
//         const users = await User.findAll()
//         console.log("✅ READ All Success:", users)

//         // Test UPDATE
//         console.log("\n=== Testing UPDATE User ===")
//         const updateData = {
//             name: "Updated Rosee",
//             username: "rosee_updated"
//         }
//         const updatedUser = await User.update(_id, updateData)
//         console.log("✅ UPDATE Success:", updatedUser)

//         // Test DELETE
//         console.log("\n=== Testing DELETE User ===")
//         const deletedUser = await User.delete(_id)
//         console.log("✅ DELETE Success:", deletedUser)

//     } catch (error) {
//         const response = errorHandler(error as Error)
//         console.log("❌ Error Response:", await response.json())
//     } finally {
//         process.exit(0)
//     }
// }

// Uncomment to run tests
// test()