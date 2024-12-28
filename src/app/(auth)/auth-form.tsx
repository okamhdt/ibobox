"use client"

import { IoLogoApple, IoMailOutline, IoLockClosedOutline, IoPersonOutline } from "react-icons/io5"
import Link from "next/link"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface AuthFormProps {
    title: string
    buttonText: string
    linkText: string
    linkHref: string
    showNameField?: boolean
    showRememberMe?: boolean
    showTerms?: boolean
    showForgotPassword?: boolean
    disabled?: boolean
    onSubmit: (formData: FormData) => Promise<void>
}

export default function AuthForm({ 
    title, 
    buttonText, 
    linkText, 
    linkHref,
    showNameField,
    showRememberMe,
    showTerms,
    showForgotPassword,
    disabled,
    onSubmit 
}: AuthFormProps) {
    const handleSubmit = async (formData: FormData) => {
        try {
            await onSubmit(formData)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred")
        }
    }

    return (
        <div className="w-full min-h-[100dvh] flex items-center justify-center bg-white">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 my-20"
            >
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <motion.div 
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                        className="flex justify-center"
                    >
                        <div className="bg-black p-4 rounded-2xl">
                            <IoLogoApple className="text-4xl text-white" />
                        </div>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                    >
                        {title}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-2 text-sm text-gray-600"
                    >
                        <Link href={linkHref} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            {linkText}
                        </Link>
                    </motion.p>
                </motion.div>

                <motion.form 
                    action={handleSubmit} 
                    className="mt-8 space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="space-y-5">
                        {showNameField && (
                            <motion.div className="relative group">
                                <IoPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-500 group-focus-within:text-blue-500 transition-colors z-10" />
                                <input
                                    name="name"
                                    type="text"
                                    className="appearance-none rounded-2xl relative block w-full px-12 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:bg-gray-50/50 focus:bg-white"
                                    placeholder="Full name"
                                />
                            </motion.div>
                        )}
                        <motion.div className="relative group">
                            <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-500 group-focus-within:text-blue-500 transition-colors z-10" />
                            <input
                                name="email"
                                type="email"
                                className="appearance-none rounded-2xl relative block w-full px-12 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:bg-gray-50/50 focus:bg-white"
                                placeholder="Email address"
                            />
                        </motion.div>
                        <motion.div className="relative group">
                            <IoLockClosedOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-500 group-focus-within:text-blue-500 transition-colors z-10" />
                            <input
                                name="password"
                                type="password"
                                className="appearance-none rounded-2xl relative block w-full px-12 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:bg-gray-50/50 focus:bg-white"
                                placeholder="Password"
                            />
                        </motion.div>
                    </div>

                    {showRememberMe && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            {showForgotPassword && (
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {showTerms && (
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the{" "}
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Terms
                                </a>
                            </label>
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={disabled}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl ${
                            disabled ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                        {buttonText}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    )
} 