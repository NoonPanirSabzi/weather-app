import logo from "../images/logo.svg";
import { Units } from "./Units";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <img
        src={logo}
        className="w-[8.625rem] tablet:w-auto"
        alt="Weather Now logo"
      />
      <Units />
    </div>
  );
}
