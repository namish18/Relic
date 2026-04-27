"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, Zap } from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import Threads from "./Threads";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Design */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 opacity-40">
           <Threads
              color={[0.81, 0.65, 0.37]}
              amplitude={1.2}
              distance={0}
              enableMouseInteraction={true}
           />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten opacity-50" />
        
      </motion.div>

      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 grid lg:grid-cols-2 gap-16 items-center z-10 relative pointer-events-none">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live on Solana Devnet
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight text-foreground leading-[1.1] mb-6">
            Code that keeps its promise <br />
            <span className="font-serif italic font-light text-primary tracking-normal">forever.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
            The world’s first programmable digital will on Solana. Securely transfer digital assets, encrypted messages, and sensitive files to designated beneficiaries in the event of prolonged inactivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg transition-transform hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:translate-y-0 group flex items-center justify-center gap-2">
              Create Your Switch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-primary" /> Multi-sig secured
            </div>
            <div className="flex items-center gap-2">
               <Lock className="w-4 h-4 text-primary" /> Encrypted compute
            </div>
            <div className="flex items-center gap-2">
               <Zap className="w-4 h-4 text-primary" /> Trustless execution
            </div>
          </div>
        </motion.div>

        {/* Visual / Interactive element */}
        <motion.div
           style={{ y: y1 }}
           className="hidden lg:flex justify-center items-center relative pointer-events-auto"
        >
          <div className="relative w-full aspect-square md:aspect-auto">
            <Image 
              src="/hero.png" 
              alt="Relic Dashboard Overview" 
              width={800} 
              height={800} 
              priority
              unoptimized
              className="w-full h-auto object-contain drop-shadow-2xl" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
