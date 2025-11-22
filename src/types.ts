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

export interface weatherInfoData {
  location: string;
  date: string;
  temperature: number;
  weatherCode: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}
