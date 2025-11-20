import { useEffect, useState } from "react";
import searchIcon from "../images/icon-search.svg";

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const serachCity = async (name: string, signal: AbortSignal) => {
    const APIurl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=4&language=en&format=json`;

    try {
      const response = await fetch(APIurl, { signal });

      if (!response.ok) {
        // TODO: show error in the UI
        throw new Error("something went wrong");
      }

      const data: { results?: [] } = await response.json();

      if (!data.results) {
        // TODO: show nothing found in the UI
        console.log("nothing found");
        return;
      }

      // TODO: pass serach resulst to Search dropdown component to show
      // them to the user
      console.log(data.results);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      if (err instanceof Error) {
        console.log("something went wrong");
      }
    }
  };

  /**
   * user inputs less than 2 charachters will be ignored and won't trigger
   * a re-render becausee search API doesn't return a result for queries
   * less than 2 charachters so we don't check them
   */
  const handlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    if (userInput.length < 2) return;
    setSearchQuery(userInput);
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
    serachCity(debouncedQuery, controller.signal);

    return () => {
      // if previous pending fetch request exists, abort it before re-render
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col gap-y-150">
      <div className="flex gap-x-200 rounded-12 bg-neutral-800 px-300 py-200">
        <img src={searchIcon} alt="search icon" className="w-250" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="text-preset-5-medium text-neutral-200"
          onInput={handlInput}
        />
      </div>
      <button
        type="button"
        className="text-preset-5-medium rounded-12 bg-blue-500 px-300 py-200 text-neutral-0"
      >
        Search
      </button>
    </div>
  );
}
