export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface WeatherInfoData {
  location: string;
  date: string;
  temperature: number;
  weatherCode: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export type DailyForecastData = {
  dayName: string;
  iconSrc: string;
  minTemp: number;
  maxTemp: number;
}[];

export interface HourlyForecastData {
  time: Date[];
  temperature_2m: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
}

export interface HourlyData {
  hours: number[];
  weatherCodes: number[];
  temperatures: number[];
}

export type weekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
