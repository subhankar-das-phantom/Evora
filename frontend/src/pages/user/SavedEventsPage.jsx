import { Heart, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useSavedEvents } from "@/hooks/useSavedEvents";
import { savedEventsApi } from "@/features/events/savedEvents.api";
import { uiStore } from "@/store/uiStore";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function SavedEventsPage() {
  const { savedEvents, isLoading, error, mutate } = useSavedEvents();
  const pushToast = uiStore((s) => s.pushToast);

  const handleUnsave = async (eventId) => {
    try {
      await savedEventsApi.unsaveEvent(eventId);
      pushToast({ type: "success", message: "Event removed from saved list." });
      mutate();
    } catch (_err) {
      // handled by interceptor
    }
  };

  const fallbackImages = {
    TECHNOLOGY: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    BUSINESS: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    DESIGN: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    NETWORKING: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1000&auto=format&fit=crop"
  };
  const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-evora-text-primary">Saved Events</h1>
        <p className="mt-1 text-evora-text-secondary">Events you've bookmarked for later.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-evora-border bg-evora-surface-secondary shadow-soft">
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="flex flex-col p-5">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <EmptyState title="Failed to load saved events" description="We couldn't fetch your saved events right now." />
      ) : savedEvents.length === 0 ? (
        <EmptyState
          title="No saved events"
          description="Bookmark events you're interested in and they'll appear here."
          icon={Heart}
          actionLabel="Browse Events"
          onAction={() => (window.location.href = "/events")}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedEvents
            .filter((event) => event && event._id)
            .map((event) => (
              <div
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-evora-border bg-evora-surface-secondary shadow-soft transition-all duration-medium ease-premium hover:-translate-y-1 hover:shadow-elegant"
              >
                <Link to={`/events/${event._id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-evora-surface-muted">
                  <img
                    src={event.banner || fallbackImages[event.category] || defaultImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-large ease-premium group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-evora-surface-secondary/90 px-3 py-1 text-xs font-semibold text-evora-text-primary backdrop-blur-md">
                    {event.category}
                  </div>
                </Link>

                <div className="flex flex-col p-5">
                  <Link to={`/events/${event._id}`}>
                    <h3 className="font-display text-lg font-semibold leading-tight text-evora-text-primary line-clamp-2 hover:text-evora-primary transition-colors">
                      {event.title}
                    </h3>
                  </Link>

                  <div className="mt-4 flex flex-col gap-2 text-sm text-evora-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-evora-primary" />
                      <span>{event.startDate ? format(new Date(event.startDate), "MMM d, yyyy • h:mm a") : "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-evora-primary" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => (window.location.href = `/events/${event._id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0"
                      onClick={() => handleUnsave(event._id)}
                      title="Remove from saved"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
