interface UnitsDropdownOptionsProps {
  title: string;
  children: React.ReactNode;
}

export function UnitsDropdownOptions({
  children,
  title,
}: UnitsDropdownOptionsProps) {
  return (
    <div>
      <p className="text-preset-8 px-100 pt-075 pb-100 text-neutral-300">
        {title}
      </p>
      <div className="flex flex-col gap-y-050">{children}</div>
    </div>
  );
}
