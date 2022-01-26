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

      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.tsx
          </code>
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />

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
