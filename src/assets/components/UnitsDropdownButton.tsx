import { cn } from "../../lib/utils";
import checkmark from "../images/icon-checkmark.svg";

interface UnitsDropdownButtonProps {
  text: string;
  isSelected: boolean;
}

export function UnitsDropdownButton({
  text,
  isSelected,
}: UnitsDropdownButtonProps) {
  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "w-full cursor-pointer rounded-8 px-100 py-125 text-start text-neutral-0 hover:bg-neutral-700",
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
