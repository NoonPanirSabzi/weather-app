import searchIcon from "../images/icon-search.svg";

export function Search() {
  return (
    <div className="flex flex-col gap-y-150">
      <div className="flex gap-x-200 rounded-12 bg-neutral-800 px-300 py-200">
        <img src={searchIcon} alt="search icon" className="w-250" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="text-preset-5-medium text-neutral-200"
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
