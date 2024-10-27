import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import EventCard from "./EventCard";
import { filters, sortyByOptions, events } from "../utils/data";

export default function EventsListing() {
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Date");
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleSortByOpen = () => {
    setIsSortByOpen(!isSortByOpen);
    setSortBy(null);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(
      filter.name.toLowerCase() === activeFilter
        ? null
        : filter.name.toLowerCase()
    );
  };

  useEffect(() => {
    const filteredEvents = events.filter((event) => {
      if (!activeFilter) return true;
      return event.tags.includes(activeFilter);
    });

    if (sortBy === "Date") {
      filteredEvents.sort((a, b) => {
        return new Date(a.dateOfEvent) - new Date(b.dateOfEvent);
      });
    } else if (sortBy === "Price") {
      filteredEvents.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortBy === "Popularity") {
      filteredEvents.sort((a, b) => {
        return b.popularity - a.popularity;
      });
    }

    setFilteredEvents(filteredEvents);
  }, [activeFilter, sortBy]);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader title="Explore Local Events" />
      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-3">
        <button
          onClick={handleSortByOpen}
          className={
            "min-w-max py-2 px-4 text-sm md:text-lg text-zinc-300 rounded-full flex justify-center items-center gap-2 relative " +
            (isSortByOpen ? "bg-rose-700" : "bg-zinc-800 ")
          }
        >
          <Icon name="discover_tune" className="text-lg md:text-xl" />
          <span>Sort By</span>
        </button>
        <AnimatePresence>
          {isSortByOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.1 }}
              className="flex"
            >
              {/* Sort By Options */}
              {sortyByOptions.map((option, index) => (
                <button
                  key={option}
                  onClick={() => {
                    if (option === sortBy) {
                      return setSortBy(null);
                    }
                    setSortBy(option);
                  }}
                  style={{
                    borderTopLeftRadius: index === 0 && "0.8rem",
                    borderBottomLeftRadius: index === 0 && "0.8rem",
                    borderTopRightRadius:
                      index === sortyByOptions.length - 1 && "0.8rem",
                    borderBottomRightRadius:
                      index === sortyByOptions.length - 1 && "0.8rem",
                    borderRight: index === sortyByOptions.length - 1 && "none",
                  }}
                  className={
                    "min-w-max py-2 px-4 text-sm md:text-lg text-zinc-300  border-r border-zinc-700 flex justify-center items-center gap-2 relative " +
                    (option === sortBy ? "bg-rose-700" : "bg-zinc-800")
                  }
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="border-r border-zinc-600"></div>

        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter)}
            style={{
              backgroundColor:
                filter.name.toLowerCase() === activeFilter && filter.bgColor,
              borderColor:
                filter.name.toLowerCase() === activeFilter &&
                filter.borderColor,
            }}
            className={`min-w-max py-2 px-4 text-sm md:text-lg text-zinc-300 bg-zinc-800 rounded-full flex justify-center items-center gap-2 relative `}
          >
            <Icon name={filter.icon} className="text-lg md:text-xl" />
            <span>{filter.name}</span>
          </button>
        ))}
      </div>
      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div>
            <h1 className="text-zinc-300 text-lg">No events found</h1>
          </div>
        )}
      </div>
    </section>
  );
}
