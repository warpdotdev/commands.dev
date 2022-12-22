import Head from "next/head";
import { GetStaticProps } from "next";

import { getSortedWorkflowsData } from "../lib/workflows";
import Layout, { siteTitle, siteDescription } from "../components/layout";
import { WorkflowCards } from "../components/WorkflowCard";
import { Workflow } from "warp-workflows";
import { WarpTextIcon } from "../components/icons/text_logo";
import * as gtag from "../lib/gtag";
import seedrandom from "seedrandom";
import DownloadWarpCard from "../components/DownloadWarpCard";

export default function Home({
  allWorkflowsData,
}: {
  allWorkflowsData: Workflow[];
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>
      <main className="grow">
        <div className="flex justify-between">
          <div className="bg-cover text-black dark:text-white">
            <div className="py-10 px-3 max-w-2xl">
              <h1 className="md:text-3xl text-3xl font-bold">
                Find commands at the speed of thought
              </h1>
              <div className="text-l font-normal mt-4 text-back dark:text-white max-w-2xl">
                {siteDescription}
              </div>
            </div>
          </div>
          <div className="py-10 px-3 max-w-2xl">
            <DownloadWarpCard />
          </div>
        </div>
        {<WorkflowCards workflows={allWorkflowsData} isSearchResults={false} />}
      </main>
    </Layout>
  );
}

const POPULAR_CATEGORIES = ["shell", "curl", "git"];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const containsPopularCategory = (tags?: [string]): Boolean => {
  return POPULAR_CATEGORIES.some((category) => tags?.includes(category));
};

// Sorts the commands by putting any command with a popular category (as defined
// in the above constant) first and other less "popular" commands afterwards. If both
// commands have a popular category, then we randomly pick what order they will be in.
const sortPopular = (workflow1: Workflow, workflow2: Workflow) => {
  const workflow1IsPopular = containsPopularCategory(workflow1.tags);
  const workflow2IsPopular = containsPopularCategory(workflow2.tags);

  if (workflow1IsPopular && workflow2IsPopular) {
    return getRandomInt(-1, 1);
  } else if (workflow1IsPopular) {
    return -1;
  } else if (workflow2IsPopular) {
    return 1;
  }

  return 0;
};

export const getStaticProps: GetStaticProps = async () => {
  seedrandom("warp!", { global: true });
  const allWorkflowsData = getSortedWorkflowsData().sort(sortPopular);
  return {
    props: {
      allWorkflowsData,
    },
  };
};
