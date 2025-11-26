import type { weekDay } from "../../types";
import { cn } from "../../lib/utils";

interface DaysDropdownItemProps {
  day: weekDay;
  showActiveStyle?: boolean;
  setActiveDay: (day: weekDay) => void;
  setShowDropdown: (state: boolean) => void;
}

export function DaysDropdownItem({
  day,
  setActiveDay,
  showActiveStyle,
  setShowDropdown,
}: DaysDropdownItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full cursor-pointer rounded-8 px-100 py-125 text-start hover:bg-neutral-700",
        showActiveStyle ? "bg-neutral-700" : undefined,
      )}
      onClick={() => {
        setActiveDay(day);
        setShowDropdown(false);
      }}
    >
      {day}
    </button>
  );
}
