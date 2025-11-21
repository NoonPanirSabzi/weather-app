import type { LocationResult } from "../../types";
import loadingIcon from "../images/icon-loading.svg";
import type { ReactNode } from "react";

interface SearchDropDownProps {
  items: LocationResult[] | null;
  isSearchLoading: boolean;
}

export function SearchDropDown({
  items,
  isSearchLoading,
}: SearchDropDownProps) {
  // decide on what to show
  let content: ReactNode;
  if (isSearchLoading) {
    content = (
      <div className="flex items-center gap-x-125 rounded-8 px-100 py-125">
        <img
          src={loadingIcon}
          alt="Search in progress icon"
          className="animate-spin"
        />
        <p>Search in progress</p>
      </div>
    );
  } else if (items === null) {
    content = (
      <div className="rounded-8 px-100 py-125">No search result found!</div>
    );
  } else {
    content = items.map((location) => {
      // filter out undefined or null parts
      const parts = [
        location.name,
        location.admin1,
        location.admin2,
        location.admin3,
        location.admin4,
        location.country,
      ].filter(Boolean);
      const name = parts.join(", ");
      return (
        <div className="rounded-8 px-100 py-125" key={location.id}>
          {name}
        </div>
      );
    });
  }

  // show the menu
  return (
    <div className="text-preset-7 flex w-full flex-col gap-y-050 rounded-12 border border-neutral-700 bg-neutral-800 p-100 text-neutral-0">
      {content}
    </div>
  );
}
