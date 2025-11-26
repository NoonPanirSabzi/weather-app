import type { weekDay } from "../types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import iconSunny from "../assets/images/icon-sunny.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";

/**
 * Merges Tailwind CSS classes and resolves conflicts using `clsx` and `tailwind-merge`.
 * @param inputs - A list of `ClassValue` (strings, objects, or arrays) to be merged.
 * @returns A single string containing the merged and optimized Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object into a human-readable string (e.g., "Tuesday, Aug 5, 2025").
 * @param date - The Date object to format.
 * @returns A formatted date string.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const ICON_MAP = [
  { icon: iconSunny, codes: [0, 1] },
  { icon: iconPartlyCloudy, codes: [2] },
  { icon: iconOvercast, codes: [3] },
  { icon: iconFog, codes: [45, 48] },
  { icon: iconDrizzle, codes: [51, 52, 53, 54, 55, 56, 57] },
  { icon: iconRain, codes: [61, 62, 63, 64, 65, 66, 67, 80, 81, 82] },
  { icon: iconSnow, codes: [71, 72, 73, 74, 75, 76, 77, 85, 86] },
  { icon: iconStorm, codes: [95, 96, 97, 98, 99] },
];

/**
 * Returns the appropriate weather icon source based on the WMO weather code.
 * WMO Weather Interpretation Codes (WW) are standardized codes used to describe current weather conditions.
 * See: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
 * @param weatherCode The WMO weather code.
 * @returns The source path for the corresponding weather icon.
 */
export function getWeatherIcon(weatherCode: number): string {
  const condition = ICON_MAP.find((map) => map.codes.includes(weatherCode));
  return condition ? condition.icon : iconSunny;
}

export const WEEKDAYS: weekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Returns name of the weekday based on it's number. This helper function is
 * supposed to be used to convert the number returnd by getDay() and getUTCDay() methods on Date objects to weekday name.
 * @param weekDayNum A number between 0 and 6 (both inclusive) representing the day of week. assuming first day of the week(number 0) is Sunday
 * @returns Name of the weekday
 */
export function getWeekdayName(weekDayNum: number): weekDay {
  // HACK: input assumes a week starts from Sunday
  // but we don't want to change order of days in WEEKDAYS array
  // so this formula solves the problem
  return WEEKDAYS[(weekDayNum + 6) % 7];
}
