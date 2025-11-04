import React from 'react';
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

// Komponen Reusable untuk ikon sosial media
const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer" size={30} />
);

// Interface untuk props
interface FooterProps {
  rubikClassName: string;
  poppinsClassName: string;
}

// Komponen Footer
const Footer: React.FC<FooterProps> = ({ rubikClassName, poppinsClassName }) => {
  // Konten footer
  const items = [
    // Ikon sosial media
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaTwitterSquare },
    { type: 'icon', icon: FaGithubSquare },
    // Bagian footer
    { type: 'section', title: 'Dukungan', items: ['Harga', 'Dokumentasi', 'Panduan', 'Berita'] },
    { type: 'section', title: 'Perusahaan', items: ['Tentang Kami', 'Fitur', 'Manfaat', 'Layanan', 'Testimoni'] },
    { type: 'section', title: 'Legal', items: [ 'Kebijakan', 'Syarat & Ketentuan'] },
  ];

  return (
    <div className='bg-blue-800 mx-auto py-16  px-3 md:px-16 grid lg:grid-cols-3 gap-8 text-gray-200'>
      {/* Bagian kiri (brand + ikon sosial media) */}
      <div>
        <h1 className={`${rubikClassName} w-full text-4xl xl:text-5xl font-bold text-white`}>
          VIVELY
        </h1>
        <p className={`${poppinsClassName} py-4 text-gray-100`}>
         VIVELY Hadir untuk membantu para pelaku usaha UMKM di Indonesia untuk mengekspose usaha mereka
        </p>
        <div className='flex gap-10 md:w-[75%] my-6'>
          {/* Render ikon sosial media */}
          {items.map((item, index) =>
            item.type === 'icon' ? <SocialIcon key={index} icon={item.icon} /> : null
          )}
        </div>
      </div>

      {/* Bagian kanan (menu footer) */}
      <div className='lg:col-span-2 flex md:justify-evenly justify-between mt-6'>
        {items.map((item, index) =>
          item.type === 'section' ? (
            <div key={index}>
              <h6 className={`${rubikClassName} font-semibold text-white text-xl mb-2`}>
                {item.title}
              </h6>
              <ul>
                {item.items.map((subItem, subIndex) => (
                  <li 
                    key={subIndex} 
                    className={`${poppinsClassName} py-2 text-sm text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer`}
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Footer;

