"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Wrench, BookOpen, History, Home, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/konsultasi", label: "Konsultasi", icon: ChevronRight },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/history", label: "Riwayat", icon: History },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-700/95 backdrop-blur-md shadow-lg shadow-brand-950/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-brand-500 transition-colors duration-200">
              <Wrench className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-brand-50 font-bold text-base tracking-tight">E-Bengkel</span>
              <span className="text-brand-300 text-[10px] font-medium tracking-wider uppercase">
                Sistem Pakar
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-secondary/20 text-primary"
                      : "text-brand-200 hover:text-brand-50 hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/konsultasi"
              className="bg-secondary hover:bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
            >
              Mulai Konsultasi
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-brand-200 hover:text-brand-50 hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Scroll progress line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
        style={{ scaleX }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-brand-700/98 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-secondary/20 text-primary"
                        : "text-brand-200 hover:text-brand-50 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
              <div className="pt-2 pb-1">
                <Link
                  href="/konsultasi"
                  className="flex justify-center bg-secondary text-white text-sm font-semibold px-5 py-3 rounded-xl"
                >
                  Mulai Konsultasi
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
