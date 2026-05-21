import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Headphones,
  Monitor,
  Briefcase,
  Palette,
  Trophy,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/cards/EventCard";
import { EventCardSkeleton } from "@/components/ui/Skeleton";
import { useEvents } from "@/hooks/useEvents";

const categories = [
  { label: "Music", icon: Headphones },
  { label: "Technology", icon: Monitor },
  { label: "Business", icon: Briefcase },
  { label: "Art", icon: Palette },
  { label: "Sports", icon: Trophy },
  { label: "Food & Drink", icon: UtensilsCrossed },
];

const stats = [
  { value: "10K+", label: "Events Hosted" },
  { value: "50K+", label: "Active Attendees" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function LandingPage() {
  const { events, isLoading } = useEvents({ limit: 3 });
  const heroRef = useRef(null);

  useEffect(() => {
    // Simple GSAP-like scroll reveal using IntersectionObserver for performance
    const sections = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => {
      s.style.opacity = "0";
      observer.observe(s);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="glow-effect" />

      <div className="pt-16 pb-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-24 sm:gap-32">
        {/* ─── Hero ─── */}
        <section
          ref={heroRef}
          className="flex flex-col items-center text-center max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-label-sm text-text-muted mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Announcing Evora 2.0
          </div>

          <h1 className="font-headline text-display-lg tracking-tighter mb-6 leading-tight text-4xl sm:text-5xl md:text-7xl font-extrabold">
            Discover{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Extraordinary
            </span>{" "}
            Events
          </h1>

          <p className="text-body-lg text-text-muted mb-10 max-w-2xl font-body leading-relaxed">
            Curate, manage, and attend premium events all in one place. The
            modern platform designed for creators and attendees who demand
            excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/events" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto shadow-glow-md hover:shadow-glow-lg"
              >
                Explore Events
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section
          data-reveal
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border/50"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center p-6"
            >
              <span className="text-4xl font-headline font-bold text-text-primary mb-2">
                {stat.value}
              </span>
              <span className="text-label-sm font-medium text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* ─── Featured Events ─── */}
        <section data-reveal className="flex flex-col gap-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline text-headline-lg tracking-tight mb-2">
                Featured Events
              </h2>
              <p className="text-text-muted font-body">
                Handpicked premium experiences for you.
              </p>
            </div>
            <Link
              to="/events"
              className="hidden sm:flex items-center gap-1 text-label-md font-medium text-primary hover:text-primary-hover transition-colors"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))
              : events.slice(0, 3).map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
          </div>

          <Link
            to="/events"
            className="sm:hidden flex items-center justify-center gap-1 text-label-md font-medium text-primary"
          >
            View all events <ArrowRight size={16} />
          </Link>
        </section>

        {/* ─── Categories ─── */}
        <section data-reveal className="flex flex-col gap-10">
          <h2 className="font-headline text-headline-lg tracking-tight text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                to={`/events?category=${label}`}
                className="flex flex-col items-center justify-center p-6 bg-surface rounded-xl border border-border card-hover gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon
                    size={22}
                    className="text-text-muted group-hover:text-primary transition-colors"
                  />
                </div>
                <span className="font-medium text-body-sm text-text-primary">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section
          data-reveal
          className="relative rounded-2xl bg-surface border border-border overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative p-8 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="font-headline text-headline-lg md:text-display-md tracking-tight mb-4">
                Ready to create your next event?
              </h2>
              <p className="text-text-muted text-body-lg font-body">
                Join thousands of creators who trust Evora to manage and scale
                their premium experiences.
              </p>
            </div>
            <Link to="/register">
              <Button
                size="lg"
                className="shrink-0 bg-white text-background hover:bg-gray-100 shadow-none"
              >
                Start for Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
