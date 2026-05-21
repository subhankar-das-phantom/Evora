import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Skeleton, EventCardSkeleton } from "@/components/ui/Skeleton";
import { EventCard } from "@/components/cards/EventCard";
import { useEventDetails, useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { uiStore } from "@/store/uiStore";
import { formatDate, seatsLeft } from "@/utils/format";
import { useState } from "react";
import { cn } from "@/utils/cn";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const { event, isLoading, mutate } = useEventDetails(eventId);
  const { events: relatedEvents } = useEvents({ limit: 3 });
  const { isAuthenticated } = useAuth();
  const pushToast = uiStore((s) => s.pushToast);
  const [booking, setBooking] = useState(false);

  const remaining = event ? seatsLeft(event) : null;
  const isLowSeats = remaining !== null && remaining > 0 && remaining <= 10;
  const isSoldOut = remaining === 0;
  const seatPercent = event
    ? Math.round(((event.bookedSeats || 0) / (event.maxSeats || 1)) * 100)
    : 0;

  const handleBook = async () => {
    if (!isAuthenticated) {
      pushToast({ type: "info", message: "Please login to book this event." });
      return;
    }
    setBooking(true);
    try {
      await api.post(endpoints.bookings.create, { eventId });
      pushToast({ type: "success", message: "Booking confirmed!" });
      mutate();
    } catch {
      // Error handled by interceptor
    } finally {
      setBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-64 md:h-96 w-full rounded-2xl" />
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-24 pb-24 text-center">
        <h2 className="font-headline text-headline-lg text-text-primary mb-2">
          Event not found
        </h2>
        <p className="text-text-muted mb-6">
          The event you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/events">
          <Button variant="secondary">Browse Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-96 bg-surface-elevated overflow-hidden">
        {event.bannerImage ? (
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {event.category && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-surface/80 backdrop-blur-md border border-border/50 text-label-md px-3 py-1.5 rounded-xl text-text-primary">
            {event.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="font-headline text-headline-lg md:text-display-md tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold">
              {event.title}
            </h1>

            {/* Organizer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={18} />
              </div>
              <div>
                <p className="text-label-sm text-text-muted">Organized by</p>
                <p className="text-body-sm font-medium text-text-primary">
                  {event.organizer?.name || "Evora Events"}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 sm:gap-6 py-4 border-y border-border/50">
              <div className="flex items-center gap-2 text-text-muted">
                <Calendar size={18} className="text-primary" />
                <span className="text-body-sm">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin size={18} className="text-primary" />
                <span className="text-body-sm">
                  {event.venue || "Online Event"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Clock size={18} className="text-primary" />
                <span className="text-body-sm">
                  {event.duration || "Full Day"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h3 className="font-headline text-headline-sm text-text-primary mb-3">
                About this Event
              </h3>
              <p className="text-body-md text-text-secondary leading-relaxed whitespace-pre-line">
                {event.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Booking Sidebar (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-surface border border-border rounded-2xl p-6 space-y-5">
              {/* Price */}
              <div>
                <p className="text-label-sm text-text-muted mb-1">Price</p>
                <p className="text-display-md font-headline font-bold text-text-primary text-3xl">
                  {event.price > 0 ? `$${event.price}` : "Free"}
                </p>
              </div>

              {/* Seats */}
              <div>
                <div className="flex justify-between text-label-sm mb-2">
                  <span className="text-text-muted">Seats available</span>
                  <span
                    className={cn(
                      "font-medium",
                      isLowSeats ? "text-warning" : "text-text-primary"
                    )}
                  >
                    {remaining} / {event.maxSeats}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      seatPercent > 90
                        ? "bg-error"
                        : seatPercent > 70
                        ? "bg-warning"
                        : "bg-primary"
                    )}
                    style={{ width: `${seatPercent}%` }}
                  />
                </div>
                {isLowSeats && (
                  <p className="text-label-sm text-warning mt-1.5">
                    Selling out fast!
                  </p>
                )}
              </div>

              {/* Actions */}
              <Button
                size="lg"
                className="w-full shadow-glow-md hover:shadow-glow-lg"
                onClick={handleBook}
                isLoading={booking}
                disabled={isSoldOut}
              >
                {isSoldOut ? "Sold Out" : "Book Now"}
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  pushToast({
                    type: "success",
                    message: "Link copied to clipboard!",
                  });
                }}
              >
                <Share2 size={16} />
                Share Event
              </Button>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="mt-16">
            <h2 className="font-headline text-headline-md tracking-tight mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents
                .filter((e) => e._id !== eventId)
                .slice(0, 3)
                .map((e) => (
                  <EventCard key={e._id} event={e} />
                ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border p-4 flex items-center justify-between z-40">
        <div>
          <p className="text-headline-sm font-headline font-bold text-text-primary">
            {event.price > 0 ? `$${event.price}` : "Free"}
          </p>
          <p className="text-label-sm text-text-muted">
            {remaining} seats left
          </p>
        </div>
        <Button
          size="md"
          onClick={handleBook}
          isLoading={booking}
          disabled={isSoldOut}
          className="shadow-glow-sm"
        >
          {isSoldOut ? "Sold Out" : "Book Now"}
        </Button>
      </div>
    </div>
  );
}
