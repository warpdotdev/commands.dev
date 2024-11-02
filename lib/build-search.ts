// This script builds data for the Algolia index.
// It is run whenever the next js project is built. (It is called with the `postbuild` command in package.json.)
// Reference: https://www.contentful.com/blog/2021/07/02/add-algolia-instantsearch-to-nextjs-app/
import * as dotenv from "dotenv";
import { algoliasearch } from "algoliasearch";
import { getSortedWorkflowsData } from "./workflows";

(async function () {
  dotenv.config();

  try {
    const workflows = getSortedWorkflowsData();
    // Transform workflows to algolia object:
    // Set ObjectID and pick out relevant fields user wants to search on.
    // (User is unlikely to want to search on the arguments.)
    const transformed = workflows.map(
      ({ slug, name, description, tags, command }) => {
        return {
          objectID: slug,
          slug,
          name,
          description,
          tags,
          command,
        };
      }
    );

    // Initialize the client with environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY!
    );

    const indexName = "workflow_specs";

    // Clear all objects before rewriting to remove specs that were deleted
    // from the Algolia index.
    client.clearObjects({ indexName });

    // Save the objects
    const algoliaResponse = await client.saveObjects({ indexName, objects: transformed });

    const objectIdsAdded = algoliaResponse.reduce<string[]>((acc, response) => {
      return acc.concat(response.objectIDs);
    }, []);

    console.log(`🎉 Sucessfully added ${objectIdsAdded.length} records to Algolia search. Object IDs:\n${objectIdsAdded.join("\n")}`);
  } catch (error) {
    console.log(error);
  }
})();
