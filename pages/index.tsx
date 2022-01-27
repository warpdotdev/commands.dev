import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, { siteTitle } from "../components/layout";

interface Workflow {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const WorkflowCard = ({ id, title, description, tags }: Workflow) => (
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

export default function Home({
  allWorkflowsData,
}: {
  allWorkflowsData: Workflow[];
}) {
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
        </div>
      </div>
      <div className="flex flex-wrap justify-around py-5">
        {allWorkflowsData.map((workflow) => WorkflowCard(workflow))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allWorkflowsData = getSortedWorkflowsData();
  return {
    props: {
      allWorkflowsData,
    },
  };
};
