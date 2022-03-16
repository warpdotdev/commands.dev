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
  return (
    <Layout>
      <Head>
        <title>{category}</title>
      </Head>
      <main className="grow pt-3">
        {WorkflowCards(getWorkflowsByCategory(category))}
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
