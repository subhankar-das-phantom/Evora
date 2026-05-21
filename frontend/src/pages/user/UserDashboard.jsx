import useSWR from "swr";
import { format } from "date-fns";
import { Ticket, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { fetcher } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function UserDashboard() {
  const { data, error, isLoading } = useSWR(endpoints.bookings.mine, fetcher);

  const bookings = data?.bookings || data || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-evora-text-primary">My Dashboard</h1>
        <p className="mt-1 text-evora-text-secondary">Manage your upcoming event experiences.</p>
      </div>

      <div className="space-y-6">
        <h2 className="font-display text-xl font-semibold text-evora-text-primary">Upcoming Bookings</h2>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-evora-border bg-evora-surface-secondary p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-7 w-3/4 mb-4" />
                <div className="mt-auto flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="mt-6">
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <EmptyState title="Failed to load bookings" description="We couldn't fetch your bookings right now." />
        ) : bookings.length === 0 ? (
          <EmptyState
            title="No upcoming events"
            description="You haven't booked any events yet. Discover what's happening next."
            icon={Ticket}
            actionLabel="Browse Events"
            onAction={() => (window.location.href = "/events")}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookings
              .filter((booking) => booking?.eventId)
              .map((booking) => {
                const event = booking.eventId;
                return (
                  <div
                    key={booking._id}
                    className="flex flex-col rounded-2xl border border-evora-border bg-evora-surface-secondary p-5 shadow-soft"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-evora-support/20 px-2.5 py-0.5 text-xs font-semibold text-evora-support">
                        {booking.bookingStatus}
                      </span>
                      <span className="text-xs font-medium text-evora-text-muted">
                        ID: {booking._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-evora-text-primary line-clamp-1">{event.title}</h3>

                    <div className="mt-4 flex flex-col gap-2 text-sm text-evora-text-secondary">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-evora-primary shrink-0" />
                        <span>{format(new Date(event.startDate), "MMM d, yyyy - h:mm a")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-evora-primary shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-evora-primary shrink-0" />
                        <span>{booking.checkedIn ? "Checked in" : "Not checked in yet"}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button variant="secondary" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
