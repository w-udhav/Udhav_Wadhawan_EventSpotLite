import { events } from "./data";

export const getEvents = async () => {
  return events.sort((a, b) => {
    return new Date(a.dateOfEvent) - new Date(b.dateOfEvent);
  });
};

export const dateFormatting = (date) => {
  //Format: YYYY-MM-DD
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
