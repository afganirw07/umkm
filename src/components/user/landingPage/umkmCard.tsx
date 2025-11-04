"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Shirt,
  Utensils,
  Coffee,
  MapPin,
  Palette,
  Home,
  Sparkles,
  Package,
  Cookie,
  Scissors,
  Flower2,
} from "lucide-react";

/* === MAIN COMPONENT === */
export function UmkmCard() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      setActive(null);
    };
    if (active) {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [active]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
          />
        )}
      </AnimatePresence>

      {/* Modal Detail Toko */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[480px] md:max-h-[90%] bg-white dark:bg-neutral-900 rounded-3xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Foto toko */}
              <div className="relative">
                <img
                  src={active.img}
                  alt={active.name}
                  className="w-full h-52 object-cover"
                />
                <motion.button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* Detail toko */}
              <div className="p-5 overflow-y-auto max-h-[70vh] space-y-4">
                <div>
                  <h3 className="font-bold text-2xl text-neutral-800 dark:text-white">
                    {active.name}
                  </h3>
                  <p className="text-neutral-500 flex items-center gap-1">
                    <active.icon size={16} className="text-blue-600" />
                    {active.category}
                  </p>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {active.desc}
                </p>

                {/* Lokasi */}
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <MapPin size={16} />
                  <span>{active.location}</span>
                </div>

                {/* Produk */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {active.products.map((p, i) => (
                    <div
                      key={i}
                      className="border rounded-xl overflow-hidden bg-gray-50 dark:bg-neutral-800"
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                          {p.name}
                        </p>
                        <p className="text-xs text-blue-600 font-semibold">
                          Rp {p.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* List UMKM */}
      <ul className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
        {dummyShops.map((shop) => (
          <motion.div
            layoutId={`card-${shop.name}-${id}`}
            key={shop.name}
            onClick={() => setActive(shop)}
            className="p-4 flex items-center gap-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl cursor-pointer hover:bg-blue-50 dark:hover:bg-neutral-700 transition"
          >
            <img
              src={shop.img}
              alt={shop.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex flex-col flex-1">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                {shop.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <shop.icon size={14} className="text-blue-600" />
                {shop.category}
              </p>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

/* === Close Icon === */
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-black dark:text-white"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

/* === Dummy Data UMKM - 10 Kategori === */
const dummyShops = [
 {
    name: "Batik Cendana",
    category: "Fashion & Pakaian",
    icon: Shirt,
    img: "https://1.bp.blogspot.com/-Jw-8cVtDLcg/V4qvEBdOE9I/AAAAAAAAWyg/74bnHpkXDIQs7ChOz2p2pOF4ey-kLW4_gCLcB/s1600/baju-batik-pria-bagus.jpg",
    location: "Jl. Batik No. 21, Pekalongan",
    desc: "Produsen batik tulis dari Pekalongan dengan motif klasik dan pewarna alami. Mengangkat filosofi budaya Jawa dalam setiap coraknya.",
    products: [
      {
        name: "Batik Tulis Premium",
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
        price: 250000,
      },
      {
        name: "Kemeja Batik Pria",
        img: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800",
        price: 150000,
      },
    ],
  },
  

  // 2. Kuliner
  {
    name: "Warung Mbok Darmi",
    category: "Kuliner",
    icon: Utensils,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    location: "Jl. Raya Madiun No. 45, Jawa Timur",
    desc: "Warung legendaris di Madiun yang menyajikan nasi pecel dan sambal kacang buatan sendiri. Dikenal karena rasa autentik dan suasana rumahan yang hangat.",
    products: [
      {
        name: "Nasi Pecel Komplit",
        img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
        price: 15000,
      },
      {
        name: "Sambal Kacang Botolan",
        img: "https://images.unsplash.com/photo-1596040033229-a0b3b7d80613?w=800",
        price: 20000,
      },
    ],
  },
  {
    name: "Rendang Minang Jaya",
    category: "Kuliner",
    icon: Utensils,
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    location: "Jl. Veteran No. 12, Padang",
    desc: "Rumah makan Padang dengan resep rendang turun-temurun. Menggunakan daging pilihan dan rempah asli dari Sumatera Barat.",
    products: [
      {
        name: "Rendang Sapi Premium",
        img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800",
        price: 50000,
      },
      {
        name: "Gulai Kambing",
        img: "https://images.unsplash.com/photo-1585937421612-70e008356f9b?w=800",
        price: 45000,
      },
    ],
  },


  {
    name: "Toraja Highland Coffee",
    category: "Kopi Nusantara",
    icon: Coffee,
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    location: "Jl. Pasar Bolu No. 7, Toraja, Sulawesi Selatan",
    desc: "Kopi Toraja dengan karakteristik rasa earthy dan full body. Ditanam di ketinggian 1400-1800 mdpl dengan proses natural yang sempurna.",
    products: [
      {
        name: "Toraja Kalosi 250g",
        img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
        price: 70000,
      },
      {
        name: "Espresso Toraja",
        img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04",
        price: 18000,
      },
    ],
  },

  // 4. Kerajinan Tangan
  {
    name: "Anyaman Bambu Asri",
    category: "Kerajinan Tangan",
    icon: Palette,
    img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
    location: "Jl. Kerajinan No. 15, Tasikmalaya",
    desc: "Pengrajin anyaman bambu dengan teknik tradisional. Menghasilkan berbagai produk dekoratif dan fungsional yang ramah lingkungan.",
    products: [
      {
        name: "Keranjang Anyaman Set",
        img: "https://images.unsplash.com/photo-1590736969955-71cc94901144",
        price: 75000,
      },
      {
        name: "Tatakan Gelas Bambu",
        img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        price: 25000,
      },
    ],
  },
  {
    name: "Gerabah Kasongan",
    category: "Kerajinan Tangan",
    icon: Palette,
    img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
    location: "Jl. Kasongan No. 25, Bantul, Yogyakarta",
    desc: "Sentra kerajinan gerabah dan keramik dari tanah liat berkualitas. Produk handmade dengan detail ukiran yang indah.",
    products: [
      {
        name: "Vas Bunga Keramik",
        img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
        price: 85000,
      },
      {
        name: "Piring Set Gerabah",
        img: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2",
        price: 120000,
      },
    ],
  },

  // 5. Furnitur
  {
    name: "Mebel Jati Jepara",
    category: "Furnitur",
    icon: Home,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    location: "Jl. Ki Manteb No. 100, Jepara, Jawa Tengah",
    desc: "Produsen furnitur kayu jati dengan kualitas ekspor. Desain klasik dan modern dengan finishing premium.",
    products: [
      {
        name: "Kursi Tamu Jati Ukir",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        price: 2500000,
      },
      {
        name: "Meja Makan Minimalis",
        img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
        price: 3000000,
      },
    ],
  },
  {
    name: "Rotan Cirebon Craft",
    category: "Furnitur",
    icon: Home,
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
    location: "Jl. Plered No. 88, Cirebon, Jawa Barat",
    desc: "Spesialis furnitur rotan dengan desain kontemporer. Ringan, kuat, dan cocok untuk interior maupun eksterior.",
    products: [
      {
        name: "Sofa Rotan 3 Seater",
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        price: 1800000,
      },
      {
        name: "Rak Buku Rotan",
        img: "https://images.unsplash.com/photo-1594620302200-9a762244a156",
        price: 750000,
      },
    ],
  },

  // 6. Kecantikan
  {
    name: "Bali Natural Skincare",
    category: "Kecantikan",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
    location: "Jl. Sunset Road No. 55, Seminyak, Bali",
    desc: "Brand skincare lokal dengan bahan alami dari Bali. Tanpa paraben dan cruelty-free. Cocok untuk iklim tropis Indonesia.",
    products: [
      {
        name: "Face Serum Tropical Glow",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
        price: 95000,
      },
      {
        name: "Sunscreen SPF 50",
        img: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        price: 65000,
      },
    ],
  },
  {
    name: "Lulur Tradisional Nusantara",
    category: "Kecantikan",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    location: "Jl. Solo No. 33, Surakarta, Jawa Tengah",
    desc: "Produk perawatan tubuh berbasis rempah tradisional Jawa. Lulur, masker, dan scrub dengan resep turun-temurun.",
    products: [
      {
        name: "Lulur Kunyit Susu",
        img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
        price: 35000,
      },
      {
        name: "Body Scrub Kopi",
        img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
        price: 45000,
      },
    ],
  },

  // 7. Produk Digital
  {
    name: "Desain Grafis Indo",
    category: "Produk Digital",
    icon: Package,
    img: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9",
    location: "Jl. Gatot Subroto No. 12, Jakarta Selatan",
    desc: "Jasa desain grafis untuk UMKM dan startup. Logo, branding, social media kit, dan kemasan produk dengan harga terjangkau.",
    products: [
      {
        name: "Paket Logo + Brand Identity",
        img: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        price: 300000,
      },
      {
        name: "Social Media Design 1 Bulan",
        img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
        price: 450000,
      },
    ],
  },
  {
    name: "Web Developer Lokal",
    category: "Produk Digital",
    icon: Package,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    location: "Jl. Bandung No. 77, Bandung, Jawa Barat",
    desc: "Jasa pembuatan website dan toko online untuk UMKM. Responsif, SEO-friendly, dan dengan dukungan maintenance.",
    products: [
      {
        name: "Landing Page Profesional",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166",
        price: 1500000,
      },
      {
        name: "Toko Online Full Features",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        price: 3500000,
      },
    ],
  },

  // 8. Jajanan & Snack
  {
    name: "Keripik Singkong Bu Anis",
    category: "Jajanan & Snack",
    icon: Cookie,
    img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
    location: "Jl. Diponegoro No. 44, Malang, Jawa Timur",
    desc: "Keripik singkong renyah dengan berbagai varian rasa. Tanpa pengawet dan dibuat fresh setiap hari.",
    products: [
      {
        name: "Keripik Singkong Original",
        img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
        price: 12000,
      },
      {
        name: "Keripik Pedas Manis",
        img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
        price: 15000,
      },
    ],
  },
  {
    name: "Dodol Garut Asli",
    category: "Jajanan & Snack",
    icon: Cookie,
    img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800",
    location: "Jl. Ciledug No. 20, Garut, Jawa Barat",
    desc: "Dodol khas Garut dengan tekstur lembut dan rasa manis legit. Terbuat dari ketan, gula merah, dan santan pilihan.",
    products: [
      {
        name: "Dodol Ketan Original",
        img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=800",
        price: 25000,
      },
      {
        name: "Dodol Durian",
        img: "https://images.unsplash.com/photo-1510822657723-bad8230b33e1?w=800",
        price: 35000,
      },
    ],
  },

  // 9. Jahit & Bordir
  {
    name: "Konveksi Mandiri Jaya",
    category: "Jahit & Bordir",
    icon: Scissors,
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    location: "Jl. Industri No. 66, Tangerang, Banten",
    desc: "Konveksi berkualitas untuk kaos, seragam, dan merchandise. Melayani pesanan satuan hingga ribuan pcs.",
    products: [
      {
        name: "Kaos Cotton Combed Custom",
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        price: 35000,
      },
      {
        name: "Seragam Kantor Set",
        img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
        price: 200000,
      },
    ],
  },
  {
    name: "Bordir Tasikmalaya",
    category: "Jahit & Bordir",
    icon: Scissors,
    img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
    location: "Jl. Merdeka No. 5, Tasikmalaya, Jawa Barat",
    desc: "Spesialis bordir komputer dan manual untuk berbagai keperluan. Hasil rapi dengan detail presisi tinggi.",
    products: [
      {
        name: "Bordir Logo Perusahaan",
        img: "https://images.unsplash.com/photo-1558769132-cb1aea1f5db9",
        price: 15000,
      },
      {
        name: "Bordir Nama Custom",
        img: "https://images.unsplash.com/photo-1622519407650-3df9883f76e5",
        price: 8000,
      },
    ],
  },

  // 10. Tanaman Hias
  {
    name: "Nursery Hijau Daun",
    category: "Tanaman Hias",
    icon: Flower2,
    img: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f",
    location: "Jl. Raya Bogor KM 28, Depok, Jawa Barat",
    desc: "Nursery tanaman hias indoor dan outdoor. Koleksi lengkap dari monstera, philodendron, hingga aglaonema dengan harga bersahabat.",
    products: [
      {
        name: "Monstera Deliciosa",
        img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
        price: 85000,
      },
      {
        name: "Philodendron Pink Princess",
        img: "https://images.unsplash.com/photo-1621264448270-9ef00e88a935",
        price: 200000,
      },
    ],
  },
  {
    name: "Hidroponik Urban Farm",
    category: "Tanaman Hias",
    icon: Flower2,
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8",
    location: "Jl. Kemang Raya No. 99, Jakarta Selatan",
    desc: "Sistem hidroponik untuk tanaman sayur dan hias. Cocok untuk lahan terbatas dengan hasil maksimal.",
    products: [
      {
        name: "Starter Kit Hidroponik",
        img: "https://images.unsplash.com/photo-1558904541-efa843a96f01",
        price: 250000,
      },
      {
        name: "Nutrisi AB Mix 1 Liter",
        img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        price: 45000,
      },
    ],
  },
];

export default UmkmCard;