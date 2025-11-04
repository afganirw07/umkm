import { useState } from 'react';
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

import ChainCarousel from './chainCarousel';
import UmkmCard from './umkmCard';

const ChainsList = [
  { id: 1, name: 'Fashion & Pakaian', icon: Shirt, details: 'Batik, Tenun & Pakaian Lokal' },
  { id: 2, name: 'Kuliner', icon: Utensils, details: 'Makanan & Minuman Khas' },
  { id: 3, name: 'Kopi Nusantara', icon: Coffee, details: 'Kopi Lokal Berkualitas' },
  { id: 4, name: 'Kerajinan Tangan', icon: Palette, details: 'Handmade & Seni Lokal' },
  { id: 5, name: 'Furnitur', icon: Home, details: 'Mebel & Dekorasi Rumah' },
  { id: 6, name: 'Kecantikan', icon: Sparkles, details: 'Skincare & Kosmetik Lokal' },
  { id: 7, name: 'Produk Digital', icon: Package, details: 'Jasa & Layanan Digital' },
  { id: 8, name: 'Jajanan & Snack', icon: Cookie, details: 'Camilan Tradisional' },
  { id: 9, name: 'Jahit & Bordir', icon: Scissors, details: 'Konveksi & Bordir' },
  { id: 10, name: 'Tanaman Hias', icon: Flower2, details: 'Nursery & Hidroponik' },
  { id: 11, name: 'Toko Kelontong', icon: Store, details: 'Kebutuhan Sehari-hari' },
  { id: 12, name: 'Semua Kategori', icon: ShoppingBag, details: 'Lihat Semua UMKM' },
];

// Demo Component - Replace with your actual components
const UmkmWithCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    // Scroll to UMKM cards section
    setTimeout(() => {
      const element = document.getElementById('umkm-cards-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Jelajahi UMKM Nusantara
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Temukan beragam produk lokal berkualitas dari seluruh Indonesia
        </p>
      </div>

      {/* Category Carousel Section */}
      <div className="py-10">
        <SimpleCategoryCarousel 
          items={ChainsList}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* UMKM Cards Section */}
      <div id="umkm-cards-section" className="py-10">
        <SimpleUmkmCard selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

// Simplified Category Carousel
const SimpleCategoryCarousel = ({ items, onCategoryChange }) => {
  const [currentIndex, setCurrentIndex] = useState(11); // Start with "Semua Kategori"
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const currentItem = items[currentIndex];

  const handleSelectCategory = (index) => {
    setCurrentIndex(index);
    if (onCategoryChange) {
      onCategoryChange(items[index].name);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Current Category Display */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="rounded-full bg-blue-800 p-4 shadow-lg border-2 border-blue-200">
          <currentItem.icon className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-blue-900">
          {currentItem.name}
        </h3>
        <p className="text-gray-600">
          {currentItem.details}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            placeholder="Cari Kategori UMKM..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full rounded-full border-2 border-blue-300 bg-white px-4 py-3 pl-12 pr-12 text-base text-blue-900 placeholder-gray-500 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
          />
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-blue-800" />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setShowDropdown(false);
              }}
              className="absolute right-4 text-blue-800 hover:text-blue-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && filteredItems.length > 0 && (
          <div className="absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-lg border-2 border-blue-200 bg-white shadow-xl">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const itemIndex = items.findIndex(i => i.id === item.id);
                  handleSelectCategory(itemIndex);
                  setSearchTerm('');
                  setShowDropdown(false);
                }}
                className="m-2 flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-50 group"
              >
                <div className="p-1.5 bg-blue-100 rounded-full group-hover:bg-blue-800 transition-colors flex-shrink-0">
                  <item.icon size={20} className="text-blue-800 group-hover:text-white" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium text-blue-900 truncate">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-600 truncate">
                    {item.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {items.slice(0, -1).map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => handleSelectCategory(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl border-2 transition-all ${
              currentIndex === index
                ? 'bg-blue-800 border-blue-800 text-white shadow-lg'
                : 'bg-white border-blue-200 text-blue-900 hover:border-blue-400'
            }`}
          >
            <item.icon className={`w-8 h-8 mx-auto mb-2 ${
              currentIndex === index ? 'text-white' : 'text-blue-800'
            }`} />
            <p className="text-sm font-medium text-center">
              {item.name}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Simplified UMKM Card (use your actual component)
const SimpleUmkmCard = ({ selectedCategory }) => {
  const dummyShops = [
    { name: "Batik Cendana", category: "Fashion & Pakaian", icon: Shirt },
    { name: "Tenun Flores", category: "Fashion & Pakaian", icon: Shirt },
    { name: "Warung Mbok Darmi", category: "Kuliner", icon: Utensils },
    { name: "Rendang Minang Jaya", category: "Kuliner", icon: Utensils },
    { name: "Kopi Gayo Brew", category: "Kopi Nusantara", icon: Coffee },
    { name: "Toraja Highland", category: "Kopi Nusantara", icon: Coffee },
    { name: "Anyaman Bambu", category: "Kerajinan Tangan", icon: Palette },
    { name: "Gerabah Kasongan", category: "Kerajinan Tangan", icon: Palette },
    { name: "Mebel Jati Jepara", category: "Furnitur", icon: Home },
    { name: "Rotan Cirebon", category: "Furnitur", icon: Home },
    { name: "Bali Natural Skincare", category: "Kecantikan", icon: Sparkles },
    { name: "Lulur Nusantara", category: "Kecantikan", icon: Sparkles },
    { name: "Desain Grafis Indo", category: "Produk Digital", icon: Package },
    { name: "Web Developer Lokal", category: "Produk Digital", icon: Package },
    { name: "Keripik Singkong", category: "Jajanan & Snack", icon: Cookie },
    { name: "Dodol Garut", category: "Jajanan & Snack", icon: Cookie },
    { name: "Konveksi Mandiri", category: "Jahit & Bordir", icon: Scissors },
    { name: "Bordir Tasikmalaya", category: "Jahit & Bordir", icon: Scissors },
    { name: "Nursery Hijau Daun", category: "Tanaman Hias", icon: Flower2 },
    { name: "Hidroponik Urban", category: "Tanaman Hias", icon: Flower2 },
  ];

  const filteredShops = selectedCategory === "Semua Kategori"
    ? dummyShops
    : dummyShops.filter(shop => shop.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Category Info */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">
          {selectedCategory === "Semua Kategori" ? "Semua UMKM" : selectedCategory}
        </h2>
        <p className="text-gray-600">
          Menampilkan {filteredShops.length} UMKM
        </p>
      </div>

      {/* Cards Grid */}
      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop, index) => (
            <motion.div
              key={shop.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-6 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <shop.icon className="w-8 h-8 text-blue-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {shop.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <shop.icon size={14} className="text-blue-600" />
                    {shop.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <Package className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Belum Ada UMKM
          </h3>
          <p className="text-gray-600">
            Belum ada UMKM terdaftar di kategori {selectedCategory}
          </p>
        </div>
      )}
    </div>
  );
};

export default UmkmWithCategoryFilter;