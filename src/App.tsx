import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./assets/components/Header";
import { Search } from "./assets/components/Search";
import { WeatherInfo } from "./assets/components/WeatherInfo";
import type {
  LocationResult,
  WeatherInfoData,
  DailyForecastData,
  HourlyForecastData,
  UnitsData,
} from "./lib/types";
import { fetchWeatherApi } from "openmeteo";
import { formatDate, getWeatherIcon } from "./lib/utils";
import { DailyForecast } from "./assets/components/DailyForecast";
import { HourlyForecast } from "./assets/components/HourlyForecast";
import errorIcon from "./assets/images/icon-error.svg";
import retryIcon from "./assets/images/icon-retry.svg";
import { cn } from "./lib/utils";
import { WeatherInfoSkeleton } from "./assets/components/WeatherInfoSkeleton";
import { DailyForecastSkeleton } from "./assets/components/DailyForecastSkeleton";
import { HourlyForecastSkeleton } from "./assets/components/HourlyForecastSkeleton";
// images to preload after initial render
import useImagePreloader from "./lib/hooks/useImagePreloader";
import preLoadImg1 from "./assets/images/bg-today-small.svg";
import preLoadImg2 from "./assets/images/bg-today-large.svg";
import preLoadImg3 from "./assets/images/icon-drizzle.webp";
import preLoadImg4 from "./assets/images/icon-fog.webp";
import preLoadImg5 from "./assets/images/icon-overcast.webp";
import preLoadImg6 from "./assets/images/icon-partly-cloudy.webp";
import preLoadImg7 from "./assets/images/icon-rain.webp";
import preLoadImg8 from "./assets/images/icon-sunny.webp";
import preLoadImg9 from "./assets/images/icon-snow.webp";
import preLoadImg10 from "./assets/images/icon-storm.webp";

