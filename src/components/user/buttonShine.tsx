"use client"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // bisa disesuaikan
})

const ButtonShine = ({ text = "Click Me", className = "" }) => {
  return (
    <button
      className={`${className} relative inline-flex h-12 overflow-hidden rounded-xl p-[2px] focus:outline-hidden focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-blue-50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] ${poppins.className}`}
    >
      {/* Border gradient mengikuti ukuran tombol */}
      <span className="absolute inset-0 z-0 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#ffffff_50%,#38bdf8_100%)]" />

      <span className="absolute inset-[2px] z-10 rounded-[10px] bg-blue-800" />

      {/* Isi tombol */}
      <span className="relative z-20 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] px-8 py-1 text-sm lg:text-md font-semibold text-white backdrop-blur-3xl transition-colors duration-300 ease-in-out hover:bg-blue-700/90">
        {text}
      </span>
    </button>
  )
}

export default ButtonShine
