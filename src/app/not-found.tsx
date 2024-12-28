import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-gray-600 mb-8">Waduh, halaman yg kmu cari gk ketemu nih! 🤔</p>
                <Link 
                    href="/"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Balik ke Home
                </Link>
            </div>
        </div>
    )
} 