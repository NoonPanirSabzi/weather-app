import bgTodaySmall from "../images/bg-today-small.svg";
import bgTodayLarge from "../images/bg-today-large.svg";
import type { WeatherInfoData } from "../../types";
import { getWeatherIcon } from "../../lib/utils";

interface WeatherInfoProps {
  weatherInfo: WeatherInfoData | null;
}

export function WeatherInfo({ weatherInfo }: WeatherInfoProps) {
  // TODO: return Skeleton loading if city is chosen but weatherInfo is not fetched yet
  if (!weatherInfo) return;

  return (
    <div className="flex flex-col gap-y-250">
      <div className="relative w-fit">
        <picture>
          <source media="(min-width: 48rem)" srcSet={bgTodayLarge} />
          <img src={bgTodaySmall} alt="small background" />
        </picture>
        <div className="absolute top-400 left-1/2 flex w-max -translate-x-1/2 flex-col items-center gap-y-150">
          <p className="text-preset-4 max-w-[300px] text-center text-neutral-0">
            {weatherInfo.location}
          </p>
          <p className="text-preset-6 text-neutral-0">{weatherInfo.date}</p>
        </div>
        <div className="absolute bottom-200 left-1/2 flex w-max -translate-x-1/2 items-center gap-x-250">
          <img
            src={getWeatherIcon(weatherInfo.weatherCode)}
            alt="today weather icon"
            className="w-[7.5rem]"
          />
          <p className="text-preset-1 text-neutral-0">
            {weatherInfo.temperature}°
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-200">
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Feels Like</p>
          <p className="text-preset-3 text-neutral-0">
            {weatherInfo.feelsLike}°
          </p>
        </div>
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Humidity</p>
          <p className="text-preset-3 text-neutral-0">
            {weatherInfo.humidity}%
          </p>
        </div>
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Wind</p>
          <p className="text-preset-3 text-neutral-0">
            {weatherInfo.windSpeed} km/h
          </p>
        </div>
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Precipitation</p>
          <p className="text-preset-3 text-neutral-0">
            {weatherInfo.precipitation} mm
          </p>
        </div>
      </div>
    </div>
  );
}
