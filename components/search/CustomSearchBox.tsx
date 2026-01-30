import { useSearchBox } from 'react-instantsearch';
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons/search";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";

interface SearchBoxProps {
  refine: (value: string) => void;
}

function SearchBox({ refine }: SearchBoxProps) {
  const [searchBarState, setSearchBarState] = useState("");
  useHotkeys("ctrl+k", () => {
    if (document != null) {
      const searchBar = document.querySelector(
        "#algolia_search"
      ) as HTMLInputElement;
      if (searchBar != null) {
        searchBar.focus();
      }
    }
  });

  const dynamicRoute = useRouter().asPath;
  useEffect(() => {
    refine(""); // When the route changes - reset the search state
    setSearchBarState("");
  }, [dynamicRoute, refine]);

  return (
    <div className="dark:bg-card-dark bg-card-light grow h-9 cursor-pointer rounded-sm items-center flex">
      <div className="h-9 flex items-center text-icon-light dark:text-icon-dark pl-3 pr-1 dark:bg-card-dark bg-search-bar-light">
        <SearchIcon />
      </div>
      <input
        id={"algolia_search"}
        type="search"
        aria-label="Search for commands"
        value={searchBarState}
        placeholder={"Ctrl + K"}
        onChange={(e) => {
          refine(e.currentTarget.value);
          setSearchBarState(e.currentTarget.value);
        }}
        className="grow h-9 cursor-pointer rounded-sm text-sm focus:outline-none dark:bg-card-dark bg-search-bar-light placeholder:opacity-50 dark:text-white px-2"
      />
    </div>
  );
}

function connectSearchBox(Component: React.ComponentType<SearchBoxProps>) {
  const ConnectedSearchBox = () => {
    const data = useSearchBox();

    return <Component refine={data.refine} />;
  };

  return ConnectedSearchBox;
}

export default connectSearchBox(SearchBox);
