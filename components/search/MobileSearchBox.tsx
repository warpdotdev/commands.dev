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
  const router = useRouter();
  useEffect(() => {
    const searchBar = document.querySelector(
      "#algolia_search"
    ) as HTMLInputElement;
    if (searchBar != null) {
      searchBar.focus();
    }
  }, []);

  // Populate search from ?query= URL parameter on initial load
  const [initialQueryApplied, setInitialQueryApplied] = useState(false);
  useEffect(() => {
    if (initialQueryApplied || !router.isReady) return;
    const urlQuery = router.query.query;
    if (typeof urlQuery === "string" && urlQuery.length > 0) {
      setSearchBarState(urlQuery);
      refine(urlQuery);
    }
    setInitialQueryApplied(true);
  }, [router.isReady, router.query.query, initialQueryApplied, refine]);

  const dynamicRoute = router.asPath;
  useEffect(() => {
    if (!initialQueryApplied) return;
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
          const value = e.currentTarget.value;
          refine(value);
          setSearchBarState(value);
          const url = new URL(window.location.href);
          if (value) {
            url.searchParams.set("query", value);
          } else {
            url.searchParams.delete("query");
          }
          window.history.replaceState({}, "", url.toString());
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
