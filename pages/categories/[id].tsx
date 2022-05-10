import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import {
  getAllWorkflowCategories,
  getWorkflowsByCategory,
} from "../../lib/workflows";
import Layout from "../../components/layout";
import { WorkflowCards } from "../../components/WorkflowCard";

export default function WorkflowPage({ category }: { category: string }) {
  let workflows = getWorkflowsByCategory(category);

  // This shows up as a description when our page is surfaced in Google Search results.
  // It does not increase our ranking but it does increase our click-through rate.
  let descriptionInMetaTag = `Popular \`${category}\`terminal commands. Example commands include: ${workflows
    .slice(0, 3)
    .map((workflow) => workflow.name)
    .join(", ")}`;

  return (
    <Layout>
      <Head>
        <title>{category}</title>
        <meta name="description" content={descriptionInMetaTag} />
      </Head>
      <div className="text-black dark:text-white pt-10 pb-5 px-3 max-w-2xl">
        <h1 className="md:text-3xl text-3xl font-bold">
          {`Popular \`${category}\` terminal commands`}
        </h1>
      </div>
      <main className="grow pt-3">
        {<WorkflowCards workflows={workflows} isSearchResults={false} />}
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllWorkflowCategories();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.id as string;
  return {
    props: {
      category,
    },
  };
};
