import iconDropdown from "../images/icon-dropdown.svg";
import iconDropup from "../images/icon-dropup.svg";
import type { weekDay } from "../../types";
import { WEEKDAYS } from "../../lib/utils";
import { DaysDropdownItem } from "./DaysDropdownItem";
import { useEffect, useRef, useState } from "react";

interface DaysDropdownProps {
  activeDay: weekDay;
  setActiveDay: (day: weekDay) => void;
  // first day of the dropdown
  today: weekDay;
}

export function DaysDropdown({
  activeDay,
  setActiveDay,
  today,
}: DaysDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // calculate array of next 7 days, based on today
  const todayIndex = WEEKDAYS.indexOf(today);
  const dropDownDays = WEEKDAYS.slice(todayIndex).concat(
    WEEKDAYS.slice(0, todayIndex),
  );

  useEffect(() => {
    const handleClickOutsideMenu = (e: MouseEvent) => {
      if (
        showDropdown &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-150 rounded-8 bg-neutral-600 px-200 py-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-preset-7 leading-[1.3125rem]">{activeDay}</span>
        <img
          src={showDropdown ? iconDropup : iconDropdown}
          alt="day settings icon"
          className="w-150"
        />
      </button>
      {showDropdown && (
        <div className="text-preset-7 absolute right-0 -bottom-125 flex min-w-[13.5rem] translate-y-full flex-col items-start gap-050 rounded-12 border border-neutral-600 bg-neutral-800 p-100 shadow-[0px_8px_16px_0px_rgba(2,1,44,0.32)]">
          {dropDownDays.map((d, i) => {
            return (
              <DaysDropdownItem
                key={i}
                day={d}
                setActiveDay={setActiveDay}
                showActiveStyle={activeDay === d ? true : false}
                setShowDropdown={setShowDropdown}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
