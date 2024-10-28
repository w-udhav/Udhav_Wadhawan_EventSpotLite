import React from "react";
import { glassmorph } from "../utils/constants";

export default function Navbar() {
  return (
    <div className="md:mb-16">
      <nav
        className={
          "fixed top-0 w-full py-3 flex justify-center px-3 md:px-0 " +
          glassmorph
        }
      >
        <div className="max-w-screen-xl w-full flex justify-between items-center z-20">
          <div className="flex gap-2 items-center">
            <h1>EventSpot</h1>
            <button className="bg-zinc-800/75 px-4 py-2 rounded-full font-bold text-white text-sm">
              Delhi NCR
            </button>
          </div>
          <div></div>
        </div>
        {/* <div className="w-full h-[0.1px] bg-zinc-800 absolute bottom-0" /> */}
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-background/80" />
      </nav>
    </div>
  );
}
