import logo from "../images/logo.svg";
import { Units } from "./Units";
import type { UnitsData } from "../../lib/types";

interface HeaderProps {
  unitsOptions: UnitsData;
  setUnitsOptions: (options: UnitsData) => void;
}

export function Header({ unitsOptions, setUnitsOptions }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <a href="/">
        <img
          src={logo}
          className="w-[8.625rem] tablet:w-auto"
          alt="Weather Now logo"
        />
      </a>
      <Units unitsOptions={unitsOptions} setUnitsOptions={setUnitsOptions} />
    </header>
  );
}
