import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/30 w-full py-12 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-8 max-w-7xl mx-auto gap-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tighter text-text-secondary font-headline"
        >
          Evora
        </Link>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/events"
            className="font-body text-label-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Events
          </Link>
          <a
            href="#"
            className="font-body text-label-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="font-body text-label-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-body text-label-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Terms
          </a>
        </div>
        <div className="font-body text-label-sm text-text-muted">
          © {new Date().getFullYear()} Evora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
