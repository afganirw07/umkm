'use client';

import Link from 'next/link';
import { Rubik, Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import ChainCarousel from 'components/user/landingPage/chainCarousel';
import { ChainsList } from 'components/user/landingPage/chainCarousel';
import { UmkmCard } from 'components/user/landingPage/umkmCard';
import Footer from 'components/user/landingPage/footer';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // bisa disesuaikan
});



export default function Jelajah() {
  return (
    <>
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-blue-300 via-white to-whiteBg">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="2" fill="#1e40af" />
              </pattern>
              <mask id="indonesia-shape">
                <rect width="100%" height="100%" fill="black" />
                <ellipse cx="50%" cy="45%" rx="35%" ry="15%" fill="white" />
                <ellipse
                  cx="45%"
                  cy="50%"
                  rx="20%"
                  ry="8%"
                  fill="white"
                  transform="rotate(-15 50 50)"
                />
                <ellipse
                  cx="60%"
                  cy="52%"
                  rx="18%"
                  ry="10%"
                  fill="white"
                  transform="rotate(10 60 52)"
                />
                <circle cx="70%" cy="48%" r="8%" fill="white" />
                <ellipse cx="38%" cy="48%" rx="12%" ry="7%" fill="white" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#dots)"
              mask="url(#indonesia-shape)"
            />
          </svg>
        </div>

        {/* Back Button */}
        <div className="lg:px-30 fixed top-4 z-50 flex w-full justify-center px-3 py-6 md:top-8 md:px-20 lg:top-0 lg:py-6 3xl:top-6">
          <Link href={'/'}>
            <button
              className={`${rubik.className} rounded-full bg-white px-6 py-3 font-medium text-black shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-50 hover:shadow-2xl active:scale-95`}
            >
              Kembali ke Beranda
            </button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          <motion.h1
            className={`text-center text-[1.8rem] font-bold text-blue-800 md:text-5xl lg:text-6xl ${rubik.className} leading-tight`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            JELAJAHI UMKM
            <br />
            DI <span className="text-red-600">INDONESIA</span>
          </motion.h1>

          <motion.p
            className={`${rubik.className} max-w-2xl text-center text-lg text-gray-700 md:text-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Temukan berbagai produk UMKM di wilayah Indonesia
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#umkm">

            <button
              className={`${rubik.className} group relative overflow-hidden rounded-full bg-blue-800 px-4 py-2 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-blue-900 hover:shadow-2xl md:px-8 md:py-4 md:text-lg`}
              >
              <span className="relative z-10 flex items-center gap-2">
                Mulai Jelajah
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-blue-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                />
            </button>
                </a>
          </motion.div>

          {/* Floating animated elements */}
          <motion.div
            className="absolute left-10 top-20 h-16 w-16 rounded-full bg-blue-400 opacity-30 blur-xl"
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-32 right-20 h-20 w-20 rounded-full bg-blue-500 opacity-20 blur-xl"
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </section>

      <section id='umkm' className="h-auto w-full lg:py-20 bg-whiteBg overflow-x-hidden">
        <ChainCarousel
          items={ChainsList}
          visibleItemCount={7}
          scrollSpeedMs={1500}
          onChainSelect={(id, name) => console.log('Selected:', id, name)}
        />
      </section>

      <section className='w-full h-auto py-12 bg-whiteBg flex justify-center items-center'>
            <UmkmCard/>
      </section>
      <Footer
      rubikClassName={rubik.className}
      poppinsClassName={poppins.className}
      />
    </>
  );
}