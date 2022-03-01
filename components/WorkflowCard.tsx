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
    <a
      className="p-6 m-2 border border-card-border-light dark:border-card-border-dark w-96 
      rounded-md bg-card-light dark:bg-card-dark hover:bg-card-hover-light dark:hover:bg-card-hover-dark active:bg-card-active-light
      dark:active:bg-card-active-dark"
    >
      <div className="h-32">
        <h3 className="text-xl text-black dark:text-white font-bold line-clamp-2 pb-2">
          {title}
        </h3>
        <p className="text-black dark:text-white text-sm line-clamp-4">
          {description}
        </p>
      </div>
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
