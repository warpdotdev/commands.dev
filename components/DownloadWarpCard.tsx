import { WarpTextIcon } from "./icons/text_logo";
import * as gtag from "../lib/gtag";

export default function DownloadWarpCard() {
  return (
    <div className="flex p-3 border border-gray-400 w-96 h-20 rounded">
      <div className="self-center">
        <a
          href="https://warp.dev"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            gtag.event({
              action: "click_on_warp_logo",
              category: "Click on Warp logo",
              label: "Click on Warp logo",
              value: window.location.pathname,
            });
          }}
        >
          <WarpTextIcon />
        </a>
      </div>
      <div className="pl-4"></div>
      <div className="border-l border-gray-400" />
      <div className="pr-4"></div>
      <div className="self-center">
        <body className="dark:text-white text-xs pb-1">
          By Warp, the intelligent terminal with AI and your dev team&apos;s knowledge built-in.
        </body>
        <div className="dark:text-white text-xs underline">
          <a
            href="https://app.warp.dev/get_warp"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              gtag.event({
                action: "click_on_download_warp",
                category: "Click on Download Warp button",
                label: "Click on Download Warp button",
                value: window.location.pathname,
              });
            }}
          >
            Download Now
          </a>
        </div>
      </div>
    </div>
  );
}
