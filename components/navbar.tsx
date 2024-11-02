import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { LogoIcon } from "./icons/logo";
import { SearchIcon } from "./icons/search";
import MobileSearchBox from "./search/MobileSearchBox";
import CustomSearchBox from "./search/CustomSearchBox";
import * as gtag from "../lib/gtag";

export default function NavBar() {
  let [mobileSearchBoxOpen, setMobileSearchBoxOpen] = useState(false);
  const mobileSearchButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!!mobileSearchBoxOpen) {
      return;
    }
    mobileSearchButton?.current?.focus();
  }, [mobileSearchBoxOpen])
  return (
    <div className="sticky top-0 dark:bg-navbar-dark bg-navbar-light shadow-xs pb-4" role="banner">
      <div className="flex-col">
        <a
          href="https://www.warp.dev/blog/using-workflows-and-commands-dev-to-remember-commands-we-often-forget"
          target="_blank"
          rel="noreferrer"
        >
          <div className="bg-navbar-banner text-black dark:text-white mb-3 text-sm py-2 md:px-[8.5rem] px-[1rem]">
            Click here to learn more about Commands.dev from a blog post written
            by one of our engineers!
          </div>
        </a>
        <div className="flex items-center justify-between md:px-[7rem] px-[1rem]">
          {mobileSearchBoxOpen ? (
            <MobileSearchBox
              onCloseCallback={() => {
                setMobileSearchBoxOpen(false);
              }}
            />
          ) : (
            <>
              <div className="flex items-center text-white flex md:px-5">
                <a
                  href="https://www.warp.dev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    gtag.event({
                      action: "click_on_slash_landing_page",
                      category: "Click on Landing Page",
                      label: "Click on Landing Page via Command Slash",
                      value: window.location.pathname,
                    });
                  }}
                  aria-label="Warp Home"
                >
                  <LogoIcon />
                </a>
                <Link
                  href="/"
                  className="font-semibold text-xl text-black dark:text-white tracking-tighter"
                  aria-label="Commands Home">
                  Commands
                </Link>
              </div>
              <div className="hidden md:flex w-screen">
                <CustomSearchBox />
              </div>
              <button
                className="h-9 items-center text-icon-light dark:text-icon-dark pl-3 pr-1 flex flex-row-reverse md:hidden grow"
                onClick={() => {
                  setMobileSearchBoxOpen(true);
                }}
                aria-label="Search"
                ref={mobileSearchButton}
              >
                <SearchIcon />
              </button>
              <nav>
                <Link href="/about" className="hover:opacity-60 md:px-7 px-2">
                  <span className="text-l font-normal mt-4 text-back dark:text-white">
                    About
                  </span>
                </Link>
                <a
                  href="https://github.com/warpdotdev/workflows#contributing"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-60 md:pr-7 pr-2"
                  onClick={(_) => {
                    gtag.event({
                      action: "click_on_navbar_github",
                      category: "Click on GitHub",
                      label: "Click on GitHub via NavBar",
                      value: window.location.pathname,
                    });
                  }}
                >
                  <span className="text-l font-normal mt-4 text-back dark:text-white">
                    Contribute
                  </span>
                </a>
              </nav>
              <DarkModeToggle />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
