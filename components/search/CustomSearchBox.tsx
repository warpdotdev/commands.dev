import { connectSearchBox } from "react-instantsearch-dom";
import { Dispatch, SetStateAction } from "react";
import { SearchIcon } from "../icons/search";

function SearchBox({ refine }: { refine: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="dark:bg-card-dark bg-card-light w-screen h-9 cursor-pointer rounded-sm flex items-center">
      <div className="h-9 flex items-center text-icon-light dark:text-icon-dark px-3 dark:bg-card-dark bg-card-light">
        <SearchIcon />
      </div>
      <input
        id="algolia_search"
        type="search"
        placeholder="Command + K"
        onChange={(e) => refine(e.currentTarget.value)}
        className="grow h-9 cursor-pointer rounded-sm text-sm focus:outline-none dark:bg-card-dark bg-card-light placeholder:opacity-40 dark:text-white"
      />
    </div>
  );
}

export default connectSearchBox(SearchBox);
