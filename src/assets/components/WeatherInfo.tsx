import bgTodaySmall from "../images/bg-today-small.svg";
import bgTodayLarge from "../images/bg-today-large.svg";
import iconSunny from "../images/icon-sunny.webp";
import iconStorm from "../images/icon-storm.webp";
import iconSnow from "../images/icon-snow.webp";
import iconRain from "../images/icon-rain.webp";
import iconPartlyCloudy from "../images/icon-partly-cloudy.webp";
import iconOvercast from "../images/icon-overcast.webp";
import iconFog from "../images/icon-fog.webp";
import iconDrizzle from "../images/icon-drizzle.webp";

interface WeatherInfoProps {
  location: string;
  date: string;
  temperature: string;
  weatherIcon: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  precipitation: string;
}

export function WeatherInfo({
  location,
  date,
  temperature,
  weatherIcon,
  feelsLike,
  humidity,
  wind,
  precipitation,
}: WeatherInfoProps) {
  const weatherIcons: Record<string, string> = {
    sunny: iconSunny,
    storm: iconStorm,
    snow: iconSnow,
    rain: iconRain,
    partlyCloudy: iconPartlyCloudy,
    overcast: iconOvercast,
    fog: iconFog,
    drizzle: iconDrizzle,
  };

  return (
    <div className="flex flex-col gap-y-250">
      <div className="relative w-fit">
        <picture>
          <source media="(min-width: 48rem)" srcSet={bgTodayLarge} />
          <img src={bgTodaySmall} alt="small background" />
        </picture>
        <div className="absolute top-500 left-1/2 flex w-max -translate-x-1/2 flex-col items-center gap-y-150">
          <p className="text-preset-4 text-neutral-0">{location}</p>
          <p className="text-preset-6 text-neutral-0">{date}</p>
        </div>
        <div className="absolute bottom-500 left-1/2 flex w-max -translate-x-1/2 items-center gap-x-150">
          <img
            src={weatherIcons[weatherIcon]}
            alt="today weather icon"
            className="w-[7.5rem]"
          />
          <p className="text-preset-1 text-neutral-0">{temperature}°</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-200">
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Feels Like</p>
          <p className="text-preset-3 text-neutral-0">{feelsLike}°</p>
        </div>
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Humidity</p>
          <p className="text-preset-3 text-neutral-0">{humidity}%</p>
        </div>
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Wind</p>
          <p className="text-preset-3 text-neutral-0">{wind} km/h</p>
        </div>
        <div className="flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Precipitation</p>
          <p className="text-preset-3 text-neutral-0">{precipitation} mm</p>
        </div>
      </div>
    </div>
  );
}
