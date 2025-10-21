'use client';

import { NavbarUser } from 'components/navbar/navbarUser';
import { ShineButton } from 'components/user/shineButton';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik', // opsional: untuk CSS variable
});

export default function Home({}) {
  return (
    <>
      {/* container */}

      {/* hero section */}
      <section className="h-screen w-full bg-whiteBg bg-gradient-to-b from-blue-300 via-blue-50 px-3 py-6 md:h-screen md:px-20 lg:py-10">
        {/* navbar */}
        <div className="sticky top-10 w-full lg:px-40 ">
          <NavbarUser />
        </div>

        {/* content */}
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-4 ${rubik.className}`}
        >
          <h1 className="text-center  text-[1.4rem] font-medium md:text-4xl xl:text-5xl xl:leading-tight">
            Perluaskan, Kenalkan Usaha Anda <br />
            <span className="text-gray-700">Dengan Langkah Mudah</span>
          </h1>

          <p className="max-w-[700px] text-center md:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime est
            iure officiis repudiandae eaque dolorem{' '}
          </p>

          {/* CTA Button desktop */}
          <div className="hidden gap-8 md:flex">
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
          <div className="flex gap-4 md:hidden md:gap-8">
            <ShineButton
              label="Daftar"
              size="sm"
              bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
              className={`${rubik.className} scale-70`}
            />
            <ShineButton
              label="Jelajah"
              size="sm"
              bgColor="linear-gradient(325deg, hsl(226 85% 40%) 0%, hsl(217 90% 45%) 55%, hsl(226 85% 40%) 90%)"
              className={`${rubik.className} scale-70`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
