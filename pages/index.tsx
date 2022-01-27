import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, {
  siteTitle,
  Workflow,
  WorkflowCard,
} from "../components/layout";

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
