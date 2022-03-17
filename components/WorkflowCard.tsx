import Link from "next/link";
import WorkflowTags from "./WorkflowTags";
import { Workflow } from "warp-workflows";
import { useRouter } from "next/router";

const WorkflowCard = ({ slug, name, description, tags, author }: Workflow) => {
  const router = useRouter();
  const onClickCard = () => {
    const destination = `/workflows/${slug}`;
    // Stop gap for clicking on the workflow card while on the info screen of that name workflow
    // Ensures a page reload so the page actually appears correctly
    if (window.location.pathname === destination) {
      window.location.reload();
    } else {
      router.push(destination);
    }
  };

  return (
    <div
      className="p-5 m-2 border border-card-border-light dark:border-card-border-dark w-[24rem] h-[12.5rem]
    rounded-sm bg-card-light dark:bg-card-dark hover:bg-card-hover-light dark:hover:bg-card-hover-dark active:bg-card-active-light
    dark:active:bg-card-active-dark"
      onClick={onClickCard}
    >
      <div className="h-[8rem] text-left">
        <h3 className="text-xl text-black dark:text-white font-bold line-clamp-2 pb-1">
          {name}
        </h3>
        {description != undefined && (
          <p className="text-black dark:text-white text-sm line-clamp-2 pb-1">
            {description}
          </p>
        )}
        {author != undefined && (
          <p className="text-xs text-black dark:text-white">
            Created by: {author}
          </p>
        )}
      </div>
      {tags !== undefined && <WorkflowTags tags={tags} />}
    </div>
  );
};

export function WorkflowCards(workflows: Workflow[]) {
  return (
    <div className="flex flex-wrap justify-around pb-5">
      {workflows.map((workflow) => WorkflowCard(workflow))}
    </div>
  );
}
