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
  const router = useRouter();
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
