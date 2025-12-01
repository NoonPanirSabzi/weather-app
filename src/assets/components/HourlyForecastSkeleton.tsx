import dropdownIcon from "../images/icon-dropdown.svg";

export function HourlyForecastSkeleton() {
  const items = Array(24).fill(null);
  return (
    <div className="flex h-[700px] flex-col gap-200 overflow-auto rounded-20 bg-neutral-800 px-200 py-250 text-neutral-0 tablet:p-300">
      <div className="flex items-center justify-between">
        <p className="text-preset-5">Hourly forecast</p>
        <div className="animate-pulse-skeleton flex gap-x-150 rounded-8 bg-neutral-600 px-200 py-100">
          <p className="text-preset-7 text-neutral-0">–</p>
          <img src={dropdownIcon} alt="dropdownIcon" />
        </div>
      </div>
      {items.map((_, i) => (
        <div
          key={i}
          className="animate-pulse-skeleton min-h-[60px] w-full rounded-8 border border-neutral-600 bg-neutral-700"
        ></div>
      ))}
    </div>
  );
}
