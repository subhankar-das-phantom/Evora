import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <span className="text-8xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          404
        </span>
      </div>
      <h1 className="font-headline text-headline-lg text-text-primary mb-3">
        Page not found
      </h1>
      <p className="text-body-md text-text-muted mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="secondary" size="md">
          <Home size={16} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
