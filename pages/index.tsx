import Head from "next/head";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, { siteTitle } from "../components/layout";
import { WorkflowCards } from "../components/WorkflowCard";
import { Workflow } from "warp-workflows";
import { WarpTextIcon } from "../components/icons/text_logo";

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
            <div className="pt-2 w-[5.45rem]">
              <a href="https://www.warp.dev/">
                <WarpTextIcon />
              </a>
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
