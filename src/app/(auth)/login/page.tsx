"use client"

import AuthForm from "../auth-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Login() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function loginAction(formData: FormData) {
        if (isLoading) return
        
        try {
            setIsLoading(true)
            const email = formData.get("email")?.toString()
            const password = formData.get("password")?.toString()

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message)
            }

            toast.success("Login successful!")
            router.replace("/")

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthForm 
            title="Welcome back"
            buttonText={isLoading ? "Signing in..." : "Sign in"}
            linkText="Don't have an account? Sign up"
            linkHref="/register"
            showRememberMe
            showForgotPassword
            onSubmit={loginAction}
            disabled={isLoading}
        />
    )
}
