export function DailyForecastSkeleton() {
  const items = Array(7).fill(null);
  return (
    <div>
      <p className="text-preset-5 mb-250 text-neutral-0">Daily forecast</p>
      <div className="grid grid-cols-3 gap-200 tablet:grid-cols-7">
        {items.map((_, i) => (
          <div
            key={i}
            className="animate-pulse-skeleton h-[165px] rounded-12 border border-neutral-600 bg-neutral-800"
          ></div>
        ))}
      </div>
    </div>
  );
}
