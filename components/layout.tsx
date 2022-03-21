import Head from "next/head";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import NavBar from "./navbar";
import Footer from "./footer";
import CustomHits from "./search/CustomHits";

export const siteTitle = "Commands.dev";
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
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteDescription} />
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
