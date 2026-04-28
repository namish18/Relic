"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import footerSolanaImg from "../../public/footer-solana.png";

const SocialIcon = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={d} />
  </svg>
);

const socialLinks = [
  {
    name: "X",
    href: "#",
    d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z",
  },
  {
    name: "Discord",
    href: "#",
    d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.052.072.085.028.085.028a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z",
  },
  {
    name: "Telegram",
    href: "#",
    d: "M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 1.589 4.88c.18.5.09.7.63.7.41 0 .59-.19.82-.42l2.42-2.35 5.038 3.72c.93.51 1.59.25 1.82-.85l3.307-15.58c.34-1.36-.51-1.99-1.404-1.589z",
  },
  {
    name: "Instagram",
    href: "#",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z",
  },
];

export function Footer() {
  return (
    <>
      {/*
        ─── PREMIUM CURVED DIVIDER ──────────────────────────────────────────
        Lives ABOVE the footer as a sibling, overlaps the footer from the top.
        The black filled SVG path rises from below into the page section above,
        creating the illusion that the footer has a curved top boundary.
        The footer image then starts cleanly from below the curve's lowest point.

        HOW IT WORKS:
        - This div is 100px tall, positioned normally in flow
        - The SVG fills from the curve down to the bottom (footer color: black)
        - The footer has a negative marginTop to pull up under the SVG seamlessly
        - Result: curved top edge on the image footer, zero hacks
        ────────────────────────────────────────────────────────────────────
      */}
      <div className="relative w-full pointer-events-none" style={{ height: '100px', zIndex: 10 }}>
        <svg
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/*
            Premium single-sweep convex curve:
            Starts low on the edges, and bulges upward smoothly into the section above.
            Creates a highly elegant, luxurious dome/arch Web3 feel.
          */}
          <path
            d="M0,100 L0,80 C 400,10 1000,-30 1440,60 L1440,100 Z"
            fill="#000000"
          />
          {/* Gold hairline accent tracing the wave */}
          <path
            d="M0,80 C 400,10 1000,-30 1440,60"
            fill="none"
            stroke="#D4AF67"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
        </svg>
      </div>

      <footer
        className="relative bg-black text-white py-24 overflow-hidden min-h-[500px] flex items-center"
        style={{ marginTop: '-2px' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={footerSolanaImg}
            alt="Relic Coin Background"
            fill
            sizes="100vw"
            className="object-cover object-[center_70%] brightness-75"
            priority
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-[1]" />
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center relative z-10">

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-[#D4AF67] drop-shadow-2xl">
            Stay <span className="font-relic tracking-wide font-normal">Relic</span>
          </h2>

          <p className="text-zinc-200 text-lg md:text-xl mb-12 text-center max-w-2xl font-medium drop-shadow-md">
            Join <span className="font-relic tracking-wide font-normal">Relic</span>&apos;s Inner Circle for Exclusive Updates &amp; Alpha.
          </p>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full max-w-2xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black/60 backdrop-blur-md border border-[#D4AF67]/40 rounded-full px-8 py-4 text-white focus:outline-none focus:border-[#D4AF67] transition-colors placeholder:text-zinc-400"
            />
            <button className="bg-gradient-to-r from-[#D4AF67] to-[#A67C37] text-black font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap shadow-xl">
              Subscribe Now
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5 mb-14">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/20 bg-black/30 backdrop-blur-md text-[#D4AF67] hover:bg-[#D4AF67]/10 hover:border-[#D4AF67]/50 transition-all"
              >
                <SocialIcon d={social.d} />
              </Link>
            ))}
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-medium text-zinc-300 mb-12">
            <Link href="/" className="hover:text-[#D4AF67]">Home</Link>
            <Link href="/#features" className="hover:text-[#D4AF67]">Product</Link>
            <Link href="/docs" className="hover:text-[#D4AF67]">About</Link>
            <Link href="#" className="hover:text-[#D4AF67]">Blog</Link>
            <Link href="#" className="hover:text-[#D4AF67]">Team</Link>
          </nav>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#D4AF67]/20 mb-8 max-w-4xl" />

          {/* Copyright */}
          <p className="text-zinc-400 text-sm text-center">
            © 2026 <span className="font-relic tracking-wide font-normal">Relic</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}