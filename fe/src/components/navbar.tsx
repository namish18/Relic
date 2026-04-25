"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Documentation", href: "#" },
  ];

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300",
        "rounded-full border", // explicitly overriding for the navbar to be curved
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-border shadow-lg py-1"
          : "bg-background/40 backdrop-blur-md border-border/50 py-2 shadow-sm"
      )}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="font-serif text-3xl font-medium tracking-wide">
            Relic
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l border-border pl-4">
            <ThemeToggle />
            <button className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-transform hover:-translate-y-0.5 shadow-sm active:translate-y-0 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-background border border-border rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-4 px-5 py-3 w-full rounded-full bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 flex justify-center items-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
