"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type Heart = {
    size: number;
    top: number
    left: number
    xOffset: number
    duration: number
    delay: number
}

export default function YesPage() {
    const [showMessage, setShowMessage] = useState(false)

    const [current, setCurrent] = useState(0)
    const [reasons, setReasons] = useState([
        { text: "YOU", revealed: false },
        { text: "ARE", revealed: false },
        { text: "THE", revealed: false },
        { text: "SPECIAL", revealed: false },
        { text: "ONE", revealed: false },
    ])

    const photos = [
        "/memory1.jpg",
        "/memory2.jpg",
        "/memory3.jpg",
        "/memory4.jpg",
        "/memory5.jpg",
    ]

    const nextSlide = () => setCurrent((prev) => (prev + 1) % photos.length)
    const prevSlide = () =>
        setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1))

    const handleReveal = (index: number) =>
        setReasons((prev) =>
            prev.map((item, i) => (i === index ? { ...item, revealed: true } : item))
        )

    const [hearts] = useState<Heart[]>(() =>
        Array.from({ length: 30 }).map(() => ({
            size: Math.random()*10,
            top: Math.random() * 100,
            left: Math.random() * 100,
            xOffset: Math.random() * 200 - 100,
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 2,
        }))
    )


    return (
        <div className="min-h-screen bg-pink-100 text-center px-6 py-16 space-y-32 relative overflow-hidden">

            {/* Floating Hearts */}
            {hearts.map((heart, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [-20, 20, -20], x: heart.xOffset, opacity: [0.2, 0.1, 0.2] }}
                    transition={{ duration: heart.duration, repeat: Infinity, repeatType: "mirror", delay: heart.delay }}
                    className="absolute text-pink-400 pointer-events-none"
                    style={{
                        top: `${heart.top}%`,
                        left: `${heart.left}%`,
                        fontSize: `${heart.size || 2}rem`, // fallback to 2rem if size undefined
                    }}
                >
                    ❤️
                </motion.div>

            ))}

            {/* Section 1: Photos + Two-Fold Letter */}
            <section className="relative flex items-center justify-center min-h-[80vh] z-10">

                {/* Left Photo */}
                <motion.img
                    src="/photo1.jpg"
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    animate={{
                        opacity: 1,        // fade-in once
                        x: [0, -5, 0, 5, 0], // floating loop
                        y: [0, -5, 0, 5, 0], // floating loop
                        rotate: -10
                    }}
                    transition={{
                        opacity: { duration: 1 },       // fade-in duration
                        x: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
                        y: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
                    }}
                    className="w-40 md:w-60 rounded-2xl shadow-xl absolute left-5 md:left-20"
                />

                {/* Right Photo */}
                <motion.img
                    src="/photo2.jpg"
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{
                        opacity: 1,
                        x: [0, 5, 0, -5, 0],
                        y: [0, 5, 0, -5, 0],
                        rotate: 10
                    }}
                    transition={{
                        opacity: { duration: 1 },
                        x: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
                        y: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
                    }}
                    className="w-40 md:w-60 rounded-2xl shadow-xl absolute right-5 md:right-20"
                />


                {/* Two-Fold Letter */}
                <div className="max-w-md z-20 flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-5xl font-serif text-rose-600 mb-10"
                    >
                        Happy Valentines Day, luv 💐
                    </motion.h1>

                    <div className="relative w-80 h-56" style={{ perspective: 1200 }}>
                        {/* Inside Letter */}
                        <div className="absolute inset-0 bg-white rounded-xl shadow-2xl p-6 flex items-center justify-center z-0">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: showMessage ? 1 : 0 }}
                                transition={{ duration: 0.6, delay: showMessage ? 0.8 : 0 }}
                                className="text-rose-800 italic text-sm md:text-base leading-relaxed text-center"
                            >
                                I love you so much. You are the reason why I keep fighting
                                and thriving every day so that I can give you a better future.
                                I’ll always be there for you whatever it takes. 💖
                            </motion.p>
                        </div>
                        <motion.div
                            onClick={() => setShowMessage(!showMessage)}
                            animate={{ rotateX: showMessage ? -180 : 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            className="absolute inset-0 rounded-xl shadow-xl cursor-pointer z-10"
                            style={{
                                transformOrigin: "top",
                                backfaceVisibility: "hidden",
                                boxShadow: showMessage
                                    ? "0 15px 30px rgba(0,0,0,0.25)"
                                    : "0 8px 20px rgba(0,0,0,0.15)",
                                borderTop: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            {/* Inner wobble layer */}
                            <motion.div
                                animate={{ rotateZ: showMessage ? [-2, 2, 0] : 0 }}
                                transition={{ type: "keyframes", duration: 0.6 }}
                                className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500
               flex items-center justify-center text-white font-semibold text-lg rounded-xl"
                            >
                                {!showMessage && "Tap to Open 💌"}
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 🌸 FLOWER SECTION */}
            <section className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 space-y-8">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-serif text-pink-700 mb-6"
                >
                    Flowers and Chocolates for you
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-4xl">
                    {/* Left Flower Photo */}
                    <motion.img
                        src="/flower1.png"
                        alt="Flower 1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{
                            x: [0, -5, 0, 5, 0],
                            y: [0, -5, 0, 5, 0]
                        }}
                        transition={{
                            opacity: { duration: 0.6 },
                            x: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
                            y: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
                        }}
                        className="w-full md:w-1/2 object-contain"
                    />

                    {/* Right Flower Photo */}
                    <motion.img
                        src="/flower2.png"
                        alt="Flower 2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{
                            x: [0, 5, 0, -5, 0],
                            y: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                            opacity: { duration: 0.6, delay: 0.2 },
                            x: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
                            y: { duration: 6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
                        }}
                        className="w-full md:w-1/2 object-contain"
                    />

                </div>
            </section>



            {/* ❤️ SECTION 2 – Mini Game */}
            <section className="space-y-12 z-10 min-h-[80vh] flex flex-col items-center justify-center">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-serif text-pink-700"
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
                    className="text-3xl md:text-5xl font-serif text-pink-700"
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
