import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  Coffee,
  Shirt,
  Utensils,
  Palette,
  Home,
  Sparkles,
  Package,
  Cookie,
  Scissors,
  Flower2,
  Store,
  Search,
  X,
} from 'lucide-react';

// --- Core Data ---
const ChainsList = [
  {
    id: 1,
    name: 'Fashion & Pakaian',
    icon: Shirt,
    details: 'Batik, Tenun & Pakaian Lokal',
  },
  {
    id: 2,
    name: 'Kuliner',
    icon: Utensils,
    details: 'Makanan & Minuman Khas',
  },
  {
    id: 3,
    name: 'Kopi Nusantara',
    icon: Coffee,
    details: 'Kopi Lokal Berkualitas',
  },
  {
    id: 4,
    name: 'Kerajinan Tangan',
    icon: Palette,
    details: 'Handmade & Seni Lokal',
  },
  {
    id: 5,
    name: 'Furnitur',
    icon: Home,
    details: 'Mebel & Dekorasi Rumah',
  },
  {
    id: 6,
    name: 'Kecantikan',
    icon: Sparkles,
    details: 'Skincare & Kosmetik Lokal',
  },
  {
    id: 7,
    name: 'Produk Digital',
    icon: Package,
    details: 'Jasa & Layanan Digital',
  },
  {
    id: 8,
    name: 'Jajanan & Snack',
    icon: Cookie,
    details: 'Camilan Tradisional',
  },
  {
    id: 9,
    name: 'Jahit & Bordir',
    icon: Scissors,
    details: 'Konveksi & Bordir',
  },
  {
    id: 10,
    name: 'Tanaman Hias',
    icon: Flower2,
    details: 'Nursery & Hidroponik',
  },
  {
    id: 11,
    name: 'Toko Kelontong',
    icon: Store,
    details: 'Kebutuhan Sehari-hari',
  },
  {
    id: 12,
    name: 'Semua Kategori',
    icon: ShoppingBag,
    details: 'Lihat Semua UMKM',
  },
];

// --- Helper Components ---

