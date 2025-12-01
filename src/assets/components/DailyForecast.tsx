import { DailyForecastItem } from "./DailyForecastItem";
import type { DailyForecastData, UnitsData } from "../../lib/types";
import { celsiusToFahrenheit } from "../../lib/utils";

interface DailyForecastProps {
  data: DailyForecastData;
  units: UnitsData;
}

export function DailyForecast({ data, units }: DailyForecastProps) {
  return (
    <div>
      <p className="text-preset-5 mb-250 text-neutral-0">Daily forecast</p>
      <div className="grid grid-cols-3 gap-200 tablet:grid-cols-7">
        {data.map((d, i) => (
          <DailyForecastItem
            key={i}
            name={d.dayName}
            imgSrc={d.iconSrc}
            minTemp={Math.round(
              units.temperature === "F"
                ? celsiusToFahrenheit(d.minTemp)
                : d.minTemp,
            )}
            maxTemp={Math.round(
              units.temperature === "F"
                ? celsiusToFahrenheit(d.maxTemp)
                : d.maxTemp,
            )}
          />
        ))}
      </div>
    </div>
  );
}
