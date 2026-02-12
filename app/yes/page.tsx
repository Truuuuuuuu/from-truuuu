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

    const photos = [
        "/memory1.jpg",
        "/memory2.jpg",
        "/memory3.jpg",
        "/memory4.jpg",
        "/memory5.jpg",
    ]

    const [current, setCurrent] = useState(0)

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % photos.length)
    }

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? photos.length - 1 : prev - 1
        )
    }


    const [reasons, setReasons] = useState([
        { text: "YOU", revealed: false },
        { text: "ARE", revealed: false },
        { text: "THE", revealed: false },
        { text: "SPECIAL", revealed: false },
        { text: "ONE", revealed: false },
    ])

    const handleReveal = (index: number) => {
        setReasons(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, revealed: true } : item
            )
        )
    }

    const allRevealed = reasons.every(r => r.revealed)


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

            {/* ❤️ SECTION 2 – Mini Game */}
            <section className="space-y-12 z-10 min-h-[80vh] flex flex-col items-center justify-center">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-bold text-pink-700"
                >
                    Mini Game: Tap the Hearts 💕
                </motion.h2>

                <p className="text-pink-600 text-lg">
                    Tap all the hearts to unlock something special ✨
                </p>

                <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            whileTap={{ scale: 0.9 }}
                            animate={{ scale: item.revealed ? 1.1 : 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            onClick={() => handleReveal(index)}
                            className={`w-28 h-28 md:w-32 md:h-32 flex items-center justify-center 
          rounded-2xl shadow-xl cursor-pointer select-none
          ${item.revealed ? "bg-white" : "bg-pink-400"}
        `}
                        >
                            {item.revealed ? (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-pink-700 text-sm md:text-base text-center px-2"
                                >
                                    {item.text}
                                </motion.span>
                            ) : (
                                <span className="text-3xl md:text-4xl">❤️</span>
                            )}
                        </motion.div>
                    ))}
                </div>


            </section>

            {/* 📸 SECTION – Memory Carousel */}
            <section className="min-h-[100vh] flex flex-col items-center justify-center py-20 space-y-10 z-10">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-pink-700"
                >
                    Our Memories Together 📸💞
                </motion.h2>

                <div className="relative w-full max-w-3xl h-[450px] md:h-[550px] flex items-center justify-center">

                    {/* Left Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-6 z-20 bg-white/70 backdrop-blur-md
                 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg
                 text-2xl text-pink-600 active:scale-90 transition"
                    >
                        ‹
                    </button>

                    {/* Image */}
                    <motion.img
                        key={current}
                        src={photos[current]}
                        alt="Memory"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.x < -100) nextSlide()
                            if (info.offset.x > 100) prevSlide()
                        }}
                    />

                    {/* Right Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-6 z-20 bg-white/70 backdrop-blur-md
                 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg
                 text-2xl text-pink-600 active:scale-90 transition"
                    >
                        ›
                    </button>

                </div>

                {/* Dots Indicator */}
                <div className="flex gap-3">
                    {photos.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition
          ${current === index ? "bg-pink-600 scale-125" : "bg-pink-300"}
        `}
                        />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl text-pink-800 max-w-xl text-center"
                >
                    Every memory with you is my favorite.
                    Let's keep making them!
                </motion.p>

            </section>



        </div>
    )
}
