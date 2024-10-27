import React, { useRef, useState } from "react";
import { glassmorph } from "../utils/constants";
import Icon from "./Icon";

export default function EventCard({ event = {} }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayButtonClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full relative rounded-3xl max-h-[490px] overflow-hidden">
      <video
        ref={videoRef}
        src={event?.video}
        poster={event?.poster}
        className="w-full h-full object-cover object-center"
        muted
        playsInline
        controls={false}
      ></video>

      {event?.video && (
        <div className="absolute right-2 top-2 flex items-center justify-center ">
          <button
            onClick={handlePlayButtonClick}
            className="text-zinc-200 hover:bg-zinc-600/60 bg-zinc-700/60 transition-all rounded-full w-10 h-10 flex justify-center items-center"
          >
            {isPlaying ? (
              <Icon name="pause" className="text-2xl" />
            ) : (
              <Icon name="play_arrow" className="text-2xl" />
            )}
          </button>
        </div>
      )}

      {/* overlay */}
      <div className="absolute bottom-0 left-0 w-full h-20 backdrop-blur-xl flex justify-between items-center px-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-md md:text-xl font-bold text-">
            {event.title || "Event Title"}
          </h3>
        </div>
        <button className="min-w-max font-bold px-6 py-3 bg-zinc-700/60 rounded-full text-sm">
          {!event.isAvailable ? "Book" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
