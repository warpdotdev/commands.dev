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
  let descriptionInMetaTag = `\'${category}\' popular terminal commands. Example commands include: ${workflows
    .slice(0, 3)
    .map((workflow) => workflow.name)
    .join(", ")}`;

  console.log(descriptionInMetaTag);
  return (
    <Layout>
      <Head>
        <title>{category}</title>
        <meta name="description" content={descriptionInMetaTag} />
      </Head>
      <main className="grow pt-3">{WorkflowCards(workflows)}</main>
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
