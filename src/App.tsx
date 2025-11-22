import { useState } from "react";
import "./App.css";
import { Header } from "./assets/components/Header";
import { Search } from "./assets/components/Search";
import { WeatherInfo } from "./assets/components/WeatherInfo";
import type { LocationResult } from "./types";

function App() {
  const [city, setCity] = useState<LocationResult>();

  return (
    <div className="flex flex-col gap-600 p-200">
      <Header />
      <h1 className="text-preset-2 mx-auto max-w-[20.625rem] text-center text-neutral-0">
        How’s the sky looking today?
      </h1>
      <div className="flex flex-col gap-y-400">
        <Search setCity={setCity} />
        <WeatherInfo
          location="Berlin, Germany"
          date="Tuesday, Aug 5, 2025"
          temperature="20"
          weatherIcon="sunny"
          feelsLike="18"
          humidity="46"
          wind="14"
          precipitation="0"
        />
      </div>
    </div>
  );
}

export default App;
