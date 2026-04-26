"use client";

import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LoginModal } from "./login-modal";
import PillNav from "./PillNav";

const navLinks = [
  { label: "Features",    href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Docs",        href: "/docs" },
];

export function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const rightSlot = (
    <>
      <ThemeToggle />
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all active:scale-95"
        style={{
          background: "var(--primary)",
          color:      "var(--primary-foreground)",
        }}
      >
        <LogIn className="w-3.5 h-3.5" />
        Login
      </button>
    </>
  );

  return (
    <>
      <PillNav
        items={navLinks}
        rightSlot={rightSlot}
        initialLoadAnimation
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
