import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GetStaticProps } from "next";

import { getSortedTasksData } from "../lib/tasks";
import Layout, { siteTitle } from "../components/layout";

export default function Home({
  allTasksData,
}: {
  allTasksData: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }[];
}) {
  // Note that we are only extracting select fields from the spec data since
  // users are most likely going to search for metadata rather than the command contents.

  const [query, setQuery] = useState("");

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="bg-[url('../img/header-background.png')] bg-cover">
        <div className="p-10 max-w-2xl">
          <div className="md:text-3xl text-3xl font-bold text-white">
            Find commands at the speed of thought
          </div>
          <div className="text-xl font-normal mt-4 text-white">
            Commands.dev is a beautiful, searchable index of popular terminal
            commands for developers.
          </div>
          <div className="mt-4 h-12 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {allTasksData
            .filter(
              ({ title, description, tags }) =>
                title.toLowerCase().includes(query.toLowerCase()) ||
                description.toLowerCase().includes(query.toLowerCase()) ||
                tags.find((tag) =>
                  tag.toLowerCase().includes(query.toLowerCase())
                )
            )
            .map(({ id, title, description, tags }) => (
              <a
                href={`/tasks/${id}`}
                key={id}
                className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
              >
                <h3 className="text-2xl font-bold">{title} &rarr;</h3>
                <p className="mt-4 text-xl">{description}</p>
                <p className="mt-4 text-sm">{tags.join(", ")}</p>
              </a>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allTasksData = getSortedTasksData();
  return {
    props: {
      allTasksData,
    },
  };
};
