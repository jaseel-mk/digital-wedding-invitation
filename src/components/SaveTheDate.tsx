import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";
import { CalendarPlus, CalendarHeart } from "lucide-react";

function generateICS(): string {
  const dt = WEDDING.dateISO.replace(/[-:]/g, "").replace(".000", "");
  const dtStart = dt.split("T")[0] + "T" + (dt.split("T")[1] || "160000");
  const dtEnd = "20270214T230000";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Josh & Margaret Wedding//Wedico//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@josh-margaret-wedding`,
    `DTSTAMP:${dtStart}Z`,
    `DTSTART;TZID=${WEDDING.timezone}:${dtStart}`,
    `DTEND;TZID=${WEDDING.timezone}:${dtEnd}`,
    `SUMMARY:${WEDDING.calendarEvent.title}`,
    `DESCRIPTION:${WEDDING.calendarEvent.description}`,
    `LOCATION:${WEDDING.calendarEvent.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return ics;
}

function downloadICS() {
  const ics = generateICS();
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "josh-margaret-wedding.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function SaveTheDate() {
  return (
    <section className="section save-date-section" id="save-the-date">
      <div className="save-date-inner">
        <Reveal>
          <span className="save-date-ornament">&#10087;</span>
        </Reveal>
        <Reveal>
          <h2 className="save-date-heading">Save the Date</h2>
        </Reveal>
        <Reveal>
          <p className="save-date-date">{WEDDING.dateDisplay}</p>
        </Reveal>
        <Reveal>
          <p className="save-date-venue">
            {WEDDING.venueName} &middot; Paarl, Western Cape
          </p>
        </Reveal>
        <Reveal>
          <div className="save-date-actions">
            <button className="btn-calendar" onClick={downloadICS}>
              <CalendarPlus size={16} strokeWidth={1.5} />
              Add to Calendar
            </button>
            <a
              className="btn-calendar btn-calendar-outline"
              href={WEDDING.calendarEvent.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarHeart size={16} strokeWidth={1.5} />
              Google Calendar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
