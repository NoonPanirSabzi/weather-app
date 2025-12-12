import { useEffect, useState, useRef } from "react";
import searchIcon from "../images/icon-search.svg";
import type { LocationResult } from "../../lib/types";
import { SearchDropDown } from "./SearchDropdown";
import { useOnClickOutside } from "../../lib/hooks/useOnClickOutside";
import { useMediaQuery } from "../../lib/hooks/useMediaQuery";
import { cn } from "../../lib/utils";

interface SearchData {
  results?: LocationResult[];
}

interface SearchProps {
  setCity: (city: LocationResult) => void;
  setError: (err: boolean) => void;
  resetAppData: () => void;
}

export function Search({ setCity, setError, resetAppData }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<null | LocationResult[]>(
    null,
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const isMobileOrTablet = useMediaQuery("(max-width: 48em)");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchContainerRef, () => {
    if (showDropdown) setShowDropdown(false);
    if (showOverlay) setShowOverlay(false);
  });

  const resetSearchAndApp = () => {
    resetAppData();
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchResults(null);
    setShowDropdown(false);
    setIsSearchLoading(false);
    setShowOverlay(false);
  };

  const searchCity = async (name: string, signal: AbortSignal) => {
    const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
    const RESULTS_COUNT = 4;
    const API_URL = `${GEOCODING_BASE_URL}?name=${name}&count=${RESULTS_COUNT}&language=en&format=json`;

    try {
      const response = await fetch(API_URL, { signal });

      if (!response.ok) {
        throw new Error();
      }

      const data: SearchData = await response.json();

      if (!data.results) {
        // SearchDropdown will show <nothing found>
        // because we set <results> to <null> here and <searchLoading>
        // to <false> in finally block
        setSearchResults(null);
        setIsSearchLoading(false);
        return;
      }

      setSearchResults(data.results);
      setIsSearchLoading(false);
    } catch (err) {
      // do nothing if the error is caused by aborting previeus fetch request
      if (err instanceof Error && err.name === "AbortError") return;
      // show visual error
      if (err instanceof Error) {
        setError(true);
      }
    }
  };

  /**
   * search API doesn't return a result for queries
   * less than 2 charachters so we don't check them
   */
  const handlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchQuery(userInput);
    if (userInput.length < 2) {
      setShowDropdown(false);
      // HACK: if a user types more than 2 charachters, then remove each
      // charachter with backspace, debouncedQuery should reset so dropdownmenu
      // doesn't show up with click on search input container
      setDebouncedQuery("");
      return;
    }
    setShowDropdown(true);
    setIsSearchLoading(true);
  };

  useEffect(() => {
    // do not run effect on inital mount
    if (searchQuery.length < 2) return;

    const timeoutID = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [searchQuery]);

  useEffect(() => {
    // do not run effect on inital mount
    if (debouncedQuery.length < 2) return;

    const controller = new AbortController();
    searchCity(debouncedQuery, controller.signal);

    return () => {
      // if previous pending fetch request exists, abort it before re-render
      controller.abort();
    };
  }, [debouncedQuery]);

  const handleInputWrapperClick = () => {
    if (isMobileOrTablet) {
      setShowOverlay(true);
    }
    if (debouncedQuery.length > 1) {
      setShowDropdown(true);
    }
  };

  const searchContent = (
    <div
      className={cn(
        "relative mx-auto flex w-full flex-col gap-y-150",
        showOverlay ? "max-w-[45rem]" : "max-w-full",
      )}
      ref={searchContainerRef}
    >
      <div className="relative" onClick={handleInputWrapperClick}>
        <label htmlFor="search-input">
          <img
            src={searchIcon}
            alt="search icon"
            className="absolute top-1/2 left-300 w-250 -translate-y-1/2 cursor-pointer"
          />
        </label>
        <input
          name="search city input"
          id="search-input"
          type="text"
          placeholder="Search for a place..."
          className="text-preset-5-medium w-full rounded-12 bg-neutral-800 py-200 ps-[3.75rem] pe-300 text-neutral-0 outline-offset-3 outline-neutral-0 placeholder:text-neutral-200 placeholder:transition placeholder:duration-300 hover:bg-neutral-700 focus:placeholder:opacity-0 focus-visible:outline-3"
          onInput={handlInput}
          value={searchQuery}
        />
      </div>
      {showDropdown && (
        <div className="absolute -bottom-125 z-10 w-full translate-y-full">
          <SearchDropDown
            isSearchLoading={isSearchLoading}
            items={searchResults}
            setCity={setCity}
            resetSearchAndApp={resetSearchAndApp}
          />
        </div>
      )}
    </div>
  );

  if (showOverlay) {
    return (
      <div className="fixed inset-0 z-20 bg-neutral-900/75 px-200 pt-400 backdrop-blur-[4px]">
        {searchContent}
      </div>
    );
  }

  return <div className="mx-auto w-full max-w-[45rem]">{searchContent}</div>;
}
