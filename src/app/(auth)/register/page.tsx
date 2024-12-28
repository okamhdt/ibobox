"use client"

import AuthForm from "../auth-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Register() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function registerAction(formData: FormData) {
        if (isLoading) return
        
        try {
            setIsLoading(true)
            const name = formData.get("name")?.toString()
            const email = formData.get("email")?.toString()
            const password = formData.get("password")?.toString()

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })

            if (!res.ok) {
                const data = await res.json()
                console.log(data)
                throw new Error(data.message)
            }

            toast.success("Registration successful! Please login.")
            router.push("/login")

        } catch (error) {
            // console.log(error)
            toast.error(error instanceof Error ? error.message : "Registration failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthForm 
            title="Create your account"
            buttonText={isLoading ? "Creating Account..." : "Create Account"}
            linkText="Already have an account? Sign in"
            linkHref="/login"
            showNameField
            showTerms
            onSubmit={registerAction}
            disabled={isLoading}
        />
    )
}