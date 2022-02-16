import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";

import { getAllWorkflowIds, getWorkflowData } from "../../lib/workflows";
import Layout from "../../components/layout";

interface ArgumentValues {
  [name: string]: string;
}

interface Argument {
  name: string;
  placeholder: string;
  id: string;
}

export default function Workflow({
  workflowData,
}: {
  workflowData: {
    title: string;
    description: string;
    tags: string[];
    arguments: Argument[];
    command: string;
  };
}) {
  // Initializes a key-value map of <Argument Id>: Empty String
  const initialValues: ArgumentValues = workflowData.arguments.reduce(
    (a, v) => ({ ...a, [v.id]: "" }),
    {}
  );
  const [values, setValues] = useState(initialValues);
  const [focusedArg, setFocusedArg] = useState(
    workflowData.arguments.length > 0 ? workflowData.arguments[0].id : ""
  );

  // Updates the value in the map corresponding to the Argument Id key
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getArgHighlight = (id: string) => {
    return (
      (focusedArg === id ? "bg-sky-500/50" : "bg-gray-400") + " px-1 font-mono"
    );
  };

  // `renderCommandWithHighlights` replaces variables in the `command` with the values if they exist, or with the placeholder
  // otherwise. Example: The command "cat $FILE_NAME.json | jq '.$FIELD'" will become "cat simple.json | jq '.name'"
  // if the values the user supplied are: {FILE_NAME: "simple", FIELD: "name"}
  const renderCommandWithHighlights = (command: string) => {
    if (command.length === 0) {
      return [];
    }
    let commandWithHighlights: JSX.Element[] = [];
    for (let argument of workflowData.arguments) {
      // This regex ensures that the split happens only on the first occurence of the word
      let regex = new RegExp(`\\$${argument.id}(.*)`, "g");
      const [beforeArg, afterArg] = command.split(regex);
      // If this arg is not a match - continue
      if (beforeArg === command) {
        continue;
      }

      let renderedArgText = argument.placeholder;
      if (values[argument.id] && values[argument.id] != "") {
        renderedArgText = values[argument.id];
      }
      // If there was a match, recurse on the substrings and return what's built
      commandWithHighlights.push(
        <>
          {renderCommandWithHighlights(beforeArg)}
          {
            <span className={getArgHighlight(argument.id)}>
              {renderedArgText}
            </span>
          }
          {renderCommandWithHighlights(afterArg)}
        </>
      );
      return commandWithHighlights;
    }
    // If there were no matches, just add the current command and return
    commandWithHighlights.push(<>{command}</>);
    return commandWithHighlights;
  };

  return (
    <Layout>
      <Head>
        <title>{workflowData.title}</title>
      </Head>
      <article>
        <h1>{workflowData.title}</h1>
        <p>{workflowData.description}</p>
        {workflowData.tags.join(", ")}
        {workflowData.arguments.map((argument) => (
          <div key={argument.id}>
            <span className={getArgHighlight(argument.id)}>
              {argument.name}
            </span>
            <div />
            <input
              value={values[argument.id] ?? ""}
              onChange={handleInputChange}
              type="text"
              placeholder={argument.placeholder}
              name={argument.id}
              onFocus={() => setFocusedArg(argument.id)}
            />
          </div>
        ))}
        <br />
        <code>{renderCommandWithHighlights(workflowData.command)}</code>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllWorkflowIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workflowData = await getWorkflowData(params?.id as string);
  return {
    props: {
      workflowData,
    },
  };
};
