import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useSWR from "swr";
import { format } from "date-fns";
import { Calendar, MapPin, Users, ArrowLeft, Ticket, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { fetcher } from "@/api/axios";
import { bookingsApi } from "@/features/bookings/bookings.api";
import { uiStore } from "@/store/uiStore";
import { useAuth } from "@/hooks/useAuth";

export default function BookingPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { data, error, isLoading } = useSWR(eventId ? `/events/${eventId}` : null, fetcher);
  const pushToast = uiStore((s) => s.pushToast);
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (isLoading) {
    return (
      <div className="container-reading pb-24 pt-8">
        <div className="mb-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="mx-auto max-w-2xl space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container-reading py-20">
        <EmptyState title="Event not found" description="The event you are trying to book does not exist." />
      </div>
    );
  }

  const { title, description, category, venue, startDate, endDate, maxSeats, bookedSeats, banner } = data || {};
  const availableSeats = maxSeats - bookedSeats;
  const hasEnded = endDate ? new Date(endDate) < new Date() : false;
  const isSoldOut = availableSeats <= 0;

  const fallbackImages = {
    TECHNOLOGY: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    BUSINESS: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    DESIGN: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    NETWORKING: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2000&auto=format&fit=crop"
  };
  const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop";

  const handleConfirmBooking = async () => {
    if (hasEnded || isSoldOut || isBooking) return;
    setIsBooking(true);
    try {
      await bookingsApi.createBooking(eventId);
      setIsBooked(true);
      pushToast({ type: "success", message: "Ticket booked successfully!" });
    } catch (_error) {
      // handled by interceptor
    } finally {
      setIsBooking(false);
    }
  };

  if (isBooked) {
    return (
      <div className="container-reading pb-24 pt-8">
        <div className="mx-auto max-w-lg text-center space-y-6 py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-evora-text-primary">Booking Confirmed!</h1>
          <p className="text-evora-text-secondary">
            Your ticket for <strong className="text-evora-text-primary">{title}</strong> has been booked successfully.
            You can view your booking details from your dashboard.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => navigate("/dashboard/user")}>
              Go to Dashboard
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/events/${eventId}`)}>
              View Event
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="container-reading pb-24 pt-8">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to={`/events/${eventId}`}
          className="inline-flex items-center text-sm font-medium text-evora-text-secondary transition-colors hover:text-evora-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Event
        </Link>
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-evora-text-primary sm:text-4xl mb-8">
          Confirm Your Booking
        </h1>

        {/* Event Summary Card */}
        <div className="rounded-2xl border border-evora-border bg-evora-surface-secondary shadow-soft overflow-hidden">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-evora-surface-muted">
            <img
              src={banner || fallbackImages[category] || defaultImage}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-evora-surface-secondary/90 px-3 py-1 text-xs font-semibold text-evora-text-primary backdrop-blur-md">
              {category}
            </div>
          </div>

          <div className="p-6 space-y-5">
            <h2 className="font-display text-2xl font-semibold text-evora-text-primary">{title}</h2>

            <div className="flex flex-col gap-3 text-sm text-evora-text-secondary">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-evora-primary shrink-0" />
                <div>
                  <p className="font-medium text-evora-text-primary">
                    {startDate ? format(new Date(startDate), "MMMM d, yyyy") : "TBD"}
                  </p>
                  <p>
                    {startDate ? format(new Date(startDate), "h:mm a") : ""} — {endDate ? format(new Date(endDate), "h:mm a") : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-evora-primary shrink-0" />
                <p>{venue}</p>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-evora-primary shrink-0" />
                <p>
                  {isSoldOut ? (
                    <span className="text-red-500 font-medium">Sold out</span>
                  ) : (
                    <>{availableSeats} spots remaining</>
                  )}
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="border-t border-evora-border-soft pt-5 space-y-3">
              <h3 className="font-display text-sm font-semibold text-evora-text-primary uppercase tracking-wider">Booking Summary</h3>

              <div className="flex items-center justify-between text-sm">
                <span className="text-evora-text-secondary">Attendee</span>
                <span className="font-medium text-evora-text-primary">{user?.name || "—"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-evora-text-secondary">Email</span>
                <span className="font-medium text-evora-text-primary">{user?.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-evora-text-secondary">Tickets</span>
                <span className="font-medium text-evora-text-primary">1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-evora-text-secondary">Price</span>
                <span className="font-semibold text-evora-primary">Free</span>
              </div>
            </div>

            {/* Warning if event ended or sold out */}
            {(hasEnded || isSoldOut) && (
              <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-500">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p>{hasEnded ? "This event has already ended." : "This event is sold out."}</p>
              </div>
            )}

            {/* Confirm Button */}
            <div className="pt-2">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleConfirmBooking}
                disabled={hasEnded || isSoldOut || isBooking}
              >
                <Ticket className="h-5 w-5" />
                {isBooking ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
