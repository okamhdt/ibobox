"use client"

import { IoLogoApple } from "react-icons/io5";
import { FaUser, FaSearch, FaShoppingBag, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAuth, logout } from '@/utils/auth'

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        isLoading: true
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Handle initial mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const checkAuth = async () => {
        try {
            const authStatus = await getAuth();
            setAuthState({
                isLoggedIn: authStatus,
                isLoading: false
            });
        } catch (error) {
            console.error('Auth check error:', error);
            setAuthState({
                isLoggedIn: false,
                isLoading: false
            });
        }
    };

    // Check auth when pathname changes
    useEffect(() => {
        if (mounted) {
            checkAuth();
        }
    }, [pathname, mounted]);

    const handleUserClick = () => {
        if (!authState.isLoading && authState.isLoggedIn) {
            setShowDropdown(prev => !prev);
        } else if (!authState.isLoading) {
            router.push('/login');
        }
    };

    const handleWishlistClick = async () => {
        if (!authState.isLoading && authState.isLoggedIn) {
            router.push('/wishlist')
        } else {
            router.push('/login')
        }
    }

    // Don't render anything until mounted
    if (!mounted) {
        return null;
    }

    return (
        <nav className="w-full bg-white fixed top-0 z-50">
            <div className="container mx-auto">
                <div className="max-w-[1400px] mx-auto px-48 h-16 flex items-center justify-between">
                    <div 
                        className="flex items-center space-x-2 cursor-pointer h-full text-black hover:text-black/80 transition-colors"
                        onClick={() => router.push('/')}
                    >
                        <IoLogoApple className="text-2xl translate-y-[-2px]" />
                        <span className="text-xl font-bold leading-none">iBobox</span>
                    </div>

                    {/* Search Section */}
                    <div className="flex-1 max-w-xl mx-8 flex items-center h-full">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                            <input 
                                type="text" 
                                placeholder="Cari produk..." 
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-4 h-full">
                        <button 
                            onClick={handleWishlistClick}
                            className="text-black hover:text-black/80 transition-colors flex items-center h-full"
                        >
                            <FaShoppingBag size={20} />
                        </button>
                        <div className="relative flex items-center h-full">
                            <button 
                                onClick={handleUserClick}
                                className="text-black hover:text-black/80 transition-colors flex items-center h-full"
                            >
                                <FaUser size={20} />
                            </button>
                            
                            {authState.isLoggedIn && showDropdown && (
                                <div 
                                    className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                                    onMouseLeave={() => setShowDropdown(false)}
                                >
                                    <button 
                                        onClick={() => {
                                            router.push('/profile')
                                            setShowDropdown(false)
                                        }}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaUserCircle />
                                        Profile
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setIsLoggingOut(true)
                                            logout()
                                                .then(() => {
                                                    setAuthState({
                                                        isLoggedIn: false,
                                                        isLoading: false
                                                    })
                                                    setShowDropdown(false)
                                                    router.push('/login')
                                                })
                                                .catch(error => {
                                                    console.error('Error logging out:', error)
                                                })
                                                .finally(() => setIsLoggingOut(false))
                                        }}
                                        disabled={isLoggingOut}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-75"
                                    >
                                        {isLoggingOut ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600" />
                                                Logging out...
                                            </div>
                                        ) : (
                                            <>
                                                <FaSignOutAlt />
                                                Logout
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
