"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, BookOpen, History, Home, Activity } from "lucide-react";

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/konsultasi", label: "Konsultasi", icon: Activity },
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
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-900/95 backdrop-blur-lg border-b border-brand-200/5 shadow-xl shadow-brand-950/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 border border-accent/40 rotate-45 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                <div className="w-3 h-3 bg-accent group-hover:bg-accent-light transition-colors duration-300" />
              </div>
            </div>
            <div className="leading-none">
              <span
                className="text-brand-50 font-display font-black text-lg tracking-tight block"
                style={{ fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.04em" }}
              >
                E-BENGKEL
              </span>
              <span
                className="block text-[9px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#f59e0b" }}
              >
                SISTEM PAKAR
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
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                    active
                      ? "text-brand-50"
                      : "text-brand-300 hover:text-brand-50"
                  }`}
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-brand-800/80 border border-brand-200/10 rounded-md"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/konsultasi"
              className="btn-amber text-sm px-5 py-2.5"
              style={{ borderRadius: "0.375rem" }}
            >
              Mulai Konsultasi
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded text-brand-300 hover:text-brand-50 hover:bg-brand-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Scroll progress bar — amber */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #f59e0b, #b1d4e8)",
        }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-brand-200/5 bg-brand-900/98 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-800 text-brand-50 border-l-2 border-accent"
                        : "text-brand-300 hover:text-brand-50 hover:bg-brand-800/50"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Link href="/konsultasi" className="btn-amber w-full justify-center text-sm">
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
