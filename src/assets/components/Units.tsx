import settingsIcon from "../images/icon-units.svg";
import iconDropDown from "../images/icon-dropdown.svg";
import iconDropUp from "../images/icon-dropup.svg";

export function Units() {
  return (
    <div className="flex w-fit gap-x-075 rounded-6 bg-neutral-800 px-125 py-100">
      <img
        src={settingsIcon}
        alt="units settings icon"
        className="w-[0.875rem]"
      />
      <p className="text-preset-8 text-neutral-0">Units</p>
      <img
        src={iconDropDown}
        alt="drop down settings icon"
        className="w-[0.5625rem]"
      />
    </div>
  );
}
