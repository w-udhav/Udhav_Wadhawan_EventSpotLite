import React, { useRef, useState } from "react";
import Icon from "./Icon";

import { dateFormatting } from "../utils/functions";

export default function EventCard({ event = {}, showOverlay = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlayButtonClick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteButtonClick = (e) => {
    e.stopPropagation();
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const characterLimit = 19;
  const titleTrimited =
    event.title.length > characterLimit
      ? event.title.slice(0, characterLimit) + "..."
      : event.title;

  return (
    <div className="w-full relative rounded-3xl max-h-[400px] md:max-h-[490px] overflow-hidden">
      <video
        ref={videoRef}
        src={event?.video}
        poster={event?.poster}
        className="w-full h-full object-cover object-top"
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        controlsList="nodownload"
      ></video>

      {event?.video && (
        <div className="absolute right-2 top-2 flex items-center justify-center gap-1">
          <button
            onClick={handlePlayButtonClick}
            className={
              "text-zinc-200 hover:bg-zinc-600/60 transition-all rounded-full w-10 h-10 flex justify-center items-center " +
              (isPlaying ? "bg-zinc-400/60" : "bg-zinc-700/60 ")
            }
          >
            {isPlaying ? (
              <Icon name="pause" className="text-2xl" />
            ) : (
              <Icon name="play_arrow" className="text-2xl" />
            )}
          </button>
          <button
            onClick={handleMuteButtonClick}
            className={
              "text-zinc-200 hover:bg-zinc-600/60 transition-all rounded-full w-10 h-10 flex justify-center items-center " +
              (isMuted ? "bg-zinc-400/60" : "bg-zinc-700/60 ")
            }
          >
            {isMuted ? (
              <Icon name="volume_off" className="text-2xl" />
            ) : (
              <Icon name="volume_up" className="text-2xl" />
            )}
          </button>
        </div>
      )}

      {/* overlay */}
      {showOverlay && (
        <div className="absolute bottom-0 left-0 w-full h-20 backdrop-blur-xl flex justify-between items-center px-4 bg-gradient-to-b from-transparent to-black/50">
          <div className="flex flex-col gap-">
            <h3 className="text-md md:text-xl font-bold text-">
              {titleTrimited || "Event Title"}
            </h3>
            <p className="text-sm text-zinc-200/90 font-semibold">
              {dateFormatting(event?.dateOfEvent) || "Event Date"}
            </p>
          </div>
          <button className="min-w-max font-bold px-6 py-3 bg-zinc-700/60 rounded-full text-sm">
            {event?.isAvailable ? "Book" : "Sold Out"}
          </button>
        </div>
      )}
    </div>
  );
}
