import Link from "next/link";
import WorkflowTags from "./WorkflowTags";
import { Workflow } from "warp-workflows";

const WorkflowCard = ({ slug, name, description, tags }: Workflow) => (
  <Link href={`/workflows/${slug}`} key={slug}>
    <a
      className="p-6 m-2 border border-card-border-light dark:border-card-border-dark w-[24rem]
      rounded-md bg-card-light dark:bg-card-dark hover:bg-card-hover-light dark:hover:bg-card-hover-dark active:bg-card-active-light
      dark:active:bg-card-active-dark"
    >
      <div className="h-32">
        <h3 className="text-xl text-black dark:text-white font-bold line-clamp-2 pb-2">
          {name}
        </h3>
        <p className="text-black dark:text-white text-sm line-clamp-3">
          {description}
        </p>
      </div>
      {tags !== undefined && WorkflowTags(tags)}
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
