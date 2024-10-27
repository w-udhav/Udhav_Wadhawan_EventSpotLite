import React from "react";
export default function AppTemplate({ wantFull, className = "", children }) {
  if (wantFull) {
    return (
      <div className={"w-full grid grid-cols-6 " + className}>
        <section className="w-full flex justify-center col-span-6">
          {children}
        </section>
      </div>
    );
  }
  return (
    <main className={"w-full " + className}>
      <div className="w-full flex justify-center px-3">
        <div className="max-w-screen-xl w-full">{children}</div>
      </div>
    </main>
  );
}
