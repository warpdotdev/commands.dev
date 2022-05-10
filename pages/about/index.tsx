import Head from "next/head";
import { GetStaticProps } from "next";

import Layout, { siteTitle, siteDescription } from "../../components/layout";

export default function About() {
  return (
    <Layout>
      <main className="grow">
        <div className="bg-cover text-black dark:text-white">
          <div className="py-10 px-3 max-w-2xl">
            <h1 className="md:text-3xl text-3xl font-bold pb-3">About</h1>
            <h2 className="md:text-xl text-xl font-bold">
              What is Commands.dev?
            </h2>
            <div className="text-m font-normal mt-3 text-back dark:text-white max-w-2xl">
              Commands.dev is an open-source, searchable collection of popular
              terminal commands curated from across the internet. You can look
              up commands by category (git, android, docker) and each command
              will tell you exactly what parameters need to be inserted.
            </div>
            <h2 className="md:text-xl text-xl font-bold pt-3">
              Why did we create Commands.dev?
            </h2>
            <div className="text-m font-normal mt-3 text-back dark:text-white max-w-2xl">
              Every engineer has had a moment where they forget a terminal
              command because it is rarely used or has complex parameters that
              are hard to understand. When that happens, they’re forced to do a
              tedious search through their terminal command history or open up
              an Internet browser just to look through StackOverflow or outdated
              team wikis.
            </div>
            <div className="text-m font-normal mt-3 text-back dark:text-white max-w-2xl">
              Commands.dev is meant to fix this problem. By compiling a list of
              hard-to-remember terminal commands, we hope to become one of the
              go-to places on the Internet that developers can consult when they
              hit a wall. No more context-switching or wasting precious
              engineering time.
            </div>
            <h2 className="md:text-xl text-xl font-bold pt-3">
              How were these commands sourced?
            </h2>
            <div className="text-m font-normal mt-3 text-back dark:text-white max-w-2xl">
              Our team started by collecting commands from common StackOverflow
              posts, because we believed that would translate to commands that
              users often have trouble remembering. We’ve also had over 20
              contributions from users within our community contribute to this
              list of commands, and you can see their Github usernames
              attributed in each corresponding command card.
            </div>
            <h2 className="md:text-xl text-xl font-bold pt-3">
              Can I contribute?
            </h2>
            <div className="text-m font-normal mt-3 text-back dark:text-white max-w-2xl">
              Yes! Check out our{" "}
              <span>
                <a
                  href="https://github.com/warpdotdev/workflows#contributing"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:opacity-60"
                >
                  open source repo
                </a>
              </span>{" "}
              on Github. It is also linked in the header of this site. As our
              community grows, so will our database of terminal commands. So
              please don’t be shy to contribute!
            </div>
            <h2 className="md:text-xl text-xl font-bold pt-3">
              How is this related to Workflows in Warp?
            </h2>
            <div className="text-m font-normal mt-3 text-back dark:text-white max-w-2xl">
              If you happen to be a{" "}
              <span>
                <a
                  href="https://www.warp.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:opacity-60"
                >
                  Warp
                </a>
              </span>{" "}
              user, this repository powers the workflow menu within Warp so you
              can search commands within the terminal too. You can essentially
              think of Workflows as Commands.dev inside the Warp terminal! It
              just makes it easier for developers to access the list of commands
              directly, so they don’t need to context switch out of their
              terminal session into an Internet browser.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
