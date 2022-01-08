import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";

import { getAllTaskIds, getTaskData } from "../../lib/tasks";
import Layout from "../../components/layout";

interface ObjectType {
  [name: string]: string;
}

export default function Task({
  taskData,
}: {
  taskData: {
    title: string;
    description: string;
    tags: string[];
    arguments: { name: string; placeholder: string; id: string }[];
    command: string;
  };
}) {
  // Initializes a key-value map of <Argument Id>: Empty String
  const initialValues: ObjectType = taskData.arguments.reduce(
    (a, v) => ({ ...a, [v.id]: "" }),
    {}
  );
  const [values, setValues] = useState(initialValues);

  // Updates the value in the map corresponding to the Argument Id key
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // `populateCommand` replaces variables in the `command` with the values if they exist, or with the placeholder
  // otherwise. Example: The command "cat $FILE_NAME.json | jq '.$FIELD'" will become "cat simple.json | jq '.name'"
  // if the values the user supplied are: {FILE_NAME: "simple", FIELD: "name"}
  // TODO: Fix bug where user input is overwritten. If the user inputs "$FIELD" for $FILE_NAME, then that input will
  // be overwritten by the value for $FIELD. We shall leave this bug here until design is finalized for the task page.
  const populateCommand = (command: string) => {
    taskData.arguments.forEach((argument) => {
      let regex = new RegExp(`\\$${argument.id}`, "g");
      if (!values[argument.id] || values[argument.id] == "") {
        command = command.replace(regex, argument.placeholder);
      } else {
        command = command.replace(regex, values[argument.id]);
      }
    });
    return command;
  };

  return (
    <Layout>
      <Head>
        <title>{taskData.title}</title>
      </Head>
      <article>
        <h1>{taskData.title}</h1>
        <p>{taskData.description}</p>
        {taskData.tags.join(", ")}
        {taskData.arguments.map((argument) => (
          <div key={argument.id}>
            <p>{argument.name}</p>
            <input
              value={values[argument.id] ?? ""}
              onChange={handleInputChange}
              type="text"
              placeholder={argument.placeholder}
              name={argument.id}
            />
          </div>
        ))}
        <br />
        <code>{populateCommand(taskData.command)}</code>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTaskIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const taskData = await getTaskData(params?.id as string);
  return {
    props: {
      taskData,
    },
  };
};
