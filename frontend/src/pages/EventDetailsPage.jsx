import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { format } from "date-fns";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { fetcher } from "@/api/axios";
import { bookingsApi } from "@/features/bookings/bookings.api";
import { uiStore } from "@/store/uiStore";
import { useAuth } from "@/hooks/useAuth";

export default function EventDetailsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { data, error, isLoading, mutate } = useSWR(eventId ? `/events/${eventId}` : null, fetcher);
  const pushToast = uiStore((s) => s.pushToast);
  const { isAuthenticated, user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);

  if (isLoading) {
    return (
      <article className="container-reading pb-24 pt-8">
        <div className="mb-6">
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-2xl" />
        
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Skeleton className="h-14 w-3/4" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          
          <div className="relative">
            <div className="sticky top-24 flex flex-col space-y-6 rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
              <Skeleton className="h-7 w-1/3" />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 mt-0.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 mt-0.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 mt-0.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-evora-border-soft">
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (error || !data) {
    return (
      <div className="container-reading py-20">
        <EmptyState title="Event not found" description="The event you are looking for does not exist or has been removed." />
      </div>
    );
  }

  const { title, description, category, venue, startDate, endDate, maxSeats, bookedSeats, banner, image } = data || {};
  const availableSeats = maxSeats - bookedSeats;
  const isUser = user?.role === "USER";
  const hasEnded = endDate ? new Date(endDate) < new Date() : false;

  const handleBookTicket = async () => {
    if (!isAuthenticated) {
      pushToast({ type: "info", message: "Please sign in as a user to book tickets." });
      navigate("/login");
      return;
    }
    if (!isUser) {
      pushToast({ type: "error", message: "Only user accounts can book tickets." });
      return;
    }
    if (hasEnded || availableSeats <= 0 || isBooking) return;

    setIsBooking(true);
    try {
      await bookingsApi.createBooking(eventId);
      pushToast({ type: "success", message: "Ticket booked successfully." });
      await mutate();
    } catch (_error) {
      // Errors are surfaced by axios interceptor + toast
    } finally {
      setIsBooking(false);
    }
  };

  const fallbackImages = {
    TECHNOLOGY: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop", // Techy/Digital
    BUSINESS: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop", // Corporate buildings
    DESIGN: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", // Design/Colors
    NETWORKING: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2000&auto=format&fit=crop" // Event crowd
  };

  const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop";

  return (
    <article className="container-reading pb-24">
      {/* Back Link */}
      <div className="mb-6">
        <Link to="/events" className="inline-flex items-center text-sm font-medium text-evora-text-secondary transition-colors hover:text-evora-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </div>

      {/* Cinematic Banner */}
      <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-evora-surface-muted shadow-soft">
        <img 
          src={banner || image || fallbackImages[category] || defaultImage} 
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-6 top-6 rounded-full bg-evora-surface-secondary/90 px-4 py-1.5 text-sm font-semibold text-evora-text-primary backdrop-blur-md">
          {category}
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-evora-text-primary sm:text-5xl">
            {title}
          </h1>
          
          <div className="prose prose-evora max-w-none text-evora-text-secondary">
            <p className="whitespace-pre-wrap leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Sidebar Sticky Panel */}
        <div className="relative">
          <div className="sticky top-24 flex flex-col space-y-6 rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
            <h3 className="font-display text-xl font-semibold text-evora-text-primary">Details</h3>
            
            <div className="flex flex-col gap-4 text-sm text-evora-text-secondary">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-evora-primary shrink-0" />
                <div>
                  <p className="font-medium text-evora-text-primary">Date & Time</p>
                  <p>{startDate ? format(new Date(startDate), "MMMM d, yyyy") : "TBD"}</p>
                  <p>{startDate ? format(new Date(startDate), "h:mm a") : ""} - {endDate ? format(new Date(endDate), "h:mm a") : ""}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-evora-primary shrink-0" />
                <div>
                  <p className="font-medium text-evora-text-primary">Location</p>
                  <p>{venue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 text-evora-primary shrink-0" />
                <div>
                  <p className="font-medium text-evora-text-primary">Availability</p>
                  <p>{availableSeats} spots left</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-evora-border-soft">
              <Button size="lg" className="w-full" onClick={handleBookTicket} disabled={hasEnded || availableSeats <= 0 || isBooking}>
                {hasEnded ? "Event Ended" : availableSeats <= 0 ? "Sold Out" : isBooking ? "Booking..." : "Book Ticket"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
