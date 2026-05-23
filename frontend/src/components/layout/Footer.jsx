import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-evora-border bg-evora-surface-secondary">
      <div className="container-content flex flex-col items-center justify-between gap-6 py-10 sm:flex-row px-4 md:px-8">
        <div className="font-display text-lg font-bold tracking-tight text-evora-primary">EVORA</div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-evora-text-secondary">
          <Link to="/events" className="transition-colors hover:text-evora-text-primary">Events</Link>
          <Link to="/about" className="transition-colors hover:text-evora-text-primary">About</Link>
          <Link to="/privacy" className="transition-colors hover:text-evora-text-primary">Privacy</Link>
          <Link to="/terms" className="transition-colors hover:text-evora-text-primary">Terms</Link>
        </nav>
        <p className="text-xs text-evora-text-muted text-center">&copy; {new Date().getFullYear()} Evora. All rights reserved.</p>
      </div>
    </footer>
  );
}
