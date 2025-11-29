import { cn } from "../../lib/utils";
import checkmark from "../images/icon-checkmark.svg";
import type { UnitsData } from "../../lib/types";

interface UnitsDropdownButtonProps {
  text: string;
  isSelected: boolean;
  /** what values will this button update when clicked */
  updateValues: Partial<UnitsData>;
  updateHandler: (values: Partial<UnitsData>) => void;
}

export function UnitsDropdownButton({
  text,
  isSelected,
  updateValues,
  updateHandler,
}: UnitsDropdownButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={() => {
          if (isSelected) return;
          updateHandler(updateValues);
        }}
        type="button"
        className={cn(
          "w-full cursor-pointer rounded-8 px-100 py-125 text-start text-neutral-0 outline-offset-1 outline-neutral-0 hover:bg-neutral-700 focus-visible:outline-1",
          isSelected && "bg-neutral-700",
        )}
      >
        <p className="text-preset-7">{text}</p>
      </button>
      {isSelected && (
        <img
          src={checkmark}
          alt={`${text} is selected`}
          className="absolute top-1/2 right-100 -translate-y-1/2"
        />
      )}
    </div>
  );
}
