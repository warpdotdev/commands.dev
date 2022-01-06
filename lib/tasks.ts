import fs from "fs";
import path from "path";

const tasksDirectory = path.join(process.cwd(), "tasks");

// Used in home page to list all tasks
export function getSortedTasksData() {
  // Get file names under /tasks
  const fileNames = fs.readdirSync(tasksDirectory);

  // TODO: Sort tasks by date or by Featured.
  const allTasksData = fileNames.map((fileName) => {
    // Remove ".json" from file name to get id, which will be used for the link to each task page
    const id = fileName.replace(/\.json$/, "");

    // Read task spec object from file
    const fullPath = path.join(tasksDirectory, fileName);
    const jsonString = fs.readFileSync(fullPath, "utf8");
    const taskObject = JSON.parse(jsonString);

    // Combine the data with the id
    return {
      id,
      ...taskObject,
    };
  });

  return allTasksData;
}
