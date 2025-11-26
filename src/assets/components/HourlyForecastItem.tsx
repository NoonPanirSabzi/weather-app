import { getWeatherIcon } from "../../lib/utils";

interface HourlyForecastItemProps {
  hour: number;
  temperature: number;
  weatherCode: number;
}

export function HourlyForecastItem({
  hour,
  temperature,
  weatherCode,
}: HourlyForecastItemProps) {
  return (
    <div className="flex items-center justify-between rounded-8 border border-neutral-600 bg-neutral-700 py-125 ps-150 pe-200">
      <div className="flex items-center gap-100">
        <img
          src={getWeatherIcon(weatherCode)}
          alt={`Weather at ${hour}`}
          className="w-[2.5rem]"
        />
        <p className="text-preset-5-medium">
          {hour === 0
            ? "12 AM"
            : hour === 12
              ? "12 PM"
              : hour < 12
                ? `${hour} AM`
                : `${hour - 12} PM`}
        </p>
      </div>
      <p className="text-preset-7">{Math.round(temperature)}°</p>
    </div>
  );
}
