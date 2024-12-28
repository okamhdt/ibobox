"use server"

import { cookies } from "next/headers";


export async function getAuth(): Promise<boolean> {
    try {
        const cookieStore = await cookies()
        const auth = cookieStore.get('Authorization') || cookieStore.get('_vercel_jwt')
        // console.log('Cookie Auth:', auth) // Debug purpose
        return auth ? true : false
    } catch (error) {
        console.error('Error checking auth:', error)
        return false
    }
}

export async function logout() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('Authorization')
        cookieStore.delete('_vercel_jwt')
    } catch (error) {
        console.error('Error logging out:', error)
        return false
    }
}