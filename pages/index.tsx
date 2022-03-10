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
      <main className="grow">
        <div className="bg-cover text-black dark:text-white">
          <div className="py-10 px-3 max-w-2xl">
            <div className="md:text-3xl text-3xl font-bold">
              Find commands at the speed of thought
            </div>
            <div className="text-l font-normal mt-4 text-back dark:text-white max-w-[27rem]">
              Commands.dev is a beautiful, searchable index of popular terminal
              commands for developers.
            </div>
            <div className="text-xs pt-2">Powered by</div>
            <a className="pt-2" href="https://www.warp.dev/">
              <div className="bg-[url('../img/text-logo-light.png')] dark:bg-[url('../img/text-logo-dark.png')] w-[5.45rem] h-5" />
            </a>
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
