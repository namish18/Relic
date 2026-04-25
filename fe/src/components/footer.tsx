export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-center text-muted-foreground md:py-24">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <h2 className="font-serif italic text-2xl mb-4 text-foreground">
          Relic
        </h2>
        <p className="max-w-md mx-auto mb-8 text-sm">
          A truly decentralized, programmable dead man’s switch ensuring that your digital legacy is delivered verbatim, precisely when needed.
        </p>
        <div className="flex items-center gap-6 text-sm mb-12">
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
        </div>
        <div className="text-xs font-mono opacity-50">
          © {new Date().getFullYear()} Relic. Built on Solana.
        </div>
      </div>
    </footer>
  );
}
