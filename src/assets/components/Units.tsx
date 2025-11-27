import settingsIcon from "../images/icon-units.svg";
import iconDropDown from "../images/icon-dropdown.svg";
import iconDropUp from "../images/icon-dropup.svg";
import type { UnitsData } from "../../lib/types";
import { useRef, useState } from "react";
import { UnitsDropdown } from "./UnitsDropdown";
import { useOnClickOutside } from "../../lib/hooks/useOnClickOutside";

interface UntisProps {
  unitsOptions: UnitsData;
  setUnitsOptions: (options: UnitsData) => void;
}

export function Units({ unitsOptions, setUnitsOptions }: UntisProps) {
  const [showDropdown, setShowDropdown] = useState(true);
  const unitsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(unitsRef, () => {
    if (showDropdown) setShowDropdown(false);
  });

  return (
    <div className="relative" ref={unitsRef}>
      <button
        type="button"
        className="flex w-fit cursor-pointer gap-x-075 rounded-6 bg-neutral-800 px-125 py-100 tablet:gap-x-125 tablet:px-200 tablet:py-150"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src={settingsIcon}
          alt="units settings icon"
          className="w-[0.875rem] tablet:w-auto"
        />
        <p className="text-preset-8 text-neutral-0 tablet:text-[1rem]">Units</p>
        <img
          src={showDropdown ? iconDropUp : iconDropDown}
          alt="drop down settings icon"
          className="w-[0.5625rem] tablet:w-auto"
        />
      </button>
      {showDropdown && (
        <div className="absolute right-0 -bottom-125 z-10 translate-y-full">
          <UnitsDropdown
            unitsOptions={unitsOptions}
            setUnitsOptions={setUnitsOptions}
          />
        </div>
      )}
    </div>
  );
}
