import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export const siteTitle = "Commands.dev";

const SearchBar = () => (
  <span className="w-screen md:w-2/3 h-9 cursor-pointer border border-white/30 text-sm rounded-full flex justify-content">
    <div className="flex items-center pl-2">
      <Image src="/search.svg" alt="Search Icon" width={18} height={18} />
    </div>
    <input
      type="search"
      name="search"
      placeholder="Click or press '⌘K' to search"
      className="flex-grow px-3 text-slate-100 bg-sky-900 rounded-l-full rounded-r-full text-sm focus:outline-none"
    />
  </span>
);

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className="bg-sky-800">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Commands.dev: a beautiful, searchable index of popular terminal commands for developers"
        />
        {/* TODO: Ask Shikhiu for Workflows image preview */}
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <nav className="sticky top-0 bg-sky-900 flex items-center justify-between shadow-xs p-4">
        <div className="flex items-center text-white hidden md:flex">
          <a className="px-2" href="https://www.warp.dev">
            <Image
              src="/favicon.ico"
              width={15}
              height={15}
              alt="Warp landing page"
            />
          </a>
          <Link href="/">
            <a className="font-semibold text-xl tracking-tighter">
              Commands.dev
            </a>
          </Link>
        </div>
        <SearchBar />
        <div className="hidden md:flex opacity-80 hover:opacity-100">
          <a href="https://github.com/warpdotdev/commands.dev">
            <Image
              src="/github.png"
              width={28}
              height={28}
              alt="Commands.dev Github Repo"
            />
          </a>
        </div>
      </nav>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image
            src="/vercel.svg"
            width={50}
            height={50}
            alt="Vercel Logo"
            className="h-4 ml-2"
          />
        </a>
      </footer>
    </div>
  );
}
