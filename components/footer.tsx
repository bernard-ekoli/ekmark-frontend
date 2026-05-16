export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/ekmark-logo.png" alt="Ekmark" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Free watermark generator launching June 10, 2026.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground text-sm transition">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">Security</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Developers</h3>
            <ul className="space-y-2">
              <li><a href="#api" className="text-muted-foreground hover:text-foreground text-sm transition">API Docs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">SDKs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">Privacy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Ekmark. All rights reserved. Coming June 10, 2026.
          </p>
        </div>
      </div>
    </footer>
  )
}