const CarouselItemCard = ({ chain, side }) => {
  const {
    distanceFromCenter,
    id,
    name,
    details,
    logo,
    icon: FallbackIcon,
  } = chain;
  const distance = Math.abs(distanceFromCenter);
  const opacity = 1 - distance / 4;
  const scale = 1 - distance * 0.1;
  const yOffset = distanceFromCenter * 90;
  const xOffset = side === 'left' ? -distance * 50 : distance * 50;

  const IconOrLogo = (
    <div className="rounded-full border-2 border-blue-200 bg-blue-800 p-2 shadow-md">
      {logo ? (
        <img
          src={logo}
          alt={`${name} logo`}
          className="size-8 rounded-full object-cover"
        />
      ) : (
        <FallbackIcon className="size-8 text-white" />
      )}
    </div>
  );

  return (
    <motion.div
      key={id}
      className={`absolute hidden items-center gap-4 px-6 py-3 xl:flex
                ${side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
      animate={{
        opacity,
        scale,
        y: yOffset,
        x: xOffset,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {IconOrLogo}

      <div
        className={`mx-4 flex flex-col ${
          side === 'left' ? 'text-right' : 'text-left'
        }`}
      >
        <span className="text-md whitespace-nowrap font-semibold text-blue-900 lg:text-lg">
          {name}
        </span>
        <span className="text-xs text-gray-600 lg:text-sm">
          {details}
        </span>
      </div>
    </motion.div>
  );
};

// Mobile Carousel Component
const MobileCarousel = ({ items, currentIndex }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemWidth = 280; // Width of each card
      const offset = currentIndex * itemWidth;
      
      container.scrollTo({
        left: offset - (container.offsetWidth / 2) + (itemWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div 
      ref={containerRef}
      className="xl:hidden w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="flex gap-4 px-4" style={{ width: `${items.length * 280}px` }}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 w-64 snap-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0.5,
              scale: index === currentIndex ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-blue-800 p-4 border-2 border-blue-200">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <item.icon className="size-10 text-white" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-blue-900 text-center">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {item.details}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

const ChainCarousel = ({
  items = ChainsList,
  scrollSpeedMs = 2000,
  visibleItemCount = 9,
  className = '',
  onChainSelect,
  onCategoryChange, // New prop to handle category changes
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const rightSectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (rightSectionRef.current) {
      observer.observe(rightSectionRef.current);
    }

    return () => {
      if (rightSectionRef.current) {
        observer.unobserve(rightSectionRef.current);
      }
    };
  }, []);
  
  const totalItems = items.length;

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, scrollSpeedMs);

    return () => clearInterval(interval);
  }, [isPaused, totalItems, scrollSpeedMs]);

  // Scroll listener to pause carousel on page scroll
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setIsPaused(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsPaused(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized function for carousel items
  const getVisibleItems = useCallback(() => {
    const visibleItems = [];
    if (totalItems === 0) return [];

    const itemsToShow =
      visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
    const half = Math.floor(itemsToShow / 2);

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index += totalItems;
      if (index >= totalItems) index -= totalItems;

      visibleItems.push({
        ...items[index],
        originalIndex: index,
        distanceFromCenter: i,
      });
    }
    return visibleItems;
  }, [currentIndex, items, totalItems, visibleItemCount]);

  // Filtered list for search dropdown
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Handler for selecting an item from the dropdown
  const handleSelectChain = (id, name) => {
    const index = items.findIndex((c) => c.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPaused(true);
      if (onChainSelect) {
        onChainSelect(id, name);
      }
    }
    setSearchTerm(name);
    setShowDropdown(false);
  };

  const currentItem = items[currentIndex];

  return (
    <div id="explore-section" className={`space-y-8 xl:space-y-20 ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 xl:gap-12 px-4 md:px-8 xl:flex-row">
        
        {/* Left Section - Chain Carousel (Hidden on mobile) */}
        <motion.div
          className="relative hidden h-[450px] w-full max-w-md items-center justify-center xl:flex xl:max-w-2xl xl:-left-14"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 20,
            duration: 0.8,
          }}
        >
          {/* Fading overlay */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b"></div>
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t"></div>
          </div>

          {getVisibleItems().map((chain) => (
            <CarouselItemCard key={chain.id} chain={chain} side="left" />
          ))}
        </motion.div>

        {/* Middle Section - Text and Search Input */}
        <div className="flex w-full max-w-md flex-col gap-4 text-center xl:text-center">
          
          {/* Currently Selected Item Display - Desktop Only */}
          {currentItem && (
            <div className="hidden xl:flex mt-4 flex-col items-center justify-center gap-0">
              <div className="rounded-full bg-blue-800 p-3 shadow-lg border-2 border-blue-200">
                {currentItem.logo ? (
                  <img
                    src={currentItem.logo}
                    alt={`${currentItem.name} logo`}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <currentItem.icon className="size-10 text-white" />
                )}
              </div>
              <h3 className="mt-3 text-xl font-bold text-blue-900 xl:text-2xl">
                {currentItem.name}
              </h3>
              <p className="text-sm text-gray-600 xl:text-lg">
                {currentItem.details || 'View Details'}
              </p>
            </div>
          )}

          {/* Search Bar */}
          <div className="relative mx-auto w-full xl:mx-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                placeholder="Cari Kategori UMKM..."
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  setShowDropdown(val.length > 0);
                  if (val === '') setIsPaused(false);
                }}
                onFocus={() => {
                  if (searchTerm.length > 0) setShowDropdown(true);
                  setIsPaused(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 200);
                }}
                className="w-full cursor-pointer rounded-full border-2 border-blue-300 bg-white px-4 py-3 pl-12 pr-12 text-base xl:text-lg text-blue-900 placeholder-gray-500 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-blue-800" />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowDropdown(false);
                    setIsPaused(false);
                  }}
                  className="absolute right-4 text-blue-800 hover:text-blue-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Dropdown for search results */}
            {showDropdown && filteredItems.length > 0 && (
              <div className="absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-lg border-2 border-blue-200 bg-white shadow-xl">
                {filteredItems.slice(0, 10).map((chain) => (
                  <div
                    key={chain.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectChain(chain.id, chain.name);
                    }}
                    className="m-2 flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-150 hover:bg-blue-50 group"
                  >
                    <div className="p-1.5 bg-blue-100 rounded-full group-hover:bg-blue-800 transition-colors flex-shrink-0">
                      {chain.logo ? (
                        <img
                          src={chain.logo}
                          alt={`${chain.name} logo`}
                          className="size-6 rounded-full object-cover"
                        />
                      ) : (
                        <chain.icon size={20} className="text-blue-800 group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium text-blue-900 group-hover:text-blue-800 truncate">
                        {chain.name}
                      </span>
                      <span className="text-xs xl:text-sm text-gray-600 truncate">
                        {chain.details}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Chain Carousel (Hidden on mobile) */}
        <motion.div
          ref={rightSectionRef}
          className="relative hidden h-[450px] w-full max-w-md items-center justify-center xl:flex xl:max-w-2xl xl:-right-14"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: '100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 20,
            duration: 0.8,
          }}
        >
          {/* Fading overlay */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b"></div>
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t"></div>
          </div>

          {getVisibleItems().map((chain) => (
            <CarouselItemCard key={chain.id} chain={chain} side="right" />
          ))}
        </motion.div>
        
      </div>

      {/* Mobile Carousel - Only visible on mobile */}
      <MobileCarousel items={items} currentIndex={currentIndex} />

      {/* Mobile Dots Indicator */}
      <div className="flex xl:hidden justify-center gap-2 pb-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 2000);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-blue-800' 
                : 'w-2 bg-blue-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ChainCarousel;