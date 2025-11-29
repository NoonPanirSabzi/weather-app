import type { UnitsData } from "../../lib/types";
import { UnitsDropdownOptions } from "./UnitsDropdownOptions";
import { UnitsDropdownButton } from "./UnitsDropdownButton";
import { useState } from "react";

interface UnitsDropdownProps {
  unitsOptions: UnitsData;
  setUnitsOptions: (options: UnitsData) => void;
}

const METRIC_UNITS: Partial<UnitsData> = {
  temperature: "C",
  windSpeed: "kmh",
  precipitation: "mm",
};

const IMPERIAL_UNITS: Partial<UnitsData> = {
  temperature: "F",
  windSpeed: "mph",
  precipitation: "in",
};

export function UnitsDropdown({
  unitsOptions,
  setUnitsOptions,
}: UnitsDropdownProps) {
  const [unitsSys, setUnitsSys] = useState<"Imperial" | "Metric">(() => {
    // on mount, units system is calculated based on
    // options passed to the component
    let metricCriteria = 0;
    if (unitsOptions.temperature === "C") metricCriteria++;
    if (unitsOptions.windSpeed === "kmh") metricCriteria++;
    if (unitsOptions.precipitation === "mm") metricCriteria++;
    return metricCriteria > 1 ? "Metric" : "Imperial";
  });

  function updateOptions(updatedOptions: Partial<UnitsData>) {
    const updatedUnits = { ...unitsOptions, ...updatedOptions };
    setUnitsOptions(updatedUnits);

    // if units are in a new system, update units sytem
    if (
      updatedUnits.temperature === "C" &&
      updatedUnits.windSpeed === "kmh" &&
      updatedUnits.precipitation === "mm"
    ) {
      setUnitsSys("Metric");
    } else if (
      updatedUnits.temperature === "F" &&
      updatedUnits.windSpeed === "mph" &&
      updatedUnits.precipitation === "in"
    ) {
      setUnitsSys("Imperial");
    }
  }

  return (
    <div className="flex w-[13.375rem] flex-col gap-y-050 rounded-12 border border-neutral-600 bg-neutral-800 px-100 py-075 shadow-[0rem_0.5rem_1rem_0rem_rgba(2,1,44,0.32)]">
      <UnitsDropdownButton
        text={`Switch to ${unitsSys === "Metric" ? "Imperial" : "Metric"}`}
        isSelected={false}
        updateValues={unitsSys === "Metric" ? IMPERIAL_UNITS : METRIC_UNITS}
        updateHandler={updateOptions}
      />
      <UnitsDropdownOptions title="Temperature">
        <UnitsDropdownButton
          text="Celsius (°C)"
          isSelected={unitsOptions.temperature === "C"}
          updateValues={{ temperature: "C" }}
          updateHandler={updateOptions}
        />
        <UnitsDropdownButton
          text="Fahrenheit (°F)"
          isSelected={unitsOptions.temperature === "F"}
          updateValues={{ temperature: "F" }}
          updateHandler={updateOptions}
        />
      </UnitsDropdownOptions>
      <Divider />
      <UnitsDropdownOptions title="Wind Speed">
        <UnitsDropdownButton
          text="km/h"
          isSelected={unitsOptions.windSpeed === "kmh"}
          updateValues={{ windSpeed: "kmh" }}
          updateHandler={updateOptions}
        />
        <UnitsDropdownButton
          text="mph"
          isSelected={unitsOptions.windSpeed === "mph"}
          updateValues={{ windSpeed: "mph" }}
          updateHandler={updateOptions}
        />
      </UnitsDropdownOptions>
      <Divider />
      <UnitsDropdownOptions title="Precipitation">
        <UnitsDropdownButton
          text="Millimeters (mm)"
          isSelected={unitsOptions.precipitation === "mm"}
          updateValues={{ precipitation: "mm" }}
          updateHandler={updateOptions}
        />
        <UnitsDropdownButton
          text="Inches (in)"
          isSelected={unitsOptions.precipitation === "in"}
          updateValues={{ precipitation: "in" }}
          updateHandler={updateOptions}
        />
      </UnitsDropdownOptions>
    </div>
  );
}

function Divider() {
  return <hr className="h-px border-none bg-neutral-600" />;
}
