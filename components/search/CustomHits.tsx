import { connectStateResults } from "react-instantsearch-dom";
import { SearchState, SearchResults } from "react-instantsearch-core";
import { WorkflowCard, WorkflowWrapper } from "../WorkflowCard";

function Hits({
  searchState,
  searchResults,
  children,
}: {
  searchState: SearchState;
  searchResults: SearchResults;
  children: React.ReactNode;
}) {
  if (!searchState.query || searchState.query.length == 0) {
    return <>{children}</>;
  } else if (searchResults?.hits.length > 0) {
    return (
      <WorkflowWrapper>
        {searchResults?.hits.map(({ slug, title, description, tags }) =>
          WorkflowCard({
            slug,
            title,
            description,
            tags: Array.isArray(tags) ? tags : [tags],
          })
        )}
      </WorkflowWrapper>
    );
  } else {
    return <p>No search results were found.</p>;
  }
}

export default connectStateResults(Hits);
