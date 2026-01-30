import { useSearchBox } from 'react-instantsearch';
import React, { useEffect, useState } from "react";
import { CancelIcon } from "../icons/cancel";
import { useRouter } from "next/router";

interface MobileSearchBoxProps {
  refine: (value: string) => void;
  onCloseCallback: () => void;
}

function SearchBox({
  refine,
  onCloseCallback,
}: MobileSearchBoxProps) {
  const [searchBarState, setSearchBarState] = useState("");
  useEffect(() => {
    const searchBar = document.querySelector(
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
      <label htmlFor="algolia_search">Search For Commands</label>
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
        aria-label="Close Search"
      >
        <CancelIcon />
      </button>
    </div>
  );
}

interface ConnectedMobileSearchBoxProps {
  onCloseCallback: () => void;
}

function connectSearchBox(Component: React.ComponentType<MobileSearchBoxProps>) {
  const ConnectedSearchBox = (props: ConnectedMobileSearchBoxProps) => {
    const data = useSearchBox();

    return <Component refine={data.refine} onCloseCallback={props.onCloseCallback} />;
  };

  return ConnectedSearchBox;
}

export default connectSearchBox(SearchBox);
