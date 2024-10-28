import React from "react";
import AppTemplate from "./layouts/AppTemplate";
import instagram from "../assets/instagram.svg";

import logo from "../assets/logo.svg";

const eventsInCity = [
  "Delhi NCR",
  "Bengaluru",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Jaipur",
  "Goa",
  "Patna",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Chandigarh",
  "Lucknow",
  "Indore",
  "Kanpur",
];

export default function Footer() {
  return (
    <div className="bg-zinc-200/20 pb-20 pt-10">
      <AppTemplate>
        <div className="w-full grid grid-cols-4 gap-2 border-b border-zinc-200/50 pb-16">
          <div className="-mb-2 col-span-4">
            <img src={logo} alt="logo" className="w-56 -ml-10" />
          </div>

          <div className="mb-10 flex items-center gap-2 col-span-4">
            <a href="https://instagram.com/w_udhav" className="">
              <img src={instagram} alt="instagram" className="w-8" />
            </a>
          </div>

          <h1 className="font-medium text-2xl col-span-4 pb-2">Top events</h1>

          {eventsInCity.map((city) => (
            <p
              key={city}
              className="text-zinc-300 hover:text-zinc-500 cursor-pointer"
            >
              Events in {city}
            </p>
          ))}
        </div>
        <div className="pt-6">
          <p className="text-zinc-300 text-sm">
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies.
          </p>
        </div>
      </AppTemplate>
    </div>
  );
}
