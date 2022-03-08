import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { GitHubIcon } from "./icons/github";
import { LogoIcon } from "./icons/logo";

export default function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="sticky top-0 dark:bg-navbar-dark bg-navbar-light flex items-center justify-between shadow-xs py-4 px-[7rem]">
      <div className="flex items-center text-white hidden md:flex px-5">
        <a href="https://www.warp.dev">
          <LogoIcon />
        </a>
        <Link href="/">
          <a className="font-semibold text-xl text-black dark:text-white tracking-tighter">
            Commands
          </a>
        </Link>
      </div>
      {children}
      <a className="pl-5" href="https://www.warp.dev/">
        <div className="bg-[url('../img/logo.png')] w-8 h-6"></div>
      </a>
      <a
        href="https://github.com/warpdotdev/commands.dev"
        className="hidden md:flex text-icon-light dark:text-icon-dark hover:opacity-60 px-5"
      >
        <span className="sr-only">GitHub</span>
        <GitHubIcon />
      </a>
      <DarkModeToggle />
    </nav>
  );
}
