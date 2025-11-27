import logo from "../images/logo.svg";
import { Units } from "./Units";
import type { UnitsData } from "../../lib/types";

interface HeaderProps {
  unitsOptions: UnitsData;
  setUnitsOptions: (options: UnitsData) => void;
}

export function Header({ unitsOptions, setUnitsOptions }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <img
        src={logo}
        className="w-[8.625rem] tablet:w-auto"
        alt="Weather Now logo"
      />
      <Units unitsOptions={unitsOptions} setUnitsOptions={setUnitsOptions} />
    </div>
  );
}
