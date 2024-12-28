import { MongoClient } from "mongodb"

const uri = "mongodb+srv://okaaamhdt1099:fUtlwBxdO36tKUMT@cluster0.f8uij.mongodb.net/"

const client = new MongoClient(uri)

export async function connect() {
    try {
        await client.connect()
        // console.log("yeay berhasil connect")
    } catch (error) {
        console.log(error, "yaaaa gagal connect")
        await client.close() //! untuk menutup koneksi kalau gagal
    }
}

// MEMBUAT DATABASE
export async function getDb() {
    return client.db("iBobox")
}

export async function getCollection(collectionName: string) {
    const db = await getDb()
    return db.collection(collectionName)
}