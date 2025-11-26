import { DailyForecastItem } from "./DailyForecastItem";
import type { DailyForecastData } from "../../types";

interface DailyForecastProps {
  data: DailyForecastData | null;
}

export function DailyForecast({ data }: DailyForecastProps) {
  // TODO return skeleton loading if data is not present or loading
  if (!data) return;

  return (
    <div>
      <p className="text-preset-5 mb-250 text-neutral-0">Daily forecast</p>
      <div className="grid grid-cols-3 gap-200 tablet:grid-cols-7">
        {data.map((d, i) => (
          <DailyForecastItem
            key={i}
            name={d.dayName}
            imgSrc={d.iconSrc}
            minTemp={d.minTemp}
            maxTemp={d.maxTemp}
          />
        ))}
      </div>
    </div>
  );
}
