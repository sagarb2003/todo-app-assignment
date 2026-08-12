"use client";

import { addDays, formatDay } from "@/lib/tasks";

type DayStripProps = {
  weekStart: string;
  selectedDate: string;
  onSelect: (date: string) => void;
};

export default function DayStrip({
  weekStart,
  selectedDate,
  onSelect,
}: DayStripProps) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex justify-between gap-1">
      {days.map((date) => {
        const { weekday, day } = formatDay(date);
        const isSelected = date === selectedDate;
        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-xs ${
              isSelected
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <span>{weekday}</span>
            <span className="text-base font-semibold">{day}</span>
          </button>
        );
      })}
    </div>
  );
}
