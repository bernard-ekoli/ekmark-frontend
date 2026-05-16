export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/ekmark-logo.png" alt="Ekmark" className="h-25 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
          <a href="#api" className="text-sm text-muted-foreground hover:text-foreground transition">For Developers</a>
          <a href="#launch" className="text-sm text-muted-foreground hover:text-foreground transition">Launch</a>
        </nav>
        <a href="#email" className="">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition shadow-lg hover:shadow-xl cursor-pointer">
            Notify Me
          </button>
        </a>
      </div>
    </header>
  )
}
