"use client";
import { useState, useEffect } from "react";

export default function TimeNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    // unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" w-full text-center font-semibold text-slate-700 mb-5">
      <span className="p-2 border border-emerald-600 rounded-full">
        {now.toLocaleTimeString()}
      </span>
    </div>
  );
}
