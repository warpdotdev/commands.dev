import Head from "next/head";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import NavBar from "./navbar";
import Footer from "./footer";
import CustomSearchBox from "./search/CustomSearchBox";
import CustomHits from "./search/CustomHits";
import { useState } from "react";
import { url } from "inspector";

export const siteTitle = "Commands.dev";
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col m-w-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Commands.dev is a searchable, templated catalog of popular
          terminal commands curated from across the internet."
        />
        {/* TODO: Ask Shikhiu for Workflows image preview */}
        <meta
          property="og:image"
          content={`@Url.Content("../img/commands-preview.svg")`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <InstantSearch searchClient={searchClient} indexName="workflow_specs">
        <NavBar />
        {/* Show children if query is empty */}
        <main className="grow md:mx-[7rem] mx-[1rem]">
          <CustomHits>{children}</CustomHits>
        </main>
        <Footer />
      </InstantSearch>
    </div>
  );
}
