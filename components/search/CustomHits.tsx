import { useInstantSearch } from 'react-instantsearch';
import { WorkflowCards } from "../WorkflowCard";
import { Workflow } from "warp-workflows";

function Hits({ children }: { children: React.ReactNode }) {
  const { results } = useInstantSearch();

  if (!results.query || results.query.length == 0) {
    return <>{children}</>;
  } else if (results?.hits.length > 0) {
    const workflows: Workflow[] = results!.hits.map(
      ({ slug, name, description, tags }) =>
      ({
        slug,
        name,
        description,
        tags: Array.isArray(tags) ? tags : [tags],
      } as Workflow)
    );
    return <WorkflowCards workflows={workflows} isSearchResults={true} />;
  } else {
    return (
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-72 h-32 bg-[url('../img/no-search-light.png')] dark:bg-[url('../img/no-search-dark.png')]"></div>
          <div className="text-2xl text-null-search-text dark:text-white pt-4">
            No matching results
          </div>
        </div>
      </div>
    );
  }
}

export default Hits;
