interface DailyForecastItemProps {
  name: string;
  imgSrc: string;
  minTemp: number;
  maxTemp: number;
}

export function DailyForecastItem({
  name,
  imgSrc,
  minTemp,
  maxTemp,
}: DailyForecastItemProps) {
  return (
    <div className="flex flex-col items-center gap-y-200 rounded-12 border border-neutral-600 bg-neutral-800 px-125 py-200">
      <p className="text-preset-6 text-neutral-200">{name}</p>
      <img src={imgSrc} alt={`Weather on ${name}`} className="w-[3.75rem]" />
      <div className="flex w-full justify-between">
        <p className="text-preset-7 text-neutral-0">{maxTemp}°</p>
        <p className="text-preset-7 text-neutral-200">{minTemp}°</p>
      </div>
    </div>
  );
}
