import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Shield, 
  Lock, 
  Clock, 
  Users, 
  Zap, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <FileText className="w-3 h-3" />
              <span>Documentation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">
              Understanding Relic
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Relic is a decentralized digital inheritance protocol built on Solana. 
              It ensures your digital legacy is preserved and transferred according to your wishes.
            </p>
          </header>

          <div className="grid gap-16">
            {/* The Problem */}
            <section id="problem">
              <h2 className="text-3xl font-serif font-medium mb-6 flex items-center gap-3">
                <AlertCircle className="text-primary w-8 h-8" />
                The Digital Inheritance Gap
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  In the traditional world, wills and probate courts handle the distribution of assets after death. 
                  However, in the digital and decentralized world, this system breaks down completely.
                </p>
                <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
                  <div className="p-6 rounded-2xl border border-border bg-card/50">
                    <h3 className="font-medium text-foreground mb-2">Inaccessible Assets</h3>
                    <p className="text-sm text-muted-foreground">
                      Over $140 billion in Bitcoin is estimated to be lost forever because owners passed away without sharing their private keys.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl border border-border bg-card/50">
                    <h3 className="font-medium text-foreground mb-2">Legal Friction</h3>
                    <p className="text-sm text-muted-foreground">
                      Traditional legal systems are slow, expensive, and often fail to recognize or handle digital assets effectively across jurisdictions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Concept */}
            <section id="concept">
              <h2 className="text-3xl font-serif font-medium mb-6 flex items-center gap-3">
                <Zap className="text-primary w-8 h-8" />
                The Dead Man's Switch
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  At its heart, Relic operates as a <strong>Dead Man's Switch</strong>. It's a simple but powerful logic: 
                  "If I don't check in for X amount of time, execute these instructions."
                </p>
                <div className="space-y-8 mt-10">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Configuration</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You define your inactivity period (e.g., 6 months) and designate your beneficiaries. 
                        You can also attach encrypted messages or specify asset distributions.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Proof of Life</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        While you are active, you perform periodic "check-ins." Each check-in resets the 
                        inactivity timer. This is as simple as signing a message with your wallet.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Automated Execution</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        If the timer expires without a check-in, the smart contract triggers. Your 
                        assets are automatically distributed, and encrypted secrets are revealed to the 
                        chosen beneficiaries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Shield className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-medium mb-6">Security & Privacy</h2>
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-medium">End-to-End Encryption</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      All messages and sensitive data are encrypted locally before being stored. 
                      Only the designated beneficiaries, using their own keys, can decrypt the content 
                      once the switch has been triggered.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-medium">Non-Custodial Design</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Relic never has access to your funds or secrets. The smart contract acts as a 
                      trustless escrow that only moves assets based on the conditions you set.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section id="tech-stack">
              <h2 className="text-3xl font-serif font-medium mb-8">Protocol Ecosystem</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Solana", desc: "High-performance base layer for switch logic." },
                  { name: "Phantom", desc: "Secure wallet authentication and check-ins." },
                  { name: "Arcium", desc: "Encrypted computation for secret vaults." },
                  { name: "Altitude", desc: "Multi-sig execution for trustless triggers." },
                  { name: "Privy", desc: "Email-based onboarding for beneficiaries." },
                  { name: "Metaplex", desc: "Automated NFT and cNFT inheritance." },
                ].map((tech, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card/30 hover:border-primary/30 transition-colors">
                    <h4 className="font-medium text-foreground mb-1">{tech.name}</h4>
                    <p className="text-sm text-muted-foreground">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-serif font-medium mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What happens if I lose access to my wallet?",
                    a: "Relic allows you to set up 'Recovery Buddies'—trusted individuals who can help you reset your switch if you lose your primary access, or you can use your recovery phrase to regain control."
                  },
                  {
                    q: "Can I cancel my switch at any time?",
                    a: "Yes. You have full control over your Relic Switch. You can update beneficiaries, change the timer, or completely dismantle the switch at any time as long as you are active."
                  },
                  {
                    q: "Is there a fee for using Relic?",
                    a: "Relic charges a small initialization fee and a tiny percentage of assets processed during execution to maintain the decentralized crank network that monitors switches."
                  }
                ].map((item, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium mb-2 flex items-start gap-3">
                      <span className="text-primary">Q:</span>
                      {item.q}
                    </h3>
                    <p className="text-muted-foreground pl-7">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-10">
              <h2 className="text-3xl font-serif font-medium mb-6">Ready to secure your legacy?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg transition-all hover:scale-105 shadow-xl shadow-primary/20">
                  Create your Relic
                </button>
                <button className="px-8 py-4 rounded-full border border-border bg-background text-foreground font-medium text-lg hover:bg-muted transition-colors">
                  Contact Support
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
