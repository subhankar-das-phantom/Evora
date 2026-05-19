import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

export function EventCard({ event }) {
  const { _id, title, category, venue, startDate, banner, image } = event;

  return (
    <Link 
      to={`/events/${_id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-evora-surface-secondary shadow-soft transition-all duration-medium ease-premium hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-evora-surface-muted">
        <img 
          src={banner || image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-large ease-premium group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 rounded-full bg-evora-surface-secondary/90 px-3 py-1 text-xs font-semibold text-evora-text-primary backdrop-blur-md">
          {category}
        </div>
      </div>
      
      <div className="flex flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-tight text-evora-text-primary line-clamp-2">
          {title}
        </h3>
        
        <div className="mt-4 flex flex-col gap-2 text-sm text-evora-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-evora-primary" />
            <span>{startDate ? format(new Date(startDate), "MMM d, yyyy • h:mm a") : "TBD"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-evora-primary" />
            <span className="truncate">{venue}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
