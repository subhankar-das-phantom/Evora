export const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));

export const seatsLeft = (event) => Math.max((event?.maxSeats || 0) - (event?.bookedSeats || 0), 0);

