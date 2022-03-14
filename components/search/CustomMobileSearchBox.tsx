import { connectSearchBox } from "react-instantsearch-dom";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { CancelIcon } from "../icons/cancel";

function SearchBox({
  refine,
  onCloseCallback,
}: {
  refine: Dispatch<SetStateAction<string>>;
  onCloseCallback: () => void;
}) {
  useEffect(() => {
    let searchBar = document.querySelector(
      "#algolia_search_mobile"
    ) as HTMLInputElement;
    if (searchBar != null) {
      searchBar.focus();
    }
  }, []);

  return (
    <div className="dark:bg-card-dark bg-search-bar-light grow h-9 cursor-pointer rounded-sm items-center flex text-black dark:text-white">
      <input
        id={"algolia_search_mobile"}
        type="search"
        placeholder={"Search commands"}
        onChange={(e) => refine(e.currentTarget.value)}
        className="grow h-9 cursor-pointer text-sm focus:outline-none dark:bg-card-dark bg-search-bar-light placeholder:opacity-50 text-black dark:text-white px-2"
      />
      <button
        className="h-9 flex items-center text-icon-light dark:text-icon-dark pr-3 pl-1 dark:bg-card-dark bg-search-bar-light"
        onClick={onCloseCallback}
      >
        <CancelIcon />
      </button>
    </div>
  );
}

export default connectSearchBox(SearchBox);
