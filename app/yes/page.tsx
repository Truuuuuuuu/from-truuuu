"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type Heart = {
    top: number
    left: number
    xOffset: number
    duration: number
    delay: number
}

export default function YesPage() {
    const [showMessage, setShowMessage] = useState(false)
    const [hearts, setHearts] = useState<Heart[]>([])

    // Generate hearts only on client after mount (hydration-safe + ESLint-safe)
    useEffect(() => {
        const heartsData: Heart[] = Array.from({ length: 10 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            xOffset: Math.random() * 200 - 100,
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 2,
        }))
        setHearts(heartsData)
    }, [])

    return (
        <div className="min-h-screen bg-pink-100 text-center px-6 py-16 space-y-32 relative overflow-hidden">

            {/* 🌸 Floating Hearts */}
            {hearts.map((heart, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [-20, 20, -20], x: heart.xOffset, opacity: [0.2, 0.1, 0.2] }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: heart.delay,
                    }}
                    className="absolute text-pink-400 text-2xl md:text-3xl pointer-events-none"
                    style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
                >
                    ❤️
                </motion.div>
            ))}

            {/* ❤️ SECTION 1 */}
            <section className="relative flex items-center justify-center min-h-[80vh] z-10">
                {/* LEFT IMAGE */}
                <motion.img
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    animate={{ opacity: 1, x: 0, rotate: -10 }}
                    transition={{ duration: 1 }}
                    src="/photo1.jpg"
                    className="w-40 md:w-60 rounded-2xl shadow-xl absolute left-5 md:left-20"
                />

                {/* RIGHT IMAGE */}
                <motion.img
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 10 }}
                    transition={{ duration: 1 }}
                    src="/photo2.jpg"
                    className="w-40 md:w-60 rounded-2xl shadow-xl absolute right-5 md:right-20"
                />

                {/* CENTER CONTENT */}
                <div className="max-w-md z-20 ">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-pink-600 mb-6"
                    >
                        Happy Valentines Day luv! 💐
                    </motion.h1>

                    <button
                        onClick={() => setShowMessage(true)}
                        className="bg-pink-500 text-white  px-6 py-3 rounded-2xl text-lg shadow-lg active:scale-95 transition"
                    >
                        Tap to reveal message 💌
                    </button>

                    {showMessage && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="mt-6 text-lg md:text-xl text-pink-800 italic"
                        >
                            I love you so much, you are the reason why I keep fighting and thriving everyday
                            so that I can give you a better future,  I'll always be there
                            for you whatever it takes.💖
                        </motion.p>
                    )}
                </div>
            </section>

            {/* ❤️ SECTION 2 (Scrollable Content) */}
            <section className="space-y-10 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-bold text-pink-700"
                >
                    Reasons I Love You 💗
                </motion.h2>

                <div className="space-y-6 max-w-xl mx-auto">
                    {[
                        "You always support me.",
                        "You make me laugh even on hard days.",
                        "You are my safe place.",
                    ].map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-lg"
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    )
}
