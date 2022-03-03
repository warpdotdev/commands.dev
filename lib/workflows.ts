import * as fs from "fs";
import * as path from "path";
import { WORKFLOWS, Workflow } from "warp-workflows";

// Used in home page to list all workflows
export function getSortedWorkflowsData(): Workflow[] {
  return Array.from(WORKFLOWS.values());
}

export function getAllWorkflowIds() {
  return Array.from(WORKFLOWS.keys()).map((slug) => {
    return {
      params: {
        id: slug,
      },
    };
  });
}

// Gets the relevant workflow based on id
export function getWorkflowData(id: string): Workflow | undefined {
  return WORKFLOWS.get(id);
}
