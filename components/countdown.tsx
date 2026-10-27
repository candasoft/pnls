"use client";

import { useEffect, useState } from "react";

// Explicit Myanmar offset keeps this consistent across visitor time zones.
const starts = Date.parse("2027-01-30T09:00:00+06:30");
const ends = Date.parse("2027-01-31T17:00:00+06:30");

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (now === null)
    return (
      <div className="countdown countdown-loading">
        The countdown to your next chapter.
      </div>
    );
  if (now >= ends)
    return (
      <p className="event-status">
        Thank you for being part of Pyinyar Lam Sone 2027.
      </p>
    );
  if (now >= starts)
    return (
      <p className="event-status">
        It’s festival weekend! Join us from 9 AM to 5 PM, 30–31 January.
      </p>
    );
  const seconds = Math.max(0, Math.floor((starts - now) / 1000));
  const parts = [
    [Math.floor(seconds / 86400), "Days"],
    [Math.floor(seconds / 3600) % 24, "Hours"],
    [Math.floor(seconds / 60) % 60, "Minutes"],
    [seconds % 60, "Seconds"],
  ] as const;

  return (
    <div
      className="countdown"
      role="timer"
      aria-label="Time until the festival begins"
      aria-live="off"
    >
      {parts.map(([value, label]) => (
        <div key={label}>
          <b>{String(value).padStart(2, "0")}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
