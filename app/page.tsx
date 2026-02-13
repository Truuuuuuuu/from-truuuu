"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LovePage() {
    const router = useRouter()
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const moveButton = () => {
        const randomX = Math.floor(Math.random() * 200 - 100)
        const randomY = Math.floor(Math.random() * 200 - 100)
        setPosition({ x: randomX, y: randomY })
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-200 overflow-hidden px-6">

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "-10%", opacity: 1 }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute left-[50%]"
                        style={{ left: `${Math.random() * 100}%` }}
                    >
                        <Heart className="text-pink-300 w-6 h-6 opacity-30" />
                    </motion.div>
                ))}
            </div>

            {/* Glass Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-3xl p-12 text-center max-w-xl w-full"
            >

                <h1 className="text-4xl md:text-6xl font-serif text-rose-700 mb-10 tracking-wide">
                    Do you love me?
                </h1>

                <div className="relative flex gap-8 items-center justify-center">

                    {/* YES BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/yes")}
                        className="relative bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-xl shadow-xl transition-all duration-300 hover:shadow-rose-400/50"
                    >
                        <span className="flex items-center gap-2">
                            Yes <Heart className="w-5 h-5 fill-white" />
                        </span>
                    </motion.button>

                    {/* NO BUTTON */}
                    <motion.button
                        animate={{
                            x: position.x,
                            y: position.y,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={moveButton}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gray-400 text-white px-10 py-4 rounded-full text-xl shadow-lg"
                    >
                        No 💔
                    </motion.button>

                </div>
            </motion.div>
        </div>
    )
}
