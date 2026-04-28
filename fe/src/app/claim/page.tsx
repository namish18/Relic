import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Link2, ShieldCheck, Wallet } from "lucide-react";

export default function ClaimPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <main className="flex-1 flex items-center justify-center w-full px-6 py-20">
        <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-2xl relative z-10">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary relative">
                 <div className="absolute inset-0 rounded-full animate-ping bg-primary/10" />
                 <Link2 className="w-8 h-8" />
              </div>
           </div>

           <div className="text-center mb-8">
              <h2 className="text-2xl font-serif italic text-foreground mb-2">Notice of Transfer</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                 You have been mathematically verified as a beneficiary for an enacted <span className="font-relic tracking-wide font-normal">Relic</span> contract.
              </p>
           </div>

           <div className="space-y-4 mb-8">
              <div className="p-4 bg-background border border-border rounded-2xl">
                 <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-1">From</div>
                 <div className="font-medium text-sm truncate">8xF3g2vN...9a21 (Primary Estate)</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-background border border-border rounded-2xl flex flex-col items-center justify-center text-center">
                    <Wallet className="w-5 h-5 text-emerald-500 mb-2" />
                    <div className="font-medium text-sm">Financial Assets</div>
                 </div>
                 <div className="p-4 bg-background border border-border rounded-none flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-5 h-5 text-amber-500 mb-2" />
                    <div className="font-medium text-sm">Encrypted Data</div>
                 </div>
              </div>
           </div>

           <button className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full shadow-sm transition-colors text-center block">
              Connect Privy Wallet to Claim
           </button>
           <p className="text-center text-xs text-muted-foreground mt-4">
              This process is gas-less. Authentication via Privy will instantly provision your target wallet.
           </p>
        </div>
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
