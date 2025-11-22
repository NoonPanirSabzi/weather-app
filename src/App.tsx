import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./assets/components/Header";
import { Search } from "./assets/components/Search";
import { WeatherInfo } from "./assets/components/WeatherInfo";
import type { LocationResult, weatherInfoData } from "./types";
import { fetchWeatherApi } from "openmeteo";
import { formatDate } from "./lib/utils";

function App() {
  // App data
  const [city, setCity] = useState<LocationResult | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<weatherInfoData | null>(null);

  useEffect(() => {
    // don't run effect on inital mount or when city is not specified
    if (!city) return;

    const getWeatherData = async () => {
      const params = {
        latitude: city.latitude,
        longitude: city.longitude,
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
        const responses = await fetchWeatherApi(url, params, 3, 3, 4);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;

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
          precipitation: weatherData.current.precipitation,
        });
      } catch (err) {
        // TODO: show Visual Error with retry button to the user
        console.log(err);
      }

    };

    getWeatherData();

    // TODO write the return function of this hook if needed for cleanup
  }, [city]);

  // TODO: complete Units component and apply unit to other components
  // You don't need to fetch in other units, convert units with a util function
  // for presentation yourself

  return (
    <div className="flex flex-col gap-600 p-200">
      <Header />
      <h1 className="text-preset-2 mx-auto max-w-[20.625rem] text-center text-neutral-0">
        How’s the sky looking today?
      </h1>
      <div className="flex flex-col gap-y-400">
        <Search setCity={setCity} />
        <WeatherInfo weatherInfo={weatherInfo} />
      </div>
    </div>
  );
}

export default App;
