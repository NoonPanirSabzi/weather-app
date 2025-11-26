import { useEffect, useState, useRef } from "react";
import searchIcon from "../images/icon-search.svg";
import type { LocationResult } from "../../types";
import { SearchDropDown } from "./SearchDropdown";

interface SearchData {
  results?: LocationResult[];
}

interface SearchProps {
  setCity: (city: LocationResult) => void;
}

export function Search({ setCity }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<null | LocationResult[]>(
    null,
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const resetSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchResults(null);
    setShowDropdown(false);
    setIsSearchLoading(false);
  };

  const searchCity = async (name: string, signal: AbortSignal) => {
    const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
    const RESULTS_COUNT = 4;
    const API_URL = `${GEOCODING_BASE_URL}?name=${name}&count=${RESULTS_COUNT}&language=en&format=json`;

    try {
      const response = await fetch(API_URL, { signal });

      if (!response.ok) {
        setShowDropdown(false);
        setIsSearchLoading(false);
        // TODO: show error in the UI and remove next line
        // and remove logs and unnecassary codes in catch block
        throw new Error("something went wrong");
      }

      const data: SearchData = await response.json();

      if (!data.results) {
        // SearchDropdown will show <nothing found>
        // because we set results to null here
        setSearchResults(null);
        setIsSearchLoading(false);
        return;
      }

      setSearchResults(data.results);
      setIsSearchLoading(false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      if (err instanceof Error) {
        console.log("something went wrong");
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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="relative mx-auto flex w-full max-w-[45rem] flex-col gap-y-150"
      ref={searchContainerRef}
    >
      <div
        className="flex gap-x-200 rounded-12 bg-neutral-800 px-300 py-200"
        onClick={() => {
          if (debouncedQuery.length > 1) setShowDropdown(true);
        }}
      >
        <img src={searchIcon} alt="search icon" className="w-250" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="text-preset-5-medium text-neutral-200"
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
            resetSearch={resetSearch}
          />
        </div>
      )}
    </div>
  );
}
