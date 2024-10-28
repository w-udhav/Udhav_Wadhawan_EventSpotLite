import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import EventCard from "./EventCard";
import { filters, sortyByOptions } from "../utils/data";
import { dateFormatting, getEvents } from "../utils/functions";

export default function EventsListing() {
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Date");
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const fetchAndSortEvents = async () => {
    const events = await getEvents();

    const filteredEvents = events.filter((event) => {
      if (!activeFilter) return true;
      return event.tags.includes(activeFilter);
    });

    if (sortBy === "Date") {
      filteredEvents.sort(
        (a, b) => new Date(a.dateOfEvent) - new Date(b.dateOfEvent)
      );
    } else if (sortBy === "Price") {
      filteredEvents.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Popularity") {
      filteredEvents.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredEvents(filteredEvents);
  };

  useEffect(() => {
    fetchAndSortEvents();
  }, [activeFilter, sortBy]);

  // Event Modal
  const handleCardClick = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader title="Explore Local Events" />
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        className="flex gap-3 overflow-x-auto hide-scrollbar pb-3"
      >
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
      </motion.div>
      {/* Event Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ willChange: "opacity, transform" }}
      >
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <motion.button
              key={event.id}
              layoutId={event.id}
              onClick={() => handleCardClick(event)}
              className="relative text-left"
            >
              <EventCard event={event} />
            </motion.button>
          ))
        ) : (
          <div>
            <h1 className="text-zinc-300 text-lg">No events found</h1>
          </div>
        )}
      </motion.div>
      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="z-50">
            {/* Background Blur */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-xl z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }} // Smooth backdrop fade
              onClick={handleCloseModal}
            />

            {/* Zoomed Card */}
            <motion.div
              layoutId={selectedEvent.id}
              className="fixed top-0 left-0 right-0 mx-auto w-full max-w-md p-5 overflow-y-auto max-h-[100dvh] hide-scrollbar rounded-lg shadow-lg z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-zinc-300 bg-zinc-700 px-4 py-2 rounded-full text-sm"
              >
                Close
              </motion.button>

              <div className="w-full flex flex-col gap-2 mt-10">
                <EventCard event={selectedEvent} showOverlay={false} />

                {/* Information Container */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="p-4 rounded-2xl bg-white/30 shadow-lg flex flex-col gap-1"
                >
                  <h2 className="text-3xl font-bold font-anton">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-sm text-zinc-200">
                    {selectedEvent?.tagline}
                  </p>
                </motion.div>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="rounded-2xl bg-white/30 shadow-lg flex flex-col gap-2"
                >
                  <div className="flex gap-5 border-b border-zinc-400 p-4">
                    <Icon name="event" className="text-3xl font-semibold" />
                    <h2 className="text-3xl font-bold font-anton">
                      {dateFormatting(selectedEvent?.dateOfEvent)}
                    </h2>
                  </div>
                  <div className="flex gap-5 border-b border-zinc-400 p-4 pt-2">
                    <Icon name="schedule" className="text-3xl font-semibold" />
                    <h2 className="text-3xl font-bold font-anton">
                      {selectedEvent.timeOfEvent}
                    </h2>
                  </div>
                  <div className="flex gap-5 p-4 pt-2">
                    <Icon
                      name="location_on"
                      className="text-3xl font-semibold"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-3xl font-bold font-anton">Venue</h2>
                      <p className="text-sm text-zinc-200">
                        {selectedEvent?.venue}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Book */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`p-4 rounded-2xl  shadow-lg flex flex-col gap-1 ${
                    selectedEvent?.isAvailable
                      ? "cursor-pointer bg-rose-500"
                      : "cursor-not-allowed bg-zinc-400"
                  }`}
                >
                  <div className="flex justify-between">
                    {selectedEvent?.isAvailable && (
                      <h2 className="text-3xl font-bold font-anton">
                        <span className="text-[32px]">₹</span>
                        <span>{selectedEvent?.price}</span>
                      </h2>
                    )}

                    {selectedEvent?.isAvailable ? (
                      <button className="text-3xl font-bold font-anton">
                        Book Now
                      </button>
                    ) : (
                      <button className="flex-1 text-3xl font-bold font-anton text-center">
                        Sold Out
                      </button>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="p-4 rounded-2xl bg-white/30 shadow-lg flex flex-col gap-1"
                >
                  <h2 className="text-3xl font-bold font-anton">About</h2>
                  <p className="text-sm text-zinc-200">
                    {selectedEvent?.about}
                  </p>
                </motion.div>
              </div>

              {/* Information Container */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
