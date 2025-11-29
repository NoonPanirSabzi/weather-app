import { useState } from "react";
import type {
  HourlyData,
  HourlyForecastData,
  weekDay,
  UnitsData,
} from "../../lib/types";
import { DaysDropdown } from "./DaysDropdown";
import { getWeekdayName } from "../../lib/utils";
import { HourlyForecastItem } from "./HourlyForecastItem";
import { celsiusToFahrenheit } from "../../lib/utils";

interface hourlyForecastProps {
  data: HourlyForecastData | null;
  units: UnitsData;
}

export function HourlyForecast({ data, units }: hourlyForecastProps) {
  const [activeDay, setActiveDay] = useState<weekDay>(() => {
    const currentDate = data?.time[0] ?? new Date(Date.now());
    return getWeekdayName(currentDate.getUTCDay());
  });

  // TODO return skeleton loading if data is not yet provided or fully loaded:
  if (!data) return;

  const START_DAY = getWeekdayName(data.time[0].getUTCDay());

  const HourlyData = data.time.reduce<Partial<Record<weekDay, HourlyData>>>(
    (acc, date, i) => {
      const day = getWeekdayName(date.getUTCDay());

      if (!acc[day]) {
        acc[day] = { hours: [], weatherCodes: [], temperatures: [] };
      }

      acc[day].hours.push(date.getUTCHours());
      acc[day].weatherCodes.push(data.weather_code![i]);
      acc[day].temperatures.push(data.temperature_2m![i]);

      return acc;
    },
    {},
  );

  return (
    <div className="flex h-[700px] flex-col gap-200 overflow-auto rounded-20 bg-neutral-800 px-200 py-250 text-neutral-0 tablet:p-300">
      <div className="flex items-center justify-between">
        <p className="text-preset-5">Hourly forecast</p>
        <DaysDropdown
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          today={START_DAY}
        />
      </div>
      {HourlyData[activeDay]?.hours.map((hour, i) => {
        return (
          <HourlyForecastItem
            hour={hour}
            key={i}
            temperature={Math.round(
              units.temperature === "F"
                ? celsiusToFahrenheit(HourlyData[activeDay]!.temperatures[i])
                : HourlyData[activeDay]!.temperatures[i],
            )}
            weatherCode={HourlyData[activeDay]!.weatherCodes[i]}
          />
        );
      })}
    </div>
  );
}
