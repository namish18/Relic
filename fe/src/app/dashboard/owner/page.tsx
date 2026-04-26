"use client";

import { Navbar } from "@/components/navbar";
import { Plus, Activity, Timer, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import DotGrid from "@/components/DotGrid";

export default function OwnerDashboardPage() {
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
                Owner Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your active Relics and secure your digital legacy.
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="font-serif italic text-2xl text-foreground">
                Global Overview
              </h2>
              <Link
                href="/create"
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:-translate-y-0.5 transition-transform shadow-sm"
              >
                <Plus className="w-5 h-5" />
                New Switch
              </Link>
            </div>

            {/* Global Status Card */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-3xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm uppercase">
                    <Activity className="w-4 h-4 text-emerald-500" /> Status
                  </div>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">Active</span>
                </div>
                <div className="text-2xl font-medium text-foreground mb-1">You are safe</div>
                <div className="text-sm text-muted-foreground">All systems operational</div>
              </div>
              <div className="p-6 rounded-3xl border border-border bg-card">
                <div className="flex items-center gap-3 text-muted-foreground mb-4 font-mono text-sm uppercase">
                  <Timer className="w-4 h-4 text-amber-500" /> Next Trigger
                </div>
                <div className="text-2xl font-medium text-foreground mb-1">12d 14h 22m</div>
                <div className="text-sm text-muted-foreground">Based on nearest expiration</div>
              </div>
              <div className="p-6 rounded-3xl border border-border bg-card flex flex-col justify-center">
                <div className="text-sm text-muted-foreground mb-4">
                  Last check-in: <span className="text-foreground">2 days ago</span>
                </div>
                <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-full transition-colors border border-primary/20 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Global Check-in
                </button>
              </div>
            </div>

            <h2 className="font-serif italic text-2xl text-foreground mb-6 border-b border-border/50 pb-4">
              Active Switches
            </h2>
            
            <div className="grid gap-6">
              {/* Example Switch 1 */}
              <div className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-foreground font-sans">Main Will</h3>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">Active</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Assets</p>
                      <p className="font-medium text-foreground">2.5 SOL + 100 USDC</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Beneficiaries</p>
                      <p className="font-medium text-foreground">2 Assigned</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Vault</p>
                      <p className="font-medium text-foreground">3 Msgs, 2 Files</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
                  <div className="text-sm font-mono text-foreground bg-secondary/50 rounded-full px-4 py-3 w-full flex items-center justify-between md:justify-end gap-4 border border-border/50">
                     <span className="text-muted-foreground">Expires In:</span>
                     <span className="text-primary font-medium">86d 12h 00m</span>
                  </div>
                  <div className="flex gap-2 w-full">
                     <Link href="/switch/test_id" className="flex-1 px-4 py-2 border border-border hover:bg-secondary text-foreground text-sm font-medium rounded-full transition-colors text-center">
                       View Details
                     </Link>
                     <button className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-medium rounded-full transition-colors">
                       Cancel
                     </button>
                  </div>
                </div>
              </div>

              {/* Example Switch 2 */}
              <div className="p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-foreground font-sans">Emergency Docs</h3>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-mono bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Warning
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Assets</p>
                      <p className="font-medium text-foreground">4 Encrypted Files</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Beneficiaries</p>
                      <p className="font-medium text-foreground">1 Assigned</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Vault</p>
                      <p className="font-medium text-foreground">1 Video Msg</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
                  <div className="text-sm font-mono text-foreground bg-background rounded-full px-4 py-3 w-full flex items-center justify-between md:justify-end gap-4 border border-amber-500/30">
                     <span className="text-muted-foreground">Expires In:</span>
                     <span className="text-amber-500 font-medium animate-pulse">3d 04h 11m</span>
                  </div>
                  <div className="flex gap-2 w-full">
                     <Link href="/switch/test_id_2" className="flex-1 px-4 py-2 border border-border hover:bg-secondary text-foreground text-sm font-medium rounded-full transition-colors text-center bg-card">
                       View Details
                     </Link>
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
