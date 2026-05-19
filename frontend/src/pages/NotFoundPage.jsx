import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-7xl font-bold text-evora-text-muted/30 sm:text-9xl">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold text-evora-text-primary">Page not found</h2>
      <p className="mt-2 max-w-md text-evora-text-secondary">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-evora-primary px-6 text-sm font-medium text-evora-primary-foreground shadow-soft transition-all duration-fast ease-premium hover:bg-evora-primary-hover">
        Go Home
      </Link>
    </div>
  );
}
