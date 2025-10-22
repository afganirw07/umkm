'use client';

import { NavbarUser } from 'components/navbar/navbarUser';
import { ShineButton } from 'components/user/shineButton';
import { Rubik } from 'next/font/google';
import Image from 'next/image';
import { TrustedUsers } from 'components/user/trustedUser';
import { motion } from 'framer-motion';
import { RetroGrid } from 'components/user/retroGrid';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export default function Home({}) {
  return (
    <>
      {/* hero section */}
      <section className="relative min-h-screen w-full bg-whiteBg bg-gradient-to-b from-blue-300 via-blue-50 to-white overflow-hidden">
      
        
        {/* navbar - sticky */}
        <div className="fixed top-4 md:top-8 lg:top-0 z-50 w-full px-3 py-6 md:px-20 lg:px-40 lg:py-10">
          <NavbarUser />
        </div>

        {/* content container */}
        <div className="relative w-full px-3 md:px-20 lg:mt-40 md:mt-20 mt-32 z-10">
          <div
            className={`flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-4 py-8 md:py-12 3xl:gap-8 ${rubik.className}`}
          >

            {/* logo card with hover animation */}
            <motion.div 
              className="flex justify-center items-center bg-white md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-xl md:rounded-lg shadow-[inset_-4px_0_8px_rgba(0,0,0,0.25)] cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { 
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  scale: { duration: 0.2 },
                  boxShadow: { duration: 0.3 }
                }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] relative'
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={"https://tse3.mm.bing.net/th/id/OIP.vz1OnfJX3xPAu6tmcYX4SAAAAA?pid=Api&P=0&h=180"}
                  fill
                  alt='logo'
                />
              </motion.div>
            </motion.div>

            <h1 className="text-center text-[1.4rem] font-medium lg:text-5xl 3xl:text-7xl px-4">
              Perluaskan, Kenalkan Usaha Anda <br />
              <span className="text-gray-700">Dengan Langkah Mudah</span>
            </h1>

            <p className="max-w-[700px] text-center text-sm md:text-lg 3xl:text-2xl px-4">
             Menyediakan bantuan untuk usaha anda yang sulit di jangkau dan jarang di ketahui masyarakat
            </p>

            {/* CTA Button desktop */}
            <div className="hidden md:gap-6 3xl:gap-8 md:flex lg:scale-100 3xl:scale-125">
              <ShineButton
                label="Daftar"
                size="md"
                bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
              />
              <ShineButton
                label="Jelajah"
                size="md"
                bgColor="linear-gradient(325deg, hsl(226 85% 40%) 0%, hsl(217 90% 45%) 55%, hsl(226 85% 40%) 90%)"
              />
            </div>

            {/* CTA Button mobile */}
            <div className="flex gap-3 md:hidden scale-[80%]">
              <ShineButton
                label="Daftar"
                size="sm"
                bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                className={`${rubik.className}`}
              />
              <ShineButton
                label="Jelajah"
                size="sm"
                bgColor="linear-gradient(325deg, hsl(226 85% 40%) 0%, hsl(217 90% 45%) 55%, hsl(226 85% 40%) 90%)"
                className={`${rubik.className}`}
              />
            </div>

            {/* user trusted */}
            <div className='mt-4 md:mt-6 3xl:mt-12 scale-75 md:scale-100 3xl:scale-125'>
              <TrustedUsers
                avatars={[
                  "img/avatars/avatar1.png",
                  "img/avatars/avatar2.png",
                  "img/avatars/avatar3.png",
                  "img/avatars/avatar4.png",
                  "img/avatars/avatar5.png",
                ]}
                ringColors={[""]}
              />
            </div>

          </div>
        </div>

        {/* Floating widget cards - Hidden on mobile */}
        
        {/* card chartUp - Animated floating */}
        <motion.div 
          className="hidden lg:flex absolute left-52 bottom-60 rotate-6 z-40 w-[260px] items-center gap-3 rounded-xl bg-white p-2 shadow-lg border-2 border-gray-100 cursor-pointer"
          animate={{
            x: [0, 15, -10, 20, 0],
            y: [0, -20, 10, -15, 0],
            rotate: [6, 8, 4, 7, 6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src="/img/landingPage/chartUp.jpg"
              alt="Chart Up"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-black">
              Meningkatkan
            </h3>
            <p className="text-xs text-gray-800">
              Penjualan usaha anda
            </p>
          </div>
        </motion.div>
        
        {/* card map - Animated floating */}
        <motion.div 
          className="hidden lg:flex absolute right-52 bottom-60 -rotate-3 z-40 flex-col w-auto items-center gap-3 rounded-xl bg-white p-3 shadow-lg border-2 border-gray-100 cursor-pointer"
          animate={{
            x: [0, -20, 15, -10, 0],
            y: [0, 15, -25, 10, 0],
            rotate: [-3, -5, -1, -4, -3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src="/img/landingPage/map.jpg"
              alt="Map"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-sm text-center text-wrap font-semibold text-black">
              Terhubung ke <br /> Maps
            </h3>
          </div>
        </motion.div>

      </section>
    </>
  );
}