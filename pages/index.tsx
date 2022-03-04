import Head from "next/head";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, { siteTitle } from "../components/layout";
import { WorkflowCards } from "../components/WorkflowCard";
import { Workflow } from "warp-workflows";

export default function Home({
  allWorkflowsData,
}: {
  allWorkflowsData: Workflow[];
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="grow mx-[7rem]">
        <div className="bg-cover">
          <div className="py-10 px-3 max-w-2xl">
            <div className="md:text-3xl text-3xl font-bold text-black dark:text-white">
              Find commands at the speed of thought
            </div>
            <div className="text-xl font-normal mt-4 text-back dark:text-white">
              Commands.dev is a beautiful, searchable index of popular terminal
              commands for developers.
            </div>
          </div>
        </div>
        {WorkflowCards(allWorkflowsData)}
      </main>
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
