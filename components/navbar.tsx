import Link from "next/link";
import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { GitHubIcon } from "./icons/github";
import { LogoIcon } from "./icons/logo";
import { SearchIcon } from "./icons/search";
import { WarpLogoIcon } from "./icons/warp_logo";
import MobileSearchBox from "./search/MobileSearchBox";
import CustomSearchBox from "./search/CustomSearchBox";
import * as gtag from "../lib/gtag";

export default function NavBar() {
  let [mobileSearchBoxOpen, setMobileSearchBoxOpen] = useState(false);
  return (
    <nav className="sticky top-0 dark:bg-navbar-dark bg-navbar-light flex items-center justify-between shadow-xs py-4 md:px-[7rem] px-[1rem]">
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
              onClick={(e) => {
                gtag.event({
                  action: "click_on_slash_landing_page",
                  category: "Click on Landing Page",
                  label: "Click on Landing Page via Command Slash",
                  value: window.location.pathname,
                });
              }}
            >
              <LogoIcon />
            </a>
            <Link href="/">
              <a className="font-semibold text-xl text-black dark:text-white tracking-tighter">
                Commands
              </a>
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
          >
            <SearchIcon />
          </button>
          <a
            className="pl-5 hidden md:flex"
            href="https://www.warp.dev/"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              gtag.event({
                action: "click_on_navbar_landing_page",
                category: "Click on Landing Page",
                label: "Click on Landing Page via NavBar",
                value: window.location.pathname,
              });
            }}
          >
            <WarpLogoIcon />
          </a>
          <a
            href="https://github.com/warpdotdev/commands.dev"
            target="_blank"
            rel="noreferrer"
            className="text-icon-light dark:text-icon-dark hover:opacity-60 md:px-5 px-2"
            onClick={(e) => {
              gtag.event({
                action: "click_on_navbar_github",
                category: "Click on GitHub",
                label: "Click on GitHub via NavBar",
                value: window.location.pathname,
              });
            }}
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
