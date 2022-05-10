import Head from "next/head";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import NavBar from "./navbar";
import Footer from "./footer";
import CustomHits from "./search/CustomHits";

export const siteTitle = "Commands.dev - Find commands at the speed of thought";
export const siteDescription =
  "Commands.dev is a searchable, templated catalog of popular terminal commands curated from across the internet.";
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />

        <meta name="description" content={siteDescription} />
        {/* TODO: Ask Shikhiu for Workflows image preview */}
        <meta property="og:image" content={`/commands-preview.svg`} />
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
