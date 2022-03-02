import Link from "next/link";
import Image from "next/image";
import { GitHubIcon } from "./icons/github";

export default function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="sticky top-0 dark:bg-card-dark bg-card-light flex items-center justify-between shadow-xs p-4">
      <div className="flex items-center text-white hidden md:flex pl-3">
        <a className="px-2" href="https://www.warp.dev">
          <Image
            src="/favicon.ico"
            width={15}
            height={15}
            alt="Warp landing page"
          />
        </a>
        <Link href="/">
          <a className="font-semibold text-xl text-black dark:text-white tracking-tighter">
            Commands
          </a>
        </Link>
      </div>
      {children}
      <a
        href="https://github.com/warpdotdev/commands.dev"
        className="hidden md:flex text-icon-light dark:text-icon-dark hover:opacity-60"
      >
        <span className="sr-only">GitHub</span>
        <GitHubIcon />
      </a>
    </nav>
  );
}
