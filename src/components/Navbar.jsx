import React from "react";
import { glassmorph } from "../utils/constants";
import logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <div className="md:mb-20 ">
      <nav
        className={
          "fixed top-0 w-full py-3 flex justify-center px-3 md:px-0 z-50 " +
          glassmorph
        }
      >
        <div className="max-w-screen-xl w-full flex justify-between items-center z-20">
          <div className="-ml-6">
            <img src={logo} alt="EventSpot" className="w-32" />
          </div>
          <div>
            <button className="min-w-max py-2 px-4 text-sm md:text-[17px] text-zinc-300 rounded-full flex justify-center items-center gap-2 relative bg-zinc-800 font-semibold border-2 border-zinc-600">
              Delhi NCR
            </button>
          </div>
        </div>
        {/* <div className="w-full h-[0.1px] bg-zinc-800 absolute bottom-0" /> */}
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-background/80" />
      </nav>
    </div>
  );
}
