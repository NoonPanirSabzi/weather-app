export function WeatherInfoSkeleton() {
  return (
    <div className="flex flex-col gap-y-250 desktop:gap-y-400">
      <div className="animate-pulse-skeleton flex h-[17.875rem] flex-col items-center justify-center gap-y-200 rounded-20 bg-neutral-800">
        <div className="flex gap-x-150">
          <div className="mt-050 h-150 w-150 rounded-full bg-neutral-0 opacity-80"></div>
          <div className="h-150 w-150 rounded-full bg-neutral-0 opacity-80"></div>
          <div className="mt-050 h-150 w-150 rounded-full bg-neutral-0 opacity-80"></div>
        </div>
        <p className="text-preset-6 text-neutral-200">Loading...</p>
      </div>
      <div className="grid grid-cols-2 gap-200 tablet:grid-cols-4 tablet:gap-250 desktop:gap-300">
        <div className="animate-pulse-skeleton flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Feels Like</p>
          <p className="text-preset-3 text-neutral-0">–</p>
        </div>
        <div className="animate-pulse-skeleton flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Humidity</p>
          <p className="text-preset-3 text-neutral-0">–</p>
        </div>
        <div className="animate-pulse-skeleton flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Wind</p>
          <p className="text-preset-3 text-neutral-0">–</p>
        </div>
        <div className="animate-pulse-skeleton flex flex-col gap-y-300 rounded-12 border border-neutral-600 bg-neutral-800 p-250">
          <p className="text-preset-6 text-neutral-200">Precipitation</p>
          <p className="text-preset-3 text-neutral-0">–</p>
        </div>
      </div>
    </div>
  );
}
