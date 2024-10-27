import React from "react";
import AppTemplate from "./layouts/AppTemplate";
import diljit from "../assets/diljit/posterVid.mp4";

export default function HeroSection() {
  return (
    <AppTemplate wantFull={true} className="max-w-screen-2xl mx-auto ">
      <div className="w-full rounded-3xl h-[65vh] md:h-full md:max-h-[75vh] overflow-hidden relative shadow-sm">
        {/* Overlay - Black background */}
        <div className="w-full h-full absolute top-0 left-0 bg-black/10" />
        <div className="w-full h-[60%] absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-black" />
        <div className="w-full h-full absolute top-0 left-0" />
        {/* Overlay - Bottom Text */}
        <AppTemplate className="w-full absolute top-0 left-0 bottom-0 right-0 flex items-end pb-10 z-10">
          <div className="w-full flex flex-col items-start">
            <h3 className="font-semibold text-xl md:text-2xl text-zinc-400/70">
              Most Popular
            </h3>
            <h1 className="text-textWhite/60 font-bold text-3xl md:text-5xl">
              Diljit Dosanjh
            </h1>
          </div>
        </AppTemplate>
        <div className="w-full h-full absolute top-0 right-0"></div>
        <video
          src={diljit}
          poster="https://dynamicmedia.livenationinternational.com/e/w/j/c1717ea0-dbfa-4b68-bef0-d2e1c3520f83.jpg"
          className="w-full h-full object-cover object-center rounded-3xl z-0"
          autoPlay
          loop={true}
          controls={false}
          muted
          playsInline
        ></video>
      </div>
    </AppTemplate>
  );
}
