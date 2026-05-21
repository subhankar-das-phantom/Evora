import { useState } from "react";
import { Search, QrCode } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { uiStore } from "@/store/uiStore";
import { cn } from "@/utils/cn";
import useSWR from "swr";

const statusStyles = {
  CONFIRMED: "bg-success/10 text-success border-success/20",
  PENDING: "bg-warning/10 text-warning border-warning/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
  CHECKED_IN: "bg-primary/10 text-primary border-primary/20",
};

export default function AdminBookingsPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const { events } = useEvents({ limit: 100 });
  const pushToast = uiStore((s) => s.pushToast);

  const bookingsKey = selectedEvent
    ? endpoints.bookings.eventBookings(selectedEvent)
    : null;
  const { data: bookings, isLoading, mutate } = useSWR(bookingsKey);

  const handleCheckIn = async (bookingId) => {
    try {
      await api.patch(endpoints.bookings.checkIn(bookingId));
      pushToast({ type: "success", message: "Checked in successfully!" });
      mutate();
    } catch {
      // handled
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-headline-lg tracking-tight">
        Bookings
      </h1>

      {/* Event Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-body-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          id="event-filter"
        >
          <option value="">Select an event to view bookings</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {!selectedEvent ? (
        <EmptyState
          title="Select an event"
          description="Choose an event from the dropdown to view its bookings."
        />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : !bookings?.length ? (
        <EmptyState
          title="No bookings"
          description="This event has no bookings yet."
        />
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Attendee
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-label-sm text-text-muted font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-border/30 hover:bg-surface-elevated/50 transition-colors"
                  >
                    <td className="px-5 py-4 text-body-sm text-text-primary">
                      {booking.user?.name || "—"}
                    </td>
                    <td className="px-5 py-4 text-body-sm text-text-muted hidden sm:table-cell">
                      {booking.user?.email || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex px-2.5 py-0.5 rounded-full text-label-sm font-medium border",
                          statusStyles[booking.status] || statusStyles.PENDING
                        )}
                      >
                        {booking.status?.replace("_", " ") || "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {booking.status === "CONFIRMED" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCheckIn(booking._id)}
                        >
                          <QrCode size={14} />
                          Check In
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
