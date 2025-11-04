// PricingSection.tsx
import React from 'react';

interface Feature {
  text: string;
  available: boolean;
}

interface PricingCardProps {
  title: string;
  price: string | number;
  period?: string;
  description: string;
  buttonText?: string;
  isRecommended?: boolean;
  recommendedBadge?: string;
  featuresTitle?: string;
  features: Feature[];
  onSubscribe?: () => void;
  rubikClassName: string;
  poppinsClassName: string;
}

interface PricingSectionProps {
  heading: string;
  subheading: string;
  cards: PricingCardProps[];
  rubikClassName: string;
  poppinsClassName: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = '/bulan',
  description,
  buttonText = 'Berlangganan',
  isRecommended = false,
  recommendedBadge = 'Rekomendasi',
  featuresTitle = 'Features',
  features,
  onSubscribe,
  rubikClassName,
  poppinsClassName,
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow relative ${isRecommended ? 'shadow-xl hover:shadow-2xl' : ''}`}>
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className={`${poppinsClassName} bg-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide`}>
            {recommendedBadge}
          </span>
        </div>
      )}
      
      <h3 className={`${rubikClassName} text-xl font-semibold text-gray-800 mb-4 ${isRecommended ? 'mt-4' : ''}`}>
        {title}
      </h3>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className={`${rubikClassName} text-5xl font-bold text-gray-900`}>
            {typeof price === 'number' ? `Rp ${price.toLocaleString('id-ID')}` : price}
          </span>
          <span className={`${poppinsClassName} text-gray-600 ml-2`}>{period}</span>
        </div>
      </div>
      
      <p className={`${poppinsClassName} text-gray-600 text-sm mb-8`}>
        {description}
      </p>
      
      <button
        onClick={onSubscribe}
        className={`${poppinsClassName} w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors mb-8`}
      >
        {buttonText}
      </button>

      <div>
        <h4 className={`${poppinsClassName} text-sm font-semibold text-gray-700 mb-4`}>
          {featuresTitle}
        </h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.available ? (
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className={`${poppinsClassName} ${feature.available ? 'text-gray-700' : 'text-gray-400'} text-sm`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PricingSection: React.FC<PricingSectionProps> = ({
  heading,
  subheading,
  cards,
  rubikClassName,
  poppinsClassName,
}) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-whiteBg via-white to-purple-100 py-20 px-4 overflow-hidden">
     
      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`${rubikClassName} text-4xl md:text-5xl font-medium text-gray-800 mb-4`}>
            {heading}
          </h2>
          <p className={`${poppinsClassName} text-gray-600 max-w-3xl mx-auto text-lg`}>
            {subheading}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {cards.map((card, index) => (
            <PricingCard
              key={index}
              {...card}
              rubikClassName={rubikClassName}
              poppinsClassName={poppinsClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

// Example Usage:
// 
// import PricingSection from './PricingSection';
// import { Rubik, Poppins } from 'next/font/google';
//
// const rubik = Rubik({ subsets: ['latin'] });
// const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] });
//
export const PricingCards = [
  {
    title: 'Trial',
    price: 0,
    description: 'Gratis masa percobaan selama 2 bulan untuk pengembangan bisnis anda dan memajukan UMKM Indonesia',
    featuresTitle: 'Benefit',
    features: [
      { text: '10 GB storage', available: true },
      { text: 'Basic file collaboration', available: true },
      { text: 'Mobile app access', available: true },
      { text: 'File synchronization across devices', available: true },
      { text: 'Support for common file types', available: true },
      { text: 'Automatic file backup', available: false },
      { text: 'Advanced security features', available: false },
    ],
    onSubscribe: () => console.log('Subscribe to Trial'),
  },
  {
    title: 'Professional',
    price: 399000,
    description: 'Paket rekomendasi untuk bisnismu. Nikmati semua fitur dan segala kelebihan tanpa ada batasan dan halangan',
    isRecommended: true,
    features: [
      { text: '100 GB storage', available: true },
      { text: 'Advanced file collaboration', available: true },
      { text: 'Mobile app access', available: true },
      { text: 'File synchronization across devices', available: true },
      { text: 'Support for common file types', available: true },
      { text: 'Automatic file backup', available: true },
      { text: 'Advanced security features', available: true },
      { text: 'Purchase additional features', available: true },
    ],
    onSubscribe: () => console.log('Subscribe to Professional'),
  },
  {
    title: 'Basic',
    price: 199000,
    description: 'Paket sederhana untuk memulai dan menjelajahi semua fitur serta mendapatkan beberapa benefit',
    features: [
      { text: 'Customizable storage capacity', available: true },
      { text: 'Advanced file collaboration', available: true },
      { text: 'Mobile app access', available: true },
      { text: 'File synchronization across devices', available: true },
      { text: 'Support for common file types', available: true },
      { text: 'Automatic file backup', available: true },
      { text: 'Advanced security features', available: true },
      { text: 'Customizable features', available: true },
    ],
    onSubscribe: () => console.log('Subscribe to Basic'),
  },
];

