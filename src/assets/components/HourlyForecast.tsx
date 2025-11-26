import { useState } from "react";
import type { HourlyForecastData, weekDay } from "../../types";
import { DaysDropdown } from "./DaysDropdown";
import { getWeekdayName } from "../../lib/utils";

interface hourlyForecastProps {
  data: HourlyForecastData | null;
}

export function HourlyForecast({ data }: hourlyForecastProps) {
  const [activeDay, setActiveDay] = useState<weekDay>(() => {
    const currentDate = data?.time[0] ?? new Date(Date.now());
    return getWeekdayName(currentDate.getDay());
  });

  // TODO return skeleton loading if data is not yet provided or fully loaded:
  if (!data) return;

  return (
    <div className="flex flex-col gap-200 rounded-20 bg-neutral-800 px-200 py-250 text-neutral-0">
      <div className="flex items-center justify-between">
        <p className="text-preset-5">Hourly forecast</p>
        <DaysDropdown activeDay={activeDay} setActiveDay={setActiveDay} />
      </div>
    </div>
  );
}
