"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  initialLoadAnimation?: boolean;
  /** Slot for extra right-side content (e.g. ThemeToggle + Login button) */
  rightSlot?: React.ReactNode;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  initialLoadAnimation = true,
  rightSlot,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── derive colours from the Relic golden-black design tokens ───────────────
  // Light: warm cream bg / dark text / gold primary
  // Dark : near-black bg / cream text / gold primary
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // baseColor   → pill-bar container background
  // pillColor   → individual pill background (slightly different from base)
  // pillText    → resting text inside pills
  // circleColor → expanding hover-circle (must contrast against pillColor)
  // hoverText   → floating label that appears ON TOP of the circle
  const baseColor   = isDark ? "#1a1916" : "#F9F8F6";
  const pillColor   = isDark ? "#2B2A28" : "#ffffff";
  const pillText    = isDark ? "#D4AF67" : "#1D1C1A";
  // Light: dark circle so it's visible on the white pill; cream text on it
  // Dark : gold circle on the dark pill; near-black text on it
  const circleColor = isDark ? "#D4AF67" : "#1D1C1A";
  const hoverText   = isDark ? "#111111" : "#F9F8F6";
  const borderColor = isDark ? "#2B2A28" : "#E2E0D8";

  // ─── refs ────────────────────────────────────────────────────────────────────
  const circleRefs   = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs       = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoRef      = useRef<HTMLAnchorElement | null>(null);
  const navItemsRef  = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ─── layout / GSAP setup ─────────────────────────────────────────────────────
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width  = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const ghost = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (ghost) gsap.set(ghost, { y: h + 12, opacity: 0 });

        const idx = circleRefs.current.indexOf(circle);
        if (idx === -1) return;

        tlRefs.current[idx]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }
        if (ghost) {
          gsap.set(ghost, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(ghost, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[idx] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0 });
    }

    if (initialLoadAnimation) {
      const logo     = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, { scale: 1, duration: 0.6, ease });
      }
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", onResize);
    // Re-run layout when theme changes so circles repaint with new colours
  }, [items, ease, initialLoadAnimation, isDark]);


  // ─── hover handlers ───────────────────────────────────────────────────────────
  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  // ─── hamburger toggle ────────────────────────────────────────────────────────
  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);

    const ham  = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (ham) {
      const lines = ham.querySelectorAll(".ham-line");
      if (next) {
        gsap.to(lines[0], { rotation: 45,  y: 3,  duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: "top center" }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease,
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    }
  };

  // ─── CSS custom properties ────────────────────────────────────────────────────
  const cssVars = {
    "--pn-base":       baseColor,
    "--pn-pill":       pillColor,
    "--pn-pill-text":  pillText,
    "--pn-circle":     circleColor,
    "--pn-hover-text": hoverText,
    "--pn-border":     borderColor,
    "--pn-h":          "40px",
    "--pn-px":         "18px",
    "--pn-gap":        "3px",
  } as React.CSSProperties;

  // ─── pill content factory ─────────────────────────────────────────────────────
  const buildPillContent = (item: PillNavItem, i: number) => (
    <>
      {/* expanding circle — uses --pn-circle so it contrasts against the pill bg */}
      <span
        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
        style={{ background: "var(--pn-circle)", willChange: "transform" }}
        aria-hidden="true"
        ref={(el) => { circleRefs.current[i] = el; }}
      />
      {/* label stack */}
      <span className="label-stack relative inline-block leading-[1] z-[2]">
        <span
          className="pill-label relative z-[2] inline-block leading-[1]"
          style={{ willChange: "transform" }}
        >
          {item.label}
        </span>
        <span
          className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
          style={{ color: "var(--pn-hover-text)", willChange: "transform, opacity" }}
          aria-hidden="true"
        >
          {item.label}
        </span>
      </span>
      {/* active indicator */}
      {activeHref === item.href && (
        <span
          className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-2 h-2 rounded-full z-[4]"
          style={{ background: "var(--pn-base)" }}
          aria-hidden="true"
        />
      )}
    </>
  );

  const basePillCls =
    "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] leading-[0] tracking-[0.5px] uppercase whitespace-nowrap cursor-pointer";

  const pillStyle: React.CSSProperties = {
    background:   "var(--pn-pill)",
    color:        "var(--pn-pill-text)",
    paddingLeft:  "var(--pn-px)",
    paddingRight: "var(--pn-px)",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 ${className}`}
      style={cssVars}
    >
      {/* ── Logo pill ─────────────────────────────────────────── */}
      <Link
        href="/"
        aria-label="Home"
        ref={logoRef}
        className="inline-flex items-center gap-2 px-4 rounded-full border font-relic text-xl font-medium tracking-wide transition-colors shrink-0"
        style={{
          height:     "var(--pn-h)",
          background: "var(--pn-base)",
          color:      pillText,
          border:     `1px solid var(--pn-border)`,
          // subtle golden glow in dark mode
          boxShadow: isDark
            ? "0 0 0 1px rgba(212,175,103,0.15), 0 4px 20px rgba(0,0,0,0.4)"
            : "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        Relic
      </Link>

      {/* ── Desktop nav pills ──────────────────────────────────── */}
      <div
        ref={navItemsRef}
        className="relative items-center rounded-full hidden md:flex border"
        style={{
          height:     "var(--pn-h)",
          background: "var(--pn-base)",
          border:     `1px solid var(--pn-border)`,
          boxShadow: isDark
            ? "0 0 0 1px rgba(212,175,103,0.1), 0 4px 20px rgba(0,0,0,0.4)"
            : "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <ul
          role="menubar"
          className="list-none flex items-stretch m-0 h-full"
          style={{ padding: "var(--pn-gap)", gap: "var(--pn-gap)" }}
        >
          {items.map((item, i) => (
            <li key={item.href} role="none" className="flex h-full">
              <Link
                role="menuitem"
                href={item.href}
                className={basePillCls}
                style={pillStyle}
                aria-label={item.ariaLabel || item.label}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                {buildPillContent(item, i)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right slot (ThemeToggle, Login, etc.) ─────────────── */}
      {rightSlot && (
        <div
          className="hidden md:flex items-center gap-2 rounded-full border px-2"
          style={{
            height:     "var(--pn-h)",
            background: "var(--pn-base)",
            border:     `1px solid var(--pn-border)`,
            boxShadow: isDark
              ? "0 0 0 1px rgba(212,175,103,0.1), 0 4px 20px rgba(0,0,0,0.4)"
              : "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          {rightSlot}
        </div>
      )}

      {/* ── Mobile hamburger ───────────────────────────────────── */}
      <button
        ref={hamburgerRef}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        className="md:hidden inline-flex flex-col items-center justify-center gap-[5px] rounded-full border cursor-pointer"
        style={{
          width:      "var(--pn-h)",
          height:     "var(--pn-h)",
          background: "var(--pn-base)",
          border:     `1px solid var(--pn-border)`,
        }}
      >
        <span
          className="ham-line w-4 h-px rounded origin-center"
          style={{ background: pillText }}
        />
        <span
          className="ham-line w-4 h-px rounded origin-center"
          style={{ background: pillText }}
        />
      </button>

      {/* ── Mobile dropdown ────────────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[calc(var(--pn-h)+0.75rem)] left-0 right-0 rounded-2xl shadow-2xl z-[998] origin-top"
        style={{
          background: "var(--pn-base)",
          border:     `1px solid var(--pn-border)`,
        }}
      >
        <ul className="list-none m-0 p-[6px] flex flex-col gap-[4px]">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-3 px-4 text-[15px] font-medium rounded-xl transition-colors"
                style={{
                  background: pillColor,
                  color:      pillText,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {/* Right slot items also visible in mobile */}
          {rightSlot && (
            <li className="pt-1 px-1 pb-1 flex justify-end">
              {rightSlot}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
