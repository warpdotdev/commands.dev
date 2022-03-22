import { connectSearchBox } from "react-instantsearch-dom";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CancelIcon } from "../icons/cancel";
import { useRouter } from "next/router";

function SearchBox({
  refine,
  onCloseCallback,
}: {
  refine: Dispatch<SetStateAction<string>>;
  onCloseCallback: () => void;
}) {
  let [searchBarState, setSearchBarState] = useState("");
  useEffect(() => {
    let searchBar = document.querySelector(
      "#algolia_search"
    ) as HTMLInputElement;
    if (searchBar != null) {
      searchBar.focus();
    }
  }, []);

  const dynamicRoute = useRouter().asPath;
  useEffect(() => {
    refine(""); // When the route changes - reset the search state
    setSearchBarState("");
  }, [dynamicRoute, refine]);

  return (
    <div className="dark:bg-card-dark bg-search-bar-light grow h-9 cursor-pointer rounded-sm items-center flex text-black dark:text-white">
      <input
        id={"algolia_search"}
        type="search"
        placeholder={"Search commands"}
        value={searchBarState}
        onChange={(e) => {
          refine(e.currentTarget.value);
          setSearchBarState(e.currentTarget.value);
        }}
        className="grow h-9 cursor-pointer text-sm focus:outline-none bg-inherit placeholder:opacity-50 text-black dark:text-white px-2"
      />
      <button
        className="h-9 flex items-center text-icon-light dark:text-icon-dark pr-3 pl-1 bg-inherit"
        onClick={onCloseCallback}
      >
        <CancelIcon />
      </button>
    </div>
  );
}

export default connectSearchBox(SearchBox);
