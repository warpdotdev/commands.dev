import Link from "next/link";
import WorkflowTags from "./WorkflowTags";
import { Workflow } from "warp-workflows";

const WorkflowCard = ({ slug, name, description, tags, author }: Workflow) => (
  <Link href={`/workflows/${slug}`} key={slug} passHref={true}>
    <a
      className="p-5 m-2 border border-card-border-light dark:border-card-border-dark w-[24rem] h-[12.5rem]
      rounded-sm bg-card-light dark:bg-card-dark hover:bg-card-hover-light dark:hover:bg-card-hover-dark active:bg-card-active-light
      dark:active:bg-card-active-dark"
    >
      <div className="h-[8rem]">
        <h3 className="text-xl text-black dark:text-white font-bold line-clamp-2 pb-1">
          {name}
        </h3>
        {description != undefined && (
          <p className="text-black dark:text-white text-sm line-clamp-2 pb-1">
            {description}
          </p>
        )}
        {author != undefined && (
          <p className="text-xs text-black dark:text-white ">
            Created by: {author}
          </p>
        )}
      </div>
      {tags !== undefined && WorkflowTags(tags)}
    </a>
  </Link>
);

export function WorkflowCards(workflows: Workflow[]) {
  return (
    <div className="flex flex-wrap justify-around pb-5">
      {workflows.map((workflow) => WorkflowCard(workflow))}
    </div>
  );
}
