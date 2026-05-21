export const formatDate = (value) => {
  try {
    if (!value) return "Date TBD";
    const d = new Date(value);
    if (!d || isNaN(d.getTime())) return "Date TBD";
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(d);
  } catch {
    return "Date TBD";
  }
};

export const seatsLeft = (event) => Math.max((event?.maxSeats || 0) - (event?.bookedSeats || 0), 0);

