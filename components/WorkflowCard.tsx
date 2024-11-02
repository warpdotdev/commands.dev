import Link from "next/link";
import WorkflowTags from "./WorkflowTags";
import { Workflow } from "warp-workflows";
import { useRouter } from "next/router";

import * as gtag from "../lib/gtag";

const CARD_STYLE =
  "p-5 m-2 border border-card-border-light dark:border-card-border-dark\
   w-[24rem] h-[12.5rem] rounded-sm bg-card-light dark:bg-card-dark \
   hover:bg-card-hover-light dark:hover:bg-card-hover-dark \
   active:bg-card-active-light dark:active:bg-card-active-dark";

type WorkflowCardProps = {
  workflow: Workflow;
  isSearchResult: boolean;
};

const WorkflowCard = ({ workflow, isSearchResult }: WorkflowCardProps) => {
  const { slug, name, description, tags, author } = workflow;
  const router = useRouter();
  const destination = `/workflows/${slug}`;

  // Be default we should use the <a> tag for the cards so search crawlers can find the URLs.
  const LinkCard = ({ children }: { children: React.ReactNode }) => (
    <Link href={destination} className={CARD_STYLE} onClick={trackClick}>
      {children}
    </Link>
  );

  // However, if the workflow card shows up in the Search Results,
  // we should use this stopgap to force a  page reload.
  const DivCard = ({ children }: { children: React.ReactNode }) => {
    const redirectAndForcePageReload = () => {
      // Stop gap for clicking on the workflow card while on the info screen of that same workflow
      // Ensures a page reload so the page actually renders and appears correctly
      // The downside of this is that the link will not be detected by the search crawlers.
      if (window.location.pathname === destination) {
        window.location.reload();
      } else {
        router.push(destination);
      }
    };

    return (
      <div
        className={CARD_STYLE}
        onClick={() => {
          trackClick();
          redirectAndForcePageReload();
        }}
      >
        {children}
      </div>
    );
  };

  const trackClick = () => {
    gtag.event({
      action: "click_workflow_card",
      category: "Workflow Cards",
      label: "Click Workflow Card",
      value: slug,
    });
  };

  const WrapperComponent = isSearchResult ? DivCard : LinkCard;

  return (
    <WrapperComponent>
      <div className="h-[8rem] text-left">
        <h2 className="text-xl text-black dark:text-white font-bold line-clamp-2 pb-1">
          {name}
        </h2>
        {description != undefined && (
          <p className="text-black dark:text-white text-sm line-clamp-2 pb-1">
            {description}
          </p>
        )}
        {author != undefined && (
          <p className="text-xs text-black dark:text-white">
            Authored by: {author}
          </p>
        )}
      </div>
      {tags !== undefined && <WorkflowTags tags={tags} />}
    </WrapperComponent>
  );
};

type WorkflowCardsProps = {
  workflows: Workflow[];
  isSearchResults: boolean;
};

export function WorkflowCards({
  workflows,
  isSearchResults,
}: WorkflowCardsProps) {
  return (
    <div className="flex flex-wrap justify-around pb-5">
      {workflows.map((workflow) => (
        <WorkflowCard
          workflow={workflow}
          isSearchResult={isSearchResults}
          key={workflow.slug}
        />
      ))}
    </div>
  );
}