function App() {
  // App data
  const [city, setCity] = useState<LocationResult | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecastData | null>(
    null,
  );
  const [hourlyForecast, setHourlyForecast] =
    useState<HourlyForecastData | null>(null);
  const [unitsOptions, setUnitsOptions] = useState<UnitsData>({
    temperature: "C",
    windSpeed: "kmh",
    precipitation: "mm",
  });
  const [error, setError] = useState<boolean>(false);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  function resetAppData() {
    setCity(null);
    setWeatherInfo(null);
    setDailyForecast(null);
    setHourlyForecast(null);
    setShowSkeleton(true);
  }

  useEffect(() => {
    // don't run effect on inital mount or when city is not specified
    if (!city) return;

    const getWeatherData = async () => {
      const params = {
        latitude: city.latitude,
        longitude: city.longitude,
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        hourly: ["weather_code", "temperature_2m"],
        current: [
          "temperature_2m",
          "precipitation",
          "weather_code",
          "wind_speed_10m",
          "apparent_temperature",
          "relative_humidity_2m",
        ],
        timezone: city.timezone,
      };
      const url = "https://api.open-meteo.com/v1/forecast";

      try {
        const responses = await fetchWeatherApi(url, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            precipitation: current.variables(1)!.value(),
            weather_code: current.variables(2)!.value(),
            wind_speed_10m: current.variables(3)!.value(),
            apparent_temperature: current.variables(4)!.value(),
            relative_humidity_2m: current.variables(5)!.value(),
          },
          hourly: {
            time: Array.from(
              {
                length:
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                  hourly.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(hourly.time()) +
                    i * hourly.interval() +
                    utcOffsetSeconds) *
                    1000,
                ),
            ),
            weather_code: hourly.variables(0)!.valuesArray(),
            temperature_2m: hourly.variables(1)!.valuesArray(),
          },
          daily: {
            time: Array.from(
              {
                length:
                  (Number(daily.timeEnd()) - Number(daily.time())) /
                  daily.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(daily.time()) +
                    i * daily.interval() +
                    utcOffsetSeconds) *
                    1000,
                ),
            ),
            weather_code: daily.variables(0)!.valuesArray(),
            temperature_2m_max: daily.variables(1)!.valuesArray(),
            temperature_2m_min: daily.variables(2)!.valuesArray(),
          },
        };
        // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information

        // Update our Weather Data
        setWeatherInfo({
          location: city.name + ", " + city.country,
          date: formatDate(weatherData.current.time),
          temperature: Math.round(weatherData.current.temperature_2m),
          weatherCode: weatherData.current.weather_code,
          feelsLike: Math.round(weatherData.current.apparent_temperature),
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: Math.round(weatherData.current.wind_speed_10m),
          precipitation: Math.round(weatherData.current.precipitation),
        });

        // calculate forecast data:
        const fcDays = weatherData.daily.time.map((t) =>
          t.toString().slice(0, 3),
        );
        const fcMinTemps = Array.from(
          weatherData.daily.temperature_2m_min!,
        ).map((t) => Math.round(t));
        const fcIconsSrc = Array.from(weatherData.daily.weather_code!).map(
          (c) => getWeatherIcon(c),
        );
        const fcMaxTemps = Array.from(
          weatherData.daily.temperature_2m_max!,
        ).map((t) => Math.round(t));

        // set daily forecast data:
        setDailyForecast(
          fcDays.map((day, index) => {
            return {
              dayName: day,
              iconSrc: fcIconsSrc[index],
              minTemp: fcMinTemps[index],
              maxTemp: fcMaxTemps[index],
            };
          }),
        );

        // set hourly forecast data:
        setHourlyForecast(weatherData.hourly);
      } catch (err) {
        if (err instanceof Error) setError(true);
      }
    };

    getWeatherData();

    // TODO write the return function of this hook if needed for cleanup
  }, [city]);

  // preload images on initial mount
  const imgUrlsToPreload = [
    preLoadImg1,
    preLoadImg2,
    preLoadImg3,
    preLoadImg4,
    preLoadImg5,
    preLoadImg6,
    preLoadImg7,
    preLoadImg8,
    preLoadImg9,
    preLoadImg10,
  ];
  const allImagesAreLoaded = useImagePreloader(imgUrlsToPreload);
  const isDataLoading = !weatherInfo;
  const isLoading = isDataLoading || !allImagesAreLoaded;
  const SKELETON_DELAY = 500; // ms

  useEffect(() => {
    let timer: number;
    if (!isLoading) {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, SKELETON_DELAY);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);
  return (
    <div className="mx-auto flex max-w-[76rem] flex-col gap-600 p-200 tablet:p-300 desktop:gap-y-800 desktop:px-0 desktop:pt-600 desktop:pb-1000">
      <Header unitsOptions={unitsOptions} setUnitsOptions={setUnitsOptions} />
      {!error && (
        <>
          <h1 className="text-preset-2 mx-auto max-w-[20.625rem] text-center text-neutral-0 tablet:max-w-[30rem] desktop:max-w-full">
            How’s the sky looking today?
          </h1>
          <div className="flex flex-col gap-y-400 desktop:grid desktop:grid-cols-3 desktop:gap-x-400 desktop:gap-y-600">
            <div className="desktop:col-span-3">
              <Search
                setCity={setCity}
                setError={setError}
                resetAppData={resetAppData}
              />
            </div>
            {city && (
              <>
                <div
                  className={cn(
                    "flex flex-col gap-y-400 desktop:col-span-2 desktop:justify-between",
                    showSkeleton &&
                      "invisible absolute -top-[9999px] -left-[9999px]",
                  )}
                >
                  {weatherInfo && (
                    <WeatherInfo
                      weatherInfo={weatherInfo}
                      units={unitsOptions}
                    />
                  )}
                  {dailyForecast && (
                    <DailyForecast data={dailyForecast} units={unitsOptions} />
                  )}
                </div>
                <div
                  className={cn(
                    showSkeleton &&
                      "invisible absolute -top-[9999px] -left-[9999px]",
                  )}
                >
                  {hourlyForecast && (
                    <HourlyForecast
                      data={hourlyForecast}
                      key={city.id}
                      units={unitsOptions}
                    />
                  )}
                </div>
                {showSkeleton && (
                  <>
                    <div className="flex flex-col gap-y-400 desktop:col-span-2 desktop:justify-between">
                      <WeatherInfoSkeleton />
                      <DailyForecastSkeleton />
                    </div>
                    <HourlyForecastSkeleton />
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
      {error && (
        <div className="flex flex-col items-center gap-y-300 pt-500 text-center">
          <img src={errorIcon} alt="error Icon" className="w-[2.625rem]" />
          <h2 className="text-preset-2 text-neutral-0">Something went wrong</h2>
          <p className="text-preset-5-medium text-neutral-200">
            We couldn’t connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button
            onClick={() => {
              setError(false);
              resetAppData();
            }}
            type="button"
            className="flex cursor-pointer gap-x-125 rounded-8 bg-neutral-800 px-200 py-150 hover:bg-neutral-700"
          >
            <img src={retryIcon} alt="retry button icon" />
            <p className="text-preset-7 text-neutral-0">Retry</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
