"use client"

import { Map, Marker } from 'pigeon-maps'
import { useState } from 'react'

type Store = {
    id: number;
    name: string;
    location: [number, number];
    address: string;
}

const stores: Store[] = [
    {
        id: 1,
        name: "iBox Central Park",
        location: [-6.1774, 106.7907] as [number, number],
        address: "Central Park Mall Lt. 3, Jakarta Barat"
    },
    {
        id: 2,
        name: "iBox Grand Indonesia",
        location: [-6.1950, 106.8207] as [number, number],
        address: "Grand Indonesia Mall Lt. 1, Jakarta Pusat"
    },
    {
        id: 3,
        name: "iBox Pondok Indah Mall",
        location: [-6.2650, 106.7833] as [number, number],
        address: "Pondok Indah Mall 1 Lt. 2, Jakarta Selatan"
    },
    {
        id: 4,
        name: "iBox Mall Kelapa Gading",
        location: [-6.1577, 106.9072] as [number, number],
        address: "Mall Kelapa Gading 3 Lt. 2, Jakarta Utara"
    },
    {
        id: 5,
        name: "iBox Summarecon Mall Bekasi",
        location: [-6.2261, 106.9997] as [number, number],
        address: "Summarecon Mall Bekasi Lt. 2, Bekasi"
    },
    {
        id: 6,
        name: "iBox Mall Taman Anggrek",
        location: [-6.1786, 106.7932] as [number, number],
        address: "Mall Taman Anggrek Lt. 3, Jakarta Barat"
    }
]

export default function StoreLocations() {
    const [center, setCenter] = useState<[number, number]>([-6.1774, 106.7907])
    const [zoom, setZoom] = useState(14)

    const handleStoreClick = (location: [number, number]) => {
        setCenter(location)
        setZoom(14) // Zoom in when store is selected
    }

    return (
        <div className="py-16 bg-[#fbfbfd]">
            <div className="max-w-[1400px] mx-auto px-48">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1d1d1f]">
                        Find an iBox Store
                        <span className="block text-lg font-normal text-[#86868b] mt-3">
                            Visit us at our stores
                        </span>
                    </h2>
                </div>

                {/* Map & Stores Section */}
                <div className="flex gap-8 h-[500px]">
                    {/* Map */}
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <Map 
                            center={center}
                            zoom={zoom}
                            animate={true}
                            minZoom={11}
                            maxZoom={18}
                        >
                            {stores.map((store) => (
                                <Marker 
                                    key={store.id}
                                    width={40}
                                    anchor={store.location}
                                    onClick={() => handleStoreClick(store.location)} 
                                />
                            ))}
                        </Map>
                    </div>

                    {/* Store List */}
                    <div className="w-[350px] bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">
                            Our Stores
                        </h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {stores.map((store) => (
                                <div 
                                    key={store.id}
                                    className="p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                                    onClick={() => handleStoreClick(store.location)}
                                >
                                    <h4 className="font-medium text-[#1d1d1f]">
                                        {store.name}
                                    </h4>
                                    <p className="text-sm text-[#86868b] mt-1">
                                        {store.address}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 