"use client";

import { Navbar } from "@/components/navbar";
import { Gift, Wallet, Activity, AlertCircle, Lock, FileText, Image as ImageIcon } from "lucide-react";
import { Footer } from "@/components/footer";
import DotGrid from "@/components/DotGrid";

export default function BeneficiaryDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* DotGrid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] dark:opacity-65">
        <DotGrid
          dotSize={4}
          gap={24}
          baseColor="#3D2E0E"
          activeColor="#D4AF67"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-border/50 pb-6">
            <div>
              <h1 className="text-3xl font-sans tracking-tight text-foreground font-semibold mb-2">
                Beneficiary Dashboard
              </h1>
              <p className="text-muted-foreground">
                View and claim your digital inheritances securely.
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-primary/5 border border-primary/20 p-8 text-center mb-10 rounded-3xl">
              <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-foreground mb-2">You have received a digital inheritance</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                A Relic switch has been triggered, unlocking assets and messages designated for you.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-sm font-mono uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" /> Pending Claim
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="p-6 rounded-3xl border border-border bg-card">
                  <h3 className="text-lg font-serif italic mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
                    <Wallet className="w-5 h-5 text-primary" /> Assets Available
                  </h3>
                  
                  <div className="mb-8">
                    <p className="text-sm text-muted-foreground mb-1">Total Estimated Value</p>
                    <p className="text-4xl font-medium text-foreground">$1,240.00</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 border border-border bg-background flex items-center justify-between rounded-xl">
                      <span className="text-muted-foreground font-mono">SOL</span>
                      <span className="font-medium">1.50</span>
                    </div>
                    <div className="p-4 border border-border bg-background flex items-center justify-between">
                      <span className="text-muted-foreground font-mono">USDC</span>
                      <span className="font-medium">500.00</span>
                    </div>
                    <div className="p-4 border border-border bg-background flex items-center justify-between">
                      <span className="text-muted-foreground font-mono">NFTs</span>
                      <span className="font-medium">2 Items</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <button className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                      Claim All Assets
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-3xl border border-border bg-card opacity-50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                    <Lock className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Claim assets to unlock</p>
                  </div>
                  
                  <h3 className="text-lg font-serif italic mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Secured Vault
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Activity className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">3 Voice Notes</p>
                        <p className="text-xs text-muted-foreground">Encrypted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">1 Legal Document</p>
                        <p className="text-xs text-muted-foreground">Encrypted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Photo Gallery</p>
                        <p className="text-xs text-muted-foreground">Encrypted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
