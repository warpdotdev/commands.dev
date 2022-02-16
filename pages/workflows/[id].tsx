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

interface HighlightedText {
  text: string;
  highlight: Highlight;
}

enum Highlight {
  FOCUSED,
  UNFOCUSED,
  NONE,
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
    workflowData.arguments.length > 0 ? workflowData.arguments[0].id : null
  );

  // Updates the value in the map corresponding to the Argument Id key
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getArgHighlight = (highlight: Highlight) => {
    switch (highlight) {
      case Highlight.FOCUSED:
        return "bg-sky-500/50 px-1 font-mono";
      case Highlight.UNFOCUSED:
        return "bg-gray-400 px-1 font-mono";
      case Highlight.NONE:
        return "";
    }
  };

  // `getCommandWithHighlights` creates an array of HighlightedText objects which represents a string of text
  // and its associated Highlight status based on whether not the current argument is focused.
  // TODO: add a test for this function
  const getCommandWithHighlights = (command: string) => {
    if (command.length === 0) {
      return [];
    }
    let commandWithHighlights: HighlightedText[] = [];
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
      commandWithHighlights = commandWithHighlights.concat(
        getCommandWithHighlights(beforeArg)
      );
      commandWithHighlights.push({
        text: renderedArgText,
        highlight:
          focusedArg === argument.id ? Highlight.FOCUSED : Highlight.UNFOCUSED,
      });
      commandWithHighlights = commandWithHighlights.concat(
        getCommandWithHighlights(afterArg)
      );

      return commandWithHighlights;
    }

    // If there were no matches, just add the current command and return
    commandWithHighlights.push({ text: command, highlight: Highlight.NONE });
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
            <span
              className={getArgHighlight(
                focusedArg === argument.id
                  ? Highlight.FOCUSED
                  : Highlight.UNFOCUSED
              )}
            >
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
        <code>
          {getCommandWithHighlights(workflowData.command).map(
            (highlightedText) => (
              <span className={getArgHighlight(highlightedText.highlight)}>
                {highlightedText.text}
              </span>
            )
          )}
        </code>
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
