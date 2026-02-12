"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const moveButton = () => {
        const maxX = window.innerWidth / 1.5
        const maxY = window.innerHeight / 1.5

        const randomX = Math.floor(Math.random() * maxX) - maxX / 2
        const randomY = Math.floor(Math.random() * maxY) - maxY / 2

        setPosition({
            x: randomX,
            y: randomY,
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 px-6 text-center overflow-hidden">

            <h1 className="text-3xl md:text-5xl font-bold mb-12 text-pink-600">
                Do you love me? 💖
            </h1>

            <div className="relative flex gap-8 items-center justify-center">

                {/* YES BUTTON */}
                <button
                    onClick={() => router.push("/yes")}
                    className="bg-pink-500 active:scale-95 text-white px-8 py-4 rounded-2xl text-xl md:text-2xl shadow-lg transition"
                >
                    Yes 💘
                </button>

                {/* NO BUTTON */}
                <button
                    onClick={moveButton}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                    className="bg-gray-400 active:scale-95 text-white px-8 py-4 rounded-2xl text-xl md:text-2xl shadow-lg transition-transform duration-200"
                >
                    No 😢
                </button>

            </div>
        </div>
    )
}
