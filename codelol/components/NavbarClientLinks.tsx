// agent-notes: { ctx: "Client navigation links with active route glow pill and animated mobile drawer", deps: ["next/link", "next/navigation", "framer-motion"], state: "active", last: "sato@2026-10-31" }
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkItem {
  name: string;
  path: string;
}

interface NavbarClientLinksProps {
  navLinks: NavLinkItem[];
  activeLang?: string;
}

export function NavbarClientLinks({ navLinks, activeLang }: NavbarClientLinksProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLocalizedPath = (basePath: string) => {
    if (activeLang && (basePath === '/learn' || basePath === '/lessons')) {
      return `${basePath}?lang=${activeLang}`;
    }
    return basePath;
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1.5 text-sm font-medium">
        {navLinks.map((link) => {
          const active = isLinkActive(link.path);
          return (
            <Link
              key={link.name}
              href={getLocalizedPath(link.path)}
              className={`relative px-3.5 py-1.5 rounded-xl transition-all duration-200 text-sm font-semibold ${
                active
                  ? 'text-white bg-zinc-800/90 shadow-[0_0_15px_rgba(139,92,246,0.25)] ring-1 ring-purple-500/40'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
              }`}
            >
              {link.name}
              {active && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Navigation Toggle & Drawer */}
      <div className="md:hidden relative">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute left-0 mt-2 w-56 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl shadow-2xl shadow-purple-950/20 py-2.5 z-50 flex flex-col gap-1 px-2 ring-1 ring-zinc-700/50"
            >
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    href={getLocalizedPath(link.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all flex items-center justify-between ${
                      active
                        ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 text-white font-bold border border-purple-500/30'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

