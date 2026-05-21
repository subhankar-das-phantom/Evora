import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDate, seatsLeft } from "@/utils/format";
import { cn } from "@/utils/cn";

export function EventCard({ event }) {
  const remaining = seatsLeft(event);
  const isLowSeats = remaining > 0 && remaining <= 10;

  return (
    <Link
      to={`/events/${event._id}`}
      className="group flex flex-col bg-surface rounded-xl border border-border overflow-hidden card-hover"
      id={`event-card-${event._id}`}
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-surface-elevated overflow-hidden">
        {event.bannerImage ? (
          <img
            alt={event.title}
            src={event.bannerImage}
            className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10" />
        )}
        {/* Category badge */}
        {event.category && (
          <div className="absolute top-3 left-3 bg-surface/80 backdrop-blur-md border border-border/50 text-label-sm px-2.5 py-1 rounded-lg text-text-primary">
            {event.category}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta */}
        <div className="flex items-center gap-2 text-label-sm text-text-muted mb-3">
          <Calendar size={14} />
          <span>{formatDate(event.date)}</span>
          <span className="w-1 h-1 rounded-full bg-border mx-1" />
          <MapPin size={14} />
          <span className="truncate">{event.venue || "Online"}</span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-body-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
          <div className="flex flex-col">
            <span className="font-semibold text-text-primary">
              {event.price > 0 ? `$${event.price}` : "Free"}
            </span>
            {remaining !== null && (
              <span
                className={cn(
                  "text-label-sm",
                  isLowSeats ? "text-warning" : "text-text-muted"
                )}
              >
                {remaining === 0
                  ? "Sold out"
                  : `${remaining} seat${remaining !== 1 ? "s" : ""} left`}
              </span>
            )}
          </div>
          <span className="text-label-md font-medium text-primary group-hover:text-primary-hover transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
