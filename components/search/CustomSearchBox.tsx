import { connectSearchBox } from "react-instantsearch-dom";
import { Dispatch, SetStateAction } from "react";
import { SearchIcon } from "../icons/search";
import { useHotkeys } from "react-hotkeys-hook";

function SearchBox({ refine }: { refine: Dispatch<SetStateAction<string>> }) {
  useHotkeys("ctrl+k", () => {
    if (document != null) {
      let searchBar = document.querySelector(
        "#algolia_search"
      ) as HTMLInputElement;
      if (searchBar != null) {
        searchBar.focus();
      }
    }
  });
  return (
    <div className="dark:bg-card-dark bg-card-light w-screen h-9 cursor-pointer rounded-sm flex items-center">
      <div className="h-9 flex items-center text-icon-light dark:text-icon-dark pl-3 pr-1 dark:bg-card-dark bg-search-bar-light">
        <SearchIcon />
      </div>
      <input
        id="algolia_search"
        type="search"
        placeholder="Ctrl+ K"
        onChange={(e) => refine(e.currentTarget.value)}
        className="grow h-9 cursor-pointer rounded-sm text-sm focus:outline-none dark:bg-card-dark bg-search-bar-light placeholder:opacity-50 dark:text-white px-2"
      />
    </div>
  );
}

export default connectSearchBox(SearchBox);
