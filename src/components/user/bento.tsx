import React from 'react';
import { LayoutDashboard, MapIcon, } from 'lucide-react';
import Image from 'next/image';
import Folder from './folder';
import { ItemsGlass } from './glassIcon';
import GlassIcons from './glassIcon';
import { Poppins, Rubik } from 'next/font/google';
import { Chatbot } from './landingPage/chatbot';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface BentoCardData {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  background?: React.ReactNode;
  images?: string[];
}

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: BentoCardData[];
  columns?: number;
  rowHeight?: string;
}

const BentoGrid = ({
  cards,
  columns = 3,
  rowHeight = 'auto',
  className,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        `grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-${columns}`,
        className,
      )}
      {...props}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={cn(
              'relative flex flex-col justify-end overflow-hidden rounded-2xl p-6',
              'h-[17rem]',
              'bg-white/40 backdrop-blur-lg',
              'border border-black/10',
              'shadow-inner shadow-black/20',
              'text-black',
              'group transition-all duration-300 ease-in-out',
              card.className,
            )}
          >
            {card.background && (
              <div className="absolute inset-0 z-0">
                {card.background}
                {card.images && card.images.length > 0 && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-3">
                    {card.images.map((src, i) => (
                      <div key={i} className="relative h-[150px] w-[150px]  ">
                        <Image
                          key={i}
                          src={src}
                          alt={`image-${i}`}
                          className="h-auto w-full object-contain"
                          fill
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Hover-revealed content */}
            <div className="relative z-10 w-full">
              <div
                className={cn(
                  'flex h-full flex-col justify-end',
                  'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
                  'transition-all duration-300 ease-out',
                )}
              >
                {card.icon && (
                  <Icon
                    className="mb-3 h-6 w-6 text-blue-800"
                    strokeWidth={2}
                  />
                )}
                <h3 className={`mb-2 text-lg font-semibold ${rubik.className}`}>
                  {card.title}
                </h3>
                <p className={`text-sm text-gray-600 ${poppins.className}`}>
                  {card.description}
                </p>
              </div>
            </div>

            {/* Hover overlay effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300 group-hover:bg-blue-600/5" />
          </div>
        );
      })}
    </div>
  );
};

export const Features: BentoCardData[] = [
  {
    icon: LayoutDashboard,
    title: 'Manajemen Penjualan',
    description: '',
    className: 'lg:col-span-2',
    background: (
      <>
        <h1
          className={` absolute left-1/2 top-6 z-10 -translate-x-[50%] font-black ${rubik.className} w-full text-center lg:text-8xl text-5xl text-purple-400`}
        >
          DASHBOARD
        </h1>
        <div className="absolute left-1/2 top-32 z-20 -translate-x-[50%] ">
          <Folder
            items={[
              <Image
                key={1}
                src={'/img/landingPage/barUp.png'}
                alt="paper-1"
                fill
                className="object-cover object-center"
              />,
              <Image
                key={2}
                src={'/img/landingPage/donatBar.png'}
                alt="paper-2"
                fill
                className="object-cover object-center"
              />,
              <Image
                key={3}
                src={'/img/landingPage/bot.jpg'}
                alt="paper-3"
                fill
                className="object-cover object-center"
              />,
            ]}
            size={1.5}
            color="#93c5fd"
            className="custom-folder"
          ></Folder>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-300 via-purple-100 to-white " />
      </>
    ),
  },
  {
    icon: MapIcon,
    title: 'Integrasi Google Map',
    description: '',
    background: (
      <>
        <h1
          className={` absolute left-1/2 top-6 z-10 -translate-x-[50%] font-black ${rubik.className} w-full text-center text-6xl text-white`}
        >
          GOOGLE <br /> MAP
        </h1>
        <div className="absolute inset-0 bg-gradient-to-b  from-blue-300 via-blue-100  to-white" />
      </>
    ),
    images: ['/img/landingpage/mapSvg.png'],
  },
  {
    icon: null,
    title: 'ChatBot',
    description: '',
    background: (
      <>
      <div className='absolute z-20 w-full'>
        <Chatbot
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50  to-white" />
      </>
    ),
  },
  {
    icon: null ,
    title: '',
    description: '',
    className: 'lg:col-span-2',
    background: (
      <>
      <h1
          className={` absolute left-1/2 top-6 z-10 -translate-x-[50%] font-black ${rubik.className} w-full text-center lg:text-8xl text-6xl text-white`}
        >
          PROMOSI 
        </h1>
        <div className="absolute left-1/2  top-1/2 z-10 -translate-x-[50%] -translate-y-[50%] ">
          <GlassIcons items={ItemsGlass} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200  via-orange-100 to-white " />
      </>
    ),
  },
];

export default function FeatureSection() {
  return (
    <section className="">
      {/* Bento Grid */}
      <div className="flex w-full justify-center">
        <div className="w-full max-w-5xl">
          <BentoGrid cards={Features} columns={3} />
        </div>
      </div>
    </section>
  );
}
