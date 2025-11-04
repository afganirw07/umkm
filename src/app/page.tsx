'use client';
import { useState } from 'react';
import { NavbarUser } from 'components/navbar/navbarUser';
import { ShineButton } from 'components/user/shineButton';
import { Rubik } from 'next/font/google';
import Image from 'next/image';
import { TrustedUsers } from 'components/user/trustedUser';
import ButtonShine from 'components/user/buttonShine';
import { motion } from 'framer-motion';
import { RetroGrid } from 'components/user/retroGrid';
import { TextAnimate } from 'components/user/animateText';
import BentoGrid from 'components/user/bento';
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from '../components/user/marque';
import Link from 'next/link';
import { Features } from 'components/user/bento';
import { Check } from 'lucide-react';
import Magnet from 'components/user/magnet';
import { Poppins } from 'next/font/google';
import CircularGallery from 'components/user/circulargalery';
import PricingSection from 'components/user/landingPage/pricing';
import { PricingCards } from 'components/user/landingPage/pricing';
import { AnimatedTesti } from 'components/user/testimonial/testicontent';
import Footer from 'components/user/landingPage/footer';
import { PageLoader } from 'components/user/pageloader';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // bisa disesuaikan
});

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export default function Home({}) {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
       {isLoading && (
        <PageLoader
          companyName="VIVELY"
          rubikClassName={rubik.className}
          poppinsClassName={poppins.className}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}

      {/* hero section */}
      <section id='beranda' className="relative min-h-screen w-full overflow-hidden  bg-gradient-to-b from-blue-300 via-white to-whiteBg">
        <div className="absolute inset-0 top-0 h-full w-full overflow-hidden">
          <RetroGrid cellSize={70} opacity={0.8} lightLineColor="#bbbbbb" />
        </div>

        {/* navbar - sticky */}
        <div className="lg:px-30 fixed top-4 z-50 w-full px-3 py-6 md:top-8 md:px-20  lg:top-0 lg:py-6">
          <NavbarUser />
        </div>

        {/* content container */}
        <div className="relative z-10 mt-32 w-full px-3 md:mt-20 md:px-20 lg:mt-32">
          <div
            className={`flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-4 py-8 md:py-12 3xl:gap-8 ${rubik.className}`}
          >
            {/* logo card with hover animation */}
            <motion.div
              className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-xl bg-white shadow-[inset_-4px_0_8px_rgba(0,0,0,0.25)] md:h-[100px] md:w-[100px] md:rounded-lg"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: {
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                  scale: { duration: 0.2 },
                  boxShadow: { duration: 0.3 },
                },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={
                    'https://tse3.mm.bing.net/th/id/OIP.vz1OnfJX3xPAu6tmcYX4SAAAAA?pid=Api&P=0&h=180'
                  }
                  fill
                  alt="logo"
                />
              </motion.div>
            </motion.div>

            <h1 className="px-4 text-center text-[1.4rem] font-medium md:text-4xl lg:text-5xl 3xl:text-7xl">
              Perluaskan, Kenalkan Usaha Anda <br />
              <span className="text-gray-700">Dengan Langkah Mudah</span>
            </h1>

            <p className="max-w-[700px] px-4 text-center text-sm md:text-lg 3xl:text-2xl">
              Menyediakan bantuan untuk usaha anda yang sulit di jangkau dan
              jarang di ketahui masyarakat
            </p>

            {/* CTA Button desktop */}
            <div className="hidden md:flex md:gap-6 lg:scale-100 3xl:scale-125 3xl:gap-8">
               <Link href={"/daftar"}>
              <ShineButton
                label="Daftar"
                size="md"
                bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                />
                </Link>
              <Link href={"/jelajah"}>
              <ShineButton
                label="Jelajah"
                size="md"
                bgColor="linear-gradient(325deg, hsl(226 85% 40%) 0%, hsl(217 90% 45%) 55%, hsl(226 85% 40%) 90%)"
                />
                </Link>
            </div>

            {/* CTA Button mobile */}
            <div className="flex scale-[80%] gap-3 md:hidden">
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
            <div className="mt-4 scale-75 md:mt-6 md:scale-100 3xl:mt-12 3xl:scale-125">
              <TrustedUsers
                avatars={[
                  'img/avatars/avatar1.png',
                  'img/avatars/avatar2.png',
                  'img/avatars/avatar3.png',
                  'img/avatars/avatar4.png',
                  'img/avatars/avatar5.png',
                ]}
                ringColors={['']}
              />
            </div>
          </div>
        </div>

        {/* Floating widget cards - Hidden on mobile */}

        {/* card chartUp - Animated floating */}
        <motion.div
          className="absolute z-40 hidden w-[260px] rotate-6 cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-100 bg-white p-2 shadow-lg lg:flex xl:bottom-44 xl:left-44 xl:scale-75 3xl:bottom-60 3xl:left-52 3xl:scale-125"
          animate={{
            x: [0, 15, -10, 20, 0],
            y: [0, -20, 10, -15, 0],
            rotate: [6, 8, 4, 7, 6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
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
            <h3 className="text-sm font-semibold text-black">Meningkatkan</h3>
            <p className="text-xs text-gray-800">Penjualan usaha anda</p>
          </div>
        </motion.div>

        {/* card map - Animated floating */}
        <motion.div
          className="absolute z-40 hidden w-auto -rotate-3 cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-gray-100 bg-white p-3 shadow-lg lg:flex xl:bottom-44 xl:right-44 xl:scale-75 3xl:bottom-60 3xl:right-52 3xl:scale-125"
          animate={{
            x: [0, -20, 15, -10, 0],
            y: [0, 15, -25, 10, 0],
            rotate: [-3, -5, -1, -4, -3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
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
            <h3 className="text-wrap text-center text-sm font-semibold text-black">
              Terhubung ke <br /> Maps
            </h3>
          </div>
        </motion.div>
      </section>

      {/* marquee section */}
      <section className="flex h-auto w-full flex-col items-center justify-center space-y-8 bg-whiteBg py-16 md:space-y-12 3xl:space-y-20">
        {/* <h1 className={`text-3xl md:text-4xl 3xl:text-5xl text-center ${rubik.className} font-medium`}>Ratusan UMKM telah bergabung</h1> */}
      <ThreeDScrollTriggerContainer>
  <ThreeDScrollTriggerRow baseVelocity={20} direction={1}>
    <div className="flex gap-6">
      {/* Gambar 1 */}
      <div className="relative h-[140px] w-[200px] md:w-[250px] 3xl:w-[300px]">
        <Image
          src="https://fbcd.co/images/products/3802636c168b62fd041fdec5b263b9a0_resize.png"
          fill
          alt="logo 1"
          className="object-contain"
        />
      </div>

      {/* Gambar 2 */}
      <div className="relative h-[140px] w-[200px] md:w-[250px] 3xl:w-[300px]">
        <Image
          src="https://png.pngtree.com/png-clipart/20230206/ourmid/pngtree-culinary-logo-png-image_6583896.png"
          fill
          alt="logo 2"
          className="object-contain"
        />
      </div>

      <div className="relative h-[140px] w-[200px] md:w-[250px] 3xl:w-[300px]">
        <Image
          src="https://www.indoberbisnis.com/wp-content/uploads/2022/08/Logo-selera-bahari-1-2048x1301.png"
          fill
          alt="logo 2"
          className="object-contain"
        />
      </div>

      <div className="relative h-[140px] w-[200px] md:w-[250px] 3xl:w-[300px]">
        <Image
          src="https://www.creativefabrica.com/wp-content/uploads/2022/03/04/Fashion-logo-fashion-clothes-shop-Graphics-26436674-1.png"
          fill
          alt="logo 2"
          className="object-contain"
        />
      </div>

      <div className="relative h-[140px] w-[200px] md:w-[250px] 3xl:w-[300px]">
        <Image
          src="https://1.bp.blogspot.com/-Tvf785BO5C8/YAKUUNn6dzI/AAAAAAAACPs/iKcR4tUM5-0nE15CvR_LkMgJ5WDfa-OzACLcBGAsYHQ/s2048/Logo%2BWarung%2BMen%2BCobek.png"
          fill
          alt="logo 2"
          className="object-contain"
        />
      </div>
    </div>
  </ThreeDScrollTriggerRow>
</ThreeDScrollTriggerContainer>

      </section>
      <section id='tentang' className="relative flex h-auto min-h-screen w-full items-center justify-center overflow-hidden bg-whiteBg px-6 py-12 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-12 lg:gap-8 xl:flex-row xl:gap-12">
          {/* Bagian Tentang Kami */}

          <div className="flex w-full flex-col space-y-4 text-center md:items-center md:text-center lg:text-left xl:items-start  xl:self-start">
            <h1
              className={`w-fit self-center rounded-xl bg-gray-100 px-4 py-2 text-black shadow-sm md:self-auto ${rubik.className}`}
            >
              Tentang Kami
            </h1>
            <div className="flex flex-col gap-4">
              <h1
                className={`${rubik.className} text-2xl font-semibold xl:text-2xl 2xl:text-3xl 3xl:text-4xl`}
              >
                <TextAnimate animation="blurInUp" duration={0.5}>
                  Dibangun Bantu UMKM Indonesia
                </TextAnimate>
              </h1>

              <TextAnimate
                animation="blurIn"
                as="h1"
                duration={1.2}
                className="text-center text-base leading-relaxed lg:text-left xl:text-base 2xl:text-base 3xl:text-lg"
              >
                VIVELY di buat untuk berkontribusi dan menginginkan anda agar selalu memberikan dukungan kepada UMKM di wilayah indonesia dengan membeli produk mereka walaupun sedikit, dengan platform ini kalian bisa menjelajahi ataupun memperkenalkan usaha kalian agar lebih banyak di kenal oleh masyarakat sekitar
              </TextAnimate>
            </div>
            <ButtonShine className="" text="Bergabung Sekarang" />
          </div>

          {/* Bagian Image dan Box */}
          <div className="2xl:gap-34 flex flex-shrink-0 flex-col items-center justify-center gap-16 xl:flex-row xl:items-end xl:justify-end xl:gap-40 3xl:gap-56">
            <div className="relative z-10 h-[450px] w-[360px] flex-shrink-0 xl:h-[500px] xl:w-[400px] 2xl:h-[500px] 2xl:w-[480px] 3xl:h-[700px] 3xl:w-[700px]">
              {/* Mesh Gradient */}
              <div className="pointer-events-none absolute inset-0 -m-32">
                <div className="absolute left-32 top-32 h-[250px] w-[250px] rounded-full bg-blue-300 opacity-75 mix-blend-multiply blur-[60px]"></div>
                <div className="absolute bottom-32 right-32 h-[250px] w-[250px] rounded-full bg-purple-400/70 mix-blend-multiply blur-[70px]"></div>
                <div className="absolute bottom-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-400/40 mix-blend-multiply blur-[140px]"></div>
              </div>

              {/* Gambar - center dalam container */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src="/img/landingPage/mockup.png"
                  alt="mock"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Box Abu-abu */}
            <Magnet padding={80} disabled={false} magnetStrength={10}>
              <div className="group relative flex h-[200px] w-[200px]  rounded-2xl bg-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col justify-between p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-green-400 to-green-500 shadow-inner shadow-green-300/30">
                    <Check className="h-6 w-6 text-white" />
                  </div>

                  {/* Text */}
                  <p className="text-left text-lg font-semibold leading-snug tracking-tight ">
                    Untuk UMKM Lebih Besar
                  </p>
                </div>

                <div className="to-transparent pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40"></div>
              </div>
            </Magnet>
          </div>
        </div>
      </section>

      {/* Feature */}
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-whiteBg px-6 py-12 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Header */}
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-3">
          <h1
            className={`font-semibold ${rubik.className} text-center text-2xl lg:text-3xl 3xl:text-5xl`}
          >
            Fitur yang akan Anda dapatkan
          </h1>
          <p
            className={`${poppins.className} lg:text-md max-w-2xl text-center text-base font-medium text-gray-800 3xl:text-lg`}
          >
            Nikmati fitur yang memudahkan UMKM dalam berbagai sektor
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex w-full justify-center mt-0 3xl:mt-12">
          <div className="w-full max-w-5xl ">
            <BentoGrid cards={Features} columns={3} />
          </div>
        </div>
      </section>

      <section id='jelajah' className="flex h-auto w-full flex-col items-center justify-center bg-whiteBg py-16 ">
        <div className="relative h-[600px]">
          <CircularGallery
            bend={3}
            textColor="#344e86"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4">
          <h1
            className={`font-semibold ${rubik.className} text-center text-2xl lg:text-4xl 3xl:text-5xl `}
          >
            Jelajahi UMKM di Sekitar Anda
          </h1>
          <Link href={"/jelah"}>
          <ButtonShine className="" text="Jelajahi" />
          </Link>
        </div>
      </section>

      <section className='w-full h-auto'>
        <PricingSection
          heading="Langganan untuk Perkembangan"
          subheading="Dapatkan akses terhadap fitur penuh UMKM dengan membeli paket langganan, rasakan kemudahan dan kemajuan bisnismu bersama kami"
          cards={PricingCards}
          rubikClassName={rubik.className}
          poppinsClassName={poppins.className}
        />
      </section>

      <section className='w-full h-auto py-16 flex flex-col bg-gradient-to-b from-purple-100 via-white to-whiteBg justify-center items-center'>
              <h1 className={`font-semibold ${rubik.className} text-center text-2xl lg:text-4xl 3xl:text-6xl `}>Sentuhan Ulasan Mereka</h1>
              <div>
                <AnimatedTesti/>
              </div>
      </section>
      <Footer
      rubikClassName={rubik.className}
      poppinsClassName={poppins.className}
      />
      
    </>
  );
}
