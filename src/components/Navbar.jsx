import React from "react";
import Icon from "../components/Icon";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-20 w-full py-3 flex justify-center bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur-2xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
      <div className="max-w-screen-xl w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1>EventSpot</h1>
          <button className="bg-zinc-800/75 px-4 py-2 rounded-full font-bold text-white text-sm">
            Delhi NCR
          </button>
        </div>
        <div></div>
      </div>
    </nav>
  );
}
