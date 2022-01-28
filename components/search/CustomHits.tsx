import {
  connectStateResults,
  SearchState,
  SearchResults,
} from "react-instantsearch-dom";
import { WorkflowCard, WorkflowWrapper } from "../WorkflowCard";

interface Hit {
  objectID: string;
  title: string;
  description: string;
  tags: string[];
}

function Hits({
  searchState,
  searchResults,
  children,
}: {
  searchState: SearchState;
  searchResults: SearchResults;
  children: React.ReactNode;
}) {
  if (!searchState.query || searchState.query.Length == 0) {
    return <>{children}</>;
  } else if (searchResults?.hits.length > 0) {
    return (
      <WorkflowWrapper>
        {searchResults?.hits.map(
          ({ objectID: id, title, description, tags }: Hit) =>
            WorkflowCard({ id, title, description, tags })
        )}
      </WorkflowWrapper>
    );
  } else {
    return <p>No search results were found.</p>;
  }
}

export default connectStateResults(Hits);
