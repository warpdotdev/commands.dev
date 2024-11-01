import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import React, { useState } from "react";

import { getAllWorkflowIds, getWorkflowData } from "../../lib/workflows";
import Layout from "../../components/layout";
import WorkflowTags from "../../components/WorkflowTags";
import { Argument, Workflow } from "warp-workflows";
import { CopyIcon } from "../../components/icons/copy";
import { Tooltip } from "react-tooltip";
import * as gtag from "../../lib/gtag";
import DownloadWarpCard from "../../components/DownloadWarpCard";

const lowerCaseFirstChar = (str: string) => str[0].toLowerCase() + str.slice(1);
interface ArgumentValues {
  [name: string]: string;
}

enum TokenType {
  ArgumentToken,
  TextToken,
}

interface ArgumentToken {
  type: TokenType.ArgumentToken;
  id: string;
}

interface TextToken {
  type: TokenType.TextToken;
  text: string;
}

type Token = ArgumentToken | TextToken;

export default function WorkflowPage({
  workflowData,
}: {
  workflowData: Workflow;
}) {
  let workflowArguments = workflowData.arguments ?? ([] as Argument[]);

  // Initializes a key-value map of <Argument Id>: Empty String
  const initialValues: ArgumentValues = workflowArguments.reduce(
    (a, v) => ({ ...a, [v.name]: "" }),
    {}
  );
  const [values, setValues] = useState(initialValues);
  const [focusedArg, setFocusedArg] = useState(
    workflowArguments.length > 0 ? workflowArguments[0].name : null
  );

  const [commandCopied, setCommandCopied] = useState(false);
  // Updates the value in the map corresponding to the Argument Id key
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getArgText = (id: string) => {
    // If there's something typed in the input box - return that
    if (values[id] && values[id] != "") {
      return values[id];
    }

    // If there's not something typed - retrieve the placeholder
    for (let argument of workflowArguments) {
      if (argument.name === id) {
        return argument.default_value ?? argument.name;
      }
    }
  };

  const getArgHighlightStyle = (id: string) =>
    (focusedArg === id
      ? "text-white dark:text-black font-medium"
      : "bg-opacity-30 text-black dark:text-white") +
    " bg-arg-highlight px-1 font-mono";

  // `getTokenizedCommand` creates an array of CommandTokens which represent a string of text
  // and its associated argument argId if that token represents an argument.
  // TODO: add a test for this function
  const getTokenizedCommand = (command: string) => {
    if (command.length === 0) {
      return [];
    }
    let commandTokens: Token[] = [];
    for (let argument of workflowArguments) {
      // This regex ensures that the split happens only on the first occurence of the word
      let regex = new RegExp(`\\{{${argument.name}}}(.*)`, "s");
      const [beforeArg, afterArg] = command.split(regex);
      // If this arg is not a match - continue to the next arg
      if (beforeArg === command) {
        continue;
      }

      // If there was a match, recurse on the substrings, add the ArgToken, and return what's built
      commandTokens = commandTokens.concat(getTokenizedCommand(beforeArg));
      commandTokens.push({
        type: TokenType.ArgumentToken,
        id: argument.name,
      });
      commandTokens = commandTokens.concat(getTokenizedCommand(afterArg));

      return commandTokens;
    }

    // If there were no matches, just add the current command as a TextToken and return
    commandTokens.push({ type: TokenType.TextToken, text: command });
    return commandTokens;
  };

  const onCopyPress = () => {
    let commandTokens = getTokenizedCommand(workflowData.command);
    let commandString = "";
    commandTokens.forEach((token) => {
      commandString +=
        token.type === TokenType.ArgumentToken
          ? getArgText(token.id)
          : token.text;
    });

    gtag.event({
      action: "copy_command",
      category: "Workflow Detail Page",
      label: "Copy Command",
      value: workflowData.slug,
    });

    copyTextToClipboard(commandString).then(() => {
      setCommandCopied(true);
      setTimeout(() => {
        setCommandCopied(false);
      }, 1500);
    });
  };

  const copyCurrentUrl = () => {
    let url = window.location.href;

    gtag.event({
      action: "copy_url",
      category: "Workflow Detail Page",
      label: "Copy URL",
      value: workflowData.slug,
    });

    copyTextToClipboard(url);
  };

  // This shows up as a description when our page is surfaced in Google Search results.
  // It does not increase our ranking but it does increase our click-through rate.
  const descriptionInMetaTag =
    workflowData.description == undefined
      ? `To ${lowerCaseFirstChar(workflowData.name)}, use command \`${workflowData.command
      }\``
      : `${workflowData.description}. Command is \`${workflowData.command}\``;

  return (
    <Layout>
      <Head>
        <title>{workflowData.name}</title>
        <meta name="description" content={descriptionInMetaTag} />
      </Head>
      <main className="grow h-screen">
        <div className="flex pt-10">
          <div className="w-1/6 hidden md:flex" />
          <div className="flex-col md:flex-col flex-grow md:px-6 px-3">
            <div className="flex justify-between">
              <div className="pb-10">
                <h1 className="text-2xl text-black dark:text-white font-bold pb-2">
                  {workflowData.name}
                </h1>
                {workflowData.description != undefined && (
                  <p className="text-black dark:text-white pb-2 w-3/4">
                    {workflowData.description}
                  </p>
                )}
                {workflowData.author != undefined && (
                  <a
                    href={workflowData.author_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-black dark:text-white "
                  >
                    Authored by:{" "}
                    <span className="bg-pill-light dark:bg-pill-dark p-1 ml-1 rounded-md hover:opacity-60">
                      {workflowData.author}
                    </span>
                  </a>
                )}
              </div>
              <div>
                <DownloadWarpCard />
              </div>
            </div>
            {workflowArguments.map((argument) => (
              <div key={argument.name} className="flex-col pb-9">
                <span
                  className={
                    getArgHighlightStyle(argument.name) + " py-1 text-sm"
                  }
                >
                  {argument.name}
                </span>
                <div />
                <input
                  className="border-solid border mt-2 pl-2 py-1 
                font-mono text-sm rounded-md border-card-border-light 
                bg-command-light dark:bg-command-dark dark:text-white placeholder:opacity-40"
                  value={values[argument.name] ?? ""}
                  onChange={handleInputChange}
                  type="text"
                  placeholder={argument.default_value ?? argument.name}
                  aria-description={argument.default_value ?? argument.name}
                  name={argument.name}
                  onFocus={() => setFocusedArg(argument.name)}
                />
              </div>
            ))}
            <br />
            <div className="flex md:max-w-[37rem] max-w-[21.5rem] justify-between">
              <div className="text-sm text-black dark:text-white pb-2">
                Command
              </div>
              <button
                className="text-icon-light dark:text-icon-dark hover:opacity-60"
                data-tooltip-content={commandCopied ? "Copied" : "Copy"}
                aria-label="Copy Command"
                data-tooltip-id="copyTip"
                onClick={onCopyPress}
              >
                {/* TODO: Get the check mark icon from CQ when it's ready  */}
                <CopyIcon />
              </button>
              <Tooltip
                className="bg-card-light dark:bg-card-dark text-black dark:text-white"
                id="copyTip"
                place="top"
              />
            </div>
            <div className="bg-command-light dark:bg-command-dark md:w-[37rem] w-[21.5rem] whitespace-pre p-4 text-sm mb-5 overflow-x-auto">
              <code>
                {/* If the token is a text token (has "text" in the object) then render it normally, else
          retrieve its value from the input or placeholder and render it with highlight */}
                {getTokenizedCommand(workflowData.command).map((token, idx) => {
                  switch (token.type) {
                    case TokenType.ArgumentToken:
                      return (
                        <span
                          key={idx}
                          className={getArgHighlightStyle(token.id)}
                        >
                          {getArgText(token.id)}
                        </span>
                      );
                    case TokenType.TextToken:
                      return (
                        <span key={idx} className="text-black dark:text-white">
                          {token.text}
                        </span>
                      );
                  }
                })}
              </code>
            </div>
            <div className="text-sm text-black dark:text-white pb-2">Tags</div>
            {workflowData.tags !== undefined && (
              <WorkflowTags tags={workflowData.tags} />
            )}
            <div className="flex py-6 text-link-text-light dark:text-link-text-dark">
              <a
                href={
                  "https://github.com/warpdotdev/workflows/blob/main" +
                  workflowData.relative_git_url
                }
                onClick={(e) => {
                  gtag.event({
                    action: "edit_in_github",
                    category: "Workflow Detail Page",
                    label: "Edit in GitHub",
                    value: workflowData.slug,
                  });
                }}
                rel="noreferrer"
                target="_blank"
              >
                <span className="pr-3">Edit in GitHub</span>
              </a>
              <button
                className="text-link-text"
                data-tooltip-content="Copied"
                data-tooltip-id="copyUrlTip"
                onClick={copyCurrentUrl}
              >
                Copy URL
              </button>
              <Tooltip
                className="bg-card-light dark:bg-card-dark text-black dark:text-white"
                id="copyUrlTip"
                place="top"
                openEvents={{ mousedown: true }}
                closeEvents={{ mouseout: true }}
                aria-live="Copied"
                delayHide={500}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

const copyTextToClipboard = async (text: string) => {
  return await navigator.clipboard.writeText(text);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllWorkflowIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workflowData = getWorkflowData(params?.id as string);
  return {
    props: {
      workflowData,
    },
  };
};
