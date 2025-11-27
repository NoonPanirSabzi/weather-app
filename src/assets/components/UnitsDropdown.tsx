import type { UnitsData } from "../../lib/types";
import { UnitsDropdownOptions } from "./UnitsDropdownOptions";
import { UnitsDropdownButton } from "./UnitsDropdownButton";

interface UnitsDropdownProps {
  unitsOptions: UnitsData;
  setUnitsOptions: (options: UnitsData) => void;
}

export function UnitsDropdown({
  unitsOptions,
  setUnitsOptions,
}: UnitsDropdownProps) {
  return (
    <div className="flex w-[13.375rem] flex-col gap-y-050 rounded-12 border border-neutral-600 bg-neutral-800 px-100 py-075 shadow-[0rem_0.5rem_1rem_0rem_rgba(2,1,44,0.32)]">
      <UnitsDropdownButton text="Switch to ..." isSelected={false} />
      <UnitsDropdownOptions title="Temperature">
        <UnitsDropdownButton
          text="Celsius (°C)"
          isSelected={unitsOptions.temperature === "C"}
        />
        <UnitsDropdownButton
          text="Fahrenheit (°F)"
          isSelected={unitsOptions.temperature === "F"}
        />
      </UnitsDropdownOptions>
      <Divider />
      <UnitsDropdownOptions title="Wind Speed">
        <UnitsDropdownButton
          text="km/h"
          isSelected={unitsOptions.windSpeed === "kmh"}
        />
        <UnitsDropdownButton
          text="mph"
          isSelected={unitsOptions.windSpeed === "mph"}
        />
      </UnitsDropdownOptions>
      <Divider />
      <UnitsDropdownOptions title="Precipitation">
        <UnitsDropdownButton
          text="Millimeters (mm)"
          isSelected={unitsOptions.precipitation === "mm"}
        />
        <UnitsDropdownButton
          text="Inches (in)"
          isSelected={unitsOptions.precipitation === "in"}
        />
      </UnitsDropdownOptions>
    </div>
  );
}

function Divider() {
  return <hr className="h-px border-none bg-neutral-600" />;
}
