import Link from "next/link";
import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { GitHubIcon } from "./icons/github";
import { LogoIcon } from "./icons/logo";
import { SearchIcon } from "./icons/search";
import CustomMobileSearchBox from "./search/CustomMobileSearchBox";
import CustomSearchBox from "./search/CustomSearchBox";

export default function NavBar() {
  let [mobileSearchBoxOpen, setMobileSearchBoxOpen] = useState(false);
  return (
    <nav className="sticky top-0 dark:bg-navbar-dark bg-navbar-light flex items-center justify-between shadow-xs py-4 md:px-[7rem] px-[1rem]">
      {!mobileSearchBoxOpen && (
        <div className="flex items-center text-white flex md:px-5">
          <a href="https://www.warp.dev">
            <LogoIcon />
          </a>
          <Link href="/">
            <a className="font-semibold text-xl text-black dark:text-white tracking-tighter">
              Commands
            </a>
          </Link>
        </div>
      )}
      <div className="hidden md:flex w-screen">
        <CustomSearchBox onBlurCallback={() => {}} isMobileSearch={false} />
      </div>
      <div className="flex md:hidden w-screen">
        {mobileSearchBoxOpen && (
          <CustomMobileSearchBox
            onCloseCallback={() => {
              setMobileSearchBoxOpen(false);
            }}
          />
        )}
      </div>
      {!mobileSearchBoxOpen && (
        <>
          <button
            className="h-9 items-center text-icon-light dark:text-icon-dark pl-3 pr-1 flex md:hidden"
            onClick={() => {
              setMobileSearchBoxOpen(true);
            }}
          >
            <SearchIcon />
          </button>
          <a className="pl-5 hidden md:flex" href="https://www.warp.dev/">
            <div className="bg-[url('../img/logo.png')] w-8 h-6"></div>
          </a>
          <a
            href="https://github.com/warpdotdev/commands.dev"
            className="text-icon-light dark:text-icon-dark hover:opacity-60 md:px-5 px-2"
          >
            <span className="sr-only">GitHub</span>
            <GitHubIcon />
          </a>
          <DarkModeToggle />
        </>
      )}
    </nav>
  );
}
