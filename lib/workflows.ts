import * as fs from "fs";
import * as path from "path";

const workflowsDirectory = path.join(process.cwd(), "workflows");

// Used in home page to list all workflows
export function getSortedWorkflowsData() {
  // Get file names under /workflows
  const fileNames = fs.readdirSync(workflowsDirectory);

  // TODO: Sort workflows by date or by Featured.
  const allWorkflowsData = fileNames.map((fileName) => {
    // Remove ".json" from file name to get id, which will be used for the link to each workflow page
    const id = fileName.replace(/\.json$/, "");

    // Read workflow spec object from file
    const fullPath = path.join(workflowsDirectory, fileName);
    const jsonString = fs.readFileSync(fullPath, "utf8");
    const workflowObject = JSON.parse(jsonString);

    // Combine the data with the id
    return {
      id,
      ...workflowObject,
    };
  });

  return allWorkflowsData;
}

export function getAllWorkflowIds() {
  const fileNames = fs.readdirSync(workflowsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ""),
      },
    };
  });
}

// Gets the relevant workflow based on id
export function getWorkflowData(id: string) {
  const fullPath = path.join(workflowsDirectory, `${id}.json`);
  const jsonString = fs.readFileSync(fullPath, "utf8");
  const workflowObject = JSON.parse(jsonString);

  // Combine the data with the id
  return {
    id,
    ...workflowObject,
  };
}
