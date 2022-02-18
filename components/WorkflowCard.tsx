import Link from "next/link";
import WorkflowTags from "./WorkflowTags";

export interface Workflow {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

const WorkflowCard = ({ slug, title, description, tags }: Workflow) => (
  <Link href={`/workflows/${slug}`} key={slug}>
    <a className="hover:bg-opacity-30 active:bg-opacity-50 p-6 m-6 border border-card-border-light dark:border-card-border-dark w-96 rounded-md bg-card-light dark:bg-card-dark">
      <h3 className="h-15 text-xl text-black dark:text-white font-bold line-clamp-2">
        {title}
      </h3>
      <p className="mt-1 text-black dark:text-white text-l line-clamp-4 h-24">
        {description}
      </p>
      {WorkflowTags(tags)}
    </a>
  </Link>
);

export function WorkflowCards(workflows: Workflow[]) {
  return (
    <div className="flex flex-wrap justify-around py-5">
      {workflows.map((workflow) => WorkflowCard(workflow))}
    </div>
  );
}
