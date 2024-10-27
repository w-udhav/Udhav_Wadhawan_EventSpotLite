import React from "react";

export default function SectionHeader({ title }) {
  return (
    <h1 className="pl-1 font-anton font-bold text-3xl md:text-6xl leading-normal bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-orange-50 via-red-200 to-blue-200 bg-clip-text text-transparent">
      {title}
    </h1>
  );
}
