import Head from "next/head";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, { siteTitle } from "../components/layout";
import {
  WorkflowCard,
  Workflow,
  WorkflowWrapper,
} from "../components/WorkflowCard";

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
      <WorkflowWrapper>
        {allWorkflowsData.map((workflow: Workflow) => WorkflowCard(workflow))}
      </WorkflowWrapper>
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
