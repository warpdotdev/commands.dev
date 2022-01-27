import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Footer from "./footer";
import { Dispatch, SetStateAction, useState } from "react";
import NavBar from "./navbar";

export const siteTitle = "Commands.dev";

interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}
const SearchBar = ({ query, setQuery }: SearchBarProps) => (
  <span className="w-screen md:w-2/3 bg-sky-700 h-9 cursor-pointer border border-white/30 text-sm rounded-lg flex justify-content">
    <div className="flex items-center px-2">
      <Image src="/search.svg" alt="Search Icon" width={18} height={18} />
    </div>
    <input
      type="search"
      name="search"
      placeholder="Click or press 'Ctrl + K' to search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="flex-grow px-3 rounded-r-lg text-sm focus:outline-none"
    />
  </span>
);

export interface Workflow {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const WorkflowCard = ({ id, title, description, tags }: Workflow) => (
  <Link href={`/workflows/${id}`} key={id}>
    <a className="p-6 m-6 border border-white/30 w-96 rounded-md bg-white bg-opacity-10 hover:bg-opacity-30 active:bg-opacity-50">
      <h3 className="min-h-15 text-xl text-white font-bold h-16 line-clamp-2">
        {title}
      </h3>
      <p className="mt-4 text-gray-300 text-l line-clamp-4 h-20">
        {description}
      </p>
      <div className="flex">
        {tags.map((tag, id) => (
          <div
            key={id}
            className="rounded-full text-white bg-white bg-opacity-20 px-5 mr-2 text-sm flex flex-col justify-center text-center"
          >
            {tag}
          </div>
        ))}
      </div>
    </a>
  </Link>
);

const SearchResults = (query: string) => <p>Search Results Placeholder</p>;

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const [query, setQuery] = useState("");
  return (
    <div className="bg-sky-800 min-h-screen flex flex-col">
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
      <NavBar>{SearchBar({ query, setQuery })}</NavBar>
      <main className="grow">{query ? SearchResults(query) : children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}
