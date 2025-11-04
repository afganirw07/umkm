"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../user/navbar";
import { Inter } from "next/font/google";
import { useState } from "react";

  const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", 
});


export function NavbarUser() {
  const navItems = [
    {
      name: "Beranda",
      link: "#beranda",
    },
    {
      name: "Tentang Kami",
      link: "#tentang",
    },
    {
      name: "Jelajah",
      link: "#jelajah",
    },

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <div className="sticky w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className={`flex items-center gap-4 ${inter.className}`}>
            <NavbarButton className="bg-gray-200" variant="secondary">Masuk</NavbarButton>
            <NavbarButton className="bg-blue-800 text-white" variant="primary">Daftar</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={` ${inter.className} relative text-neutral-600 dark:text-neutral-300`}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-gray-200"
              >
                Daftar
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-blue-800 text-white"
              >
                Daftar Jadi Penjual
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}

