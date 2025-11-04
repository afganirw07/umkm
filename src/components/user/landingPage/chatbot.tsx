"use client"

import { ReactNode } from "react"
import { Poppins } from "next/font/google"
import { Typewriter } from "../typewriter"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // bisa disesuaikan
});
const texts = [
  "Siapa anda",
  "Berikan saya Strategi",
  "Kenapa Omset saya Turun",
  "Cara menaikan omset"
]

export function Chatbot() {
  return (
    <IosOgShellCard>
      <div className="ml-auto px-4 py-2 mb-3 text-white bg-blue-500 rounded-2xl">
        <p className="text-sm md:text-base font-semibold text-base-900 truncate">
          <Typewriter texts={texts} delay={1} baseText=" " />
        </p>
      </div>
    </IosOgShellCard>
  )
}

function IosOgShellCard({ children }: { children: ReactNode }) {
  return (
    <div className={` ${poppins.className} w-full md:max-w-xl md:min-w-80 mx-auto flex flex-col rounded-lg bg-neutral-900 px-px pb-px shadow-inner-shadow`}>
      <div className="p-4 flex flex-col md:px-5">
        <div className="mb-2 text-sm md:text-neutral-500 text-neutral-500">
          Chatbot
        </div>
        <div className="mb-3 text-xs md:text-sm text-neutral-500">
          Today 11:29
        </div>
        <div className="ml-auto px-4 py-2 mb-3 text-white bg-blue-500 rounded-2xl">
          <span>Halo</span>
        </div>
        <div className="mr-auto px-4 py-2 mb-3 text-blue-500 bg-white rounded-2xl">
          <span>Halo! Apa kabar</span>
        </div>
        {children}
        <div className="mt-3 text-xs md:text-sm text-green-500">
         Terkirim
        </div>
      </div>
    </div>
  )
}
