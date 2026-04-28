"use client";

import { motion } from "framer-motion";
import { Copy, FileLock2, ShieldAlert, Timer, Wallet, Zap } from "lucide-react";

const features = [
  {
    title: "Core Switch Engine",
    description:
      "Configurable inactivity timers (30–365 days) with an on-chain check-in mechanism. Update, cancel or monitor the state of your switch continuously.",
    icon: Timer,
  },
  {
    title: "Encrypted Message Vault",
    description:
      "Client-side encryption using Arcium. Store text, media, and attachments conditionally unlocked only when triggered on-chain.",
    icon: FileLock2,
  },
  {
    title: "Asset Transfer System",
    description:
      "Automatic token transfer upon trigger, NFT inheritance handling, and yield generation on idle assets while you are active.",
    icon: Wallet,
  },
  {
    title: "Seamless Beneficiary UI",
    description:
      "Email-based onboarding for non-crypto users via Privy, instant wallet creation, and fiat off-ramp support via MoonPay.",
    icon: Copy,
  },
  {
    title: "Secure File Storage",
    description:
      "Encrypted storage of sensitive documents safely kept in a high-reliability storage layer with access controlled by cryptographic conditions.",
    icon: ShieldAlert,
  },
  {
    title: "Proof-of-Life Mechanism",
    description:
      "Activity-based validation backed by World ID. Uses multi-channel warnings and an emergency cancellation window for absolute safety.",
    icon: Zap,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Features() {
  return (
    <section id="features" className="py-32 bg-secondary/30 relative">
      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-sm font-mono tracking-widest text-primary uppercase mb-4">
            Platform Capabilities
          </h2>
          <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-foreground mb-6">
            A comprehensive inheritance <br />
            <span className="font-serif italic font-light text-primary">architecture.</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Built on Solana for sub-second finality. Combining decentralized infrastructure with programmable execution to eliminate reliance on legal intermediaries.
          </p>
        </div>

        <motion.div
          variants={container as any}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={item as any}
              className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group flex flex-col items-start text-left"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-xl font-medium text-foreground mb-3 font-sans">
                {feature.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
