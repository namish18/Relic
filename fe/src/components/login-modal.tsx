"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Mail, Key, ArrowRight, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSIWS } from "@/hooks/useSIWS";

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"role-select" | "owner-login" | "beneficiary-email" | "beneficiary-otp">("role-select");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { signIn, isAuthenticating } = useSIWS();

  // When wallet connects while modal is on owner-login step, auto-trigger SIWS
  useEffect(() => {
    if (connected && publicKey && step === "owner-login" && isOpen) {
      (async () => {
        const token = await signIn();
        if (token) {
          router.push("/dashboard/owner");
          handleClose();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey, step, isOpen]);

  const handleClose = () => {
    // slight delay to let exit animation finish before resetting step
    setTimeout(() => setStep("role-select"), 300);
    onClose();
  };

  const handlePhantomLogin = useCallback(() => {
    if (connected && publicKey) {
      // Already connected — trigger SIWS directly
      (async () => {
        const token = await signIn();
        if (token) {
          router.push("/dashboard/owner");
          handleClose();
        }
      })();
    } else {
      // Open the wallet modal to connect
      setVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey, signIn, router, setVisible]);

  const handleOtpSubmit = () => {
    // Simulate OTP submit
    router.push("/dashboard/beneficiary");
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-border shadow-2xl p-8 z-10 overflow-hidden rounded-[2.5rem]"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {step === "role-select" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-sans font-semibold text-foreground mb-2">Welcome to Relic</h2>
                  <p className="text-muted-foreground">Please select how you want to log in.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setStep("owner-login")}
                    className="flex items-center gap-6 p-1 pr-8 rounded-full border border-primary/20 bg-background/50 shadow-[0_0_15px_rgba(212,175,103,0.05)] hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_25px_rgba(212,175,103,0.2)] transition-all group relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-serif text-xl font-medium text-foreground tracking-wide">Owner</h3>
                      <p className="text-sm text-muted-foreground">Access and manage your digital vaults</p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => setStep("beneficiary-email")}
                    className="flex items-center gap-6 p-1 pr-8 rounded-full border border-border/50 bg-background/50 shadow-[0_0_15px_rgba(212,175,103,0.03)] hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_25px_rgba(212,175,103,0.2)] transition-all group relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:scale-105 transition-transform shrink-0">
                      <User className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-serif text-xl font-medium text-foreground tracking-wide">Beneficiary</h3>
                      <p className="text-sm text-muted-foreground">Claim and secure your inheritances</p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            )}

            {step === "owner-login" && (
              <div className="flex flex-col gap-6">
                <div>
                  <button onClick={() => setStep("role-select")} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
                    ← Back
                  </button>
                  <h2 className="text-2xl font-sans font-semibold text-foreground mb-2">Owner Login</h2>
                  <p className="text-muted-foreground">Connect your wallet to access your vaults.</p>
                </div>

                <button
                  onClick={handlePhantomLogin}
                  className="w-full flex items-center justify-between p-4 border border-border bg-background hover:border-primary/50 transition-colors group rounded-full px-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#AB9FF2]/10 flex items-center justify-center text-[#AB9FF2]">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-foreground">Phantom Wallet Login</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              </div>
            )}

            {step === "beneficiary-email" && (
              <div className="flex flex-col gap-6">
                <div>
                  <button onClick={() => setStep("role-select")} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
                    ← Back
                  </button>
                  <h2 className="text-2xl font-sans font-semibold text-foreground mb-2">Beneficiary Login</h2>
                  <p className="text-muted-foreground">Enter your email to receive a one-time passcode.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors rounded-2xl"
                    />
                  </div>
                  <button
                    onClick={() => setStep("beneficiary-otp")}
                    disabled={!email}
                    className="w-full py-4 bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 rounded-full shadow-[0_4px_15px_rgba(212,175,103,0.3)]"
                  >
                    Send OTP <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-center mt-2">
                  <p className="text-xs text-muted-foreground">Secured by Privy SDK</p>
                </div>
              </div>
            )}

            {step === "beneficiary-otp" && (
              <div className="flex flex-col gap-6">
                <div>
                  <button onClick={() => setStep("beneficiary-email")} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
                    ← Back
                  </button>
                  <h2 className="text-2xl font-sans font-semibold text-foreground mb-2">Enter Passcode</h2>
                  <p className="text-muted-foreground">We sent a 6-digit code to <span className="text-foreground font-medium">{email}</span>.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Key className="w-4 h-4 text-muted-foreground" /> 6-Digit Code
                    </label>
                    <input
                      type="text"
                      placeholder="• • • • • •"
                      maxLength={6}
                      className="w-full bg-background border border-border px-4 py-3 text-center tracking-[0.5em] text-lg focus:outline-none focus:border-primary transition-colors rounded-2xl"
                    />
                  </div>
                  <button
                    onClick={handleOtpSubmit}
                    className="w-full py-4 bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors rounded-full shadow-[0_4px_15px_rgba(212,175,103,0.3)]"
                  >
                    Verify & Login <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
