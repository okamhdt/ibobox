export default function Footer() {
    return (
        <footer className="bg-[#f5f5f7] text-[#1d1d1f]">
            <div className="max-w-[1400px] mx-auto px-48 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-4 gap-8 mb-12">
                    {/* Shop & Learn */}
                    <div>
                        <h3 className="font-semibold mb-4">Shop & Learn</h3>
                        <ul className="space-y-2 text-sm text-[#424245]">
                            <li className="hover:text-[#1d1d1f] cursor-pointer">iPhone</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">iPad</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Mac</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Apple Watch</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">AirPods</li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-[#424245]">
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Apple Care</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Repairs</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Installation</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Training</li>
                        </ul>
                    </div>

                    {/* Store */}
                    <div>
                        <h3 className="font-semibold mb-4">Store</h3>
                        <ul className="space-y-2 text-sm text-[#424245]">
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Find a Store</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Today at iBox</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Financing</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Order Status</li>
                        </ul>
                    </div>

                    {/* About iBox */}
                    <div>
                        <h3 className="font-semibold mb-4">About iBox</h3>
                        <ul className="space-y-2 text-sm text-[#424245]">
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Careers</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Events</li>
                            <li className="hover:text-[#1d1d1f] cursor-pointer">Contact Us</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-gray-300">
                    <div className="flex justify-between items-center text-sm text-[#86868b]">
                        <p>Copyright © 2024 iBox. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="hover:text-[#1d1d1f] cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-[#1d1d1f] cursor-pointer">Terms of Use</span>
                            <span className="hover:text-[#1d1d1f] cursor-pointer">Legal</span>
                            <span className="hover:text-[#1d1d1f] cursor-pointer">Site Map</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
} 