import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Heart } from "lucide-react";
import { format } from "date-fns";
import { useSavedEvents } from "@/hooks/useSavedEvents";
import { savedEventsApi } from "@/features/events/savedEvents.api";
import { uiStore } from "@/store/uiStore";
import { authStore } from "@/store/authStore";

export function EventCard({ event }) {
  const { _id, title, category, venue, startDate, banner, image } = event;
  const token = authStore((s) => s.token);
  const user = authStore((s) => s.user);
  const isUser = !!token && user?.role === "USER";
  const { isSaved, mutate: mutateSaved } = useSavedEvents();
  const pushToast = uiStore((s) => s.pushToast);
  const [isToggling, setIsToggling] = useState(false);
  const [optimisticSaved, setOptimisticSaved] = useState(null);

  const saved = optimisticSaved !== null ? optimisticSaved : isSaved(_id);

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUser) return;
    if (isToggling) return;
    
    setIsToggling(true);
    const willSave = !saved;
    setOptimisticSaved(willSave); // Instant UI feedback

    try {
      if (saved) {
        await savedEventsApi.unsaveEvent(_id);
        pushToast({ type: "success", message: "Event removed from saved." });
      } else {
        await savedEventsApi.saveEvent(_id);
        pushToast({ type: "success", message: "Event saved!" });
      }
      await mutateSaved();
    } catch (_err) {
      setOptimisticSaved(saved); // Rollback on error
    } finally {
      setIsToggling(false);
      setOptimisticSaved(null); // Release control back to SWR state
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
    <Link 
      to={`/events/${_id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-evora-surface-secondary shadow-soft transition-all duration-medium ease-premium hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-evora-surface-muted">
        <img 
          src={banner || image || fallbackImages[category] || defaultImage} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-large ease-premium group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 rounded-full bg-evora-surface-secondary/90 px-3 py-1 text-xs font-semibold text-evora-text-primary backdrop-blur-md">
          {category}
        </div>
        {isUser && (
          <button
            onClick={handleToggleSave}
            disabled={isToggling}
            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-fast ${
              saved
                ? "bg-red-500/90 text-white hover:bg-red-600/90"
                : "bg-evora-surface-secondary/90 text-evora-text-secondary hover:bg-evora-surface-secondary hover:text-red-500"
            }`}
            title={saved ? "Unsave event" : "Save event"}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        )}
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
