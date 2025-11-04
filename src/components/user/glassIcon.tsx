import React from 'react';
import Image from 'next/image';

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

export const ItemsGlass = [
  {
    icon: <Image src="/img/landingPage/facebook.png" alt="Facebook"  fill className="w-full h-full object-contain" />,
    color: 'facebook',
    label: 'Facebook'
  },
  {
    icon: <Image src="/img/landingPage/instagram.png" alt="Instagram" fill  className="w-full h-full object-contain" />,
    color: 'instagram',
    label: 'Instagram'
  },
  {
    icon: <Image src="/img/landingPage/tiktok.png" alt="Tiktok"  fill className="w-full h-full object-contain" />,
    color: 'tiktok',
    label: 'Tiktok'
  },
  {
    icon: <Image src="/img/landingPage/youtube.png" alt="Youtube"  fill className="w-full h-full object-contain" />,
    color: 'youtube',
    label: 'Youtube'
  },
];

const gradientMapping: Record<string, string> = {
  facebook: 'linear-gradient(135deg, #1877F2, #0D47A1)',    
  tiktok: 'linear-gradient(135deg, #69C9D0, #EE1D52)',       
  instagram: 'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)', 
  youtube: 'linear-gradient(135deg, #FF0000, #C4302B)',     
};


const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };


  return (
    <div className={`flex  md:flex-nowrap justify-center items-center gap-6  sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 mx-auto py-4 sm:py-6 md:py-8 lg:py-12 overflow-visible ${className || ''}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          aria-label={item.label}
          className={`relative bg-transparent outline-none w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
            item.customClass || ''
          }`}
        >
          {/* Shadow/Background Layer */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
            style={{
              ...getBackgroundStyle(item.color),
              boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)'
            }}
          ></span>

          {/* Glass Layer with Icon */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
            style={{
              boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset'
            }}
          >
            <span className="m-auto w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center" aria-hidden="true">
              {item.icon}
            </span>
          </span>

          {/* Label */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 text-center whitespace-nowrap leading-[2] text-xs sm:text-sm md:text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
