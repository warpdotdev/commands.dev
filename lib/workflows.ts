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

export function getAllWorkflowCategories() {
  const categories = new Set<string>();
  getSortedWorkflowsData().forEach((workflow) => {
    if (workflow.tags != undefined) {
      workflow.tags.forEach((tag) => categories.add(tag.toLowerCase()));
    }
  });

  return Array.from(categories).map((tag) => {
    return {
      params: {
        id: tag,
      },
    };
  });
}

export function getWorkflowsByCategory(category: string): Workflow[] {
  const lowerCategory = category.toLowerCase();
  return Array.from(WORKFLOWS.values()).filter(
    (workflow) =>
      workflow.tags != undefined &&
      workflow.tags.some((tag) => tag.toLowerCase() === lowerCategory)
  );
}
