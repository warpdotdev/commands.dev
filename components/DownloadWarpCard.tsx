import { WarpTextIcon } from "./icons/text_logo";

export default function DownloadWarpCard() {
  return (
    <div className="flex p-3 border border-gray-400 w-96 h-20 rounded">
        <div className="self-center">
            <a href="https://warp.dev" target="_blank" rel="noreferrer">
                <WarpTextIcon/>
            </a>
        </div>
        <div className="pl-4"></div>
        <div className="border-l border-gray-400"/>
        <div className="pr-4"></div>
        <div className="self-center">
            <body className="dark:text-white text-xs pb-1">
                Brought to you by Warp, a free terminal reimagined to work like a modern app.
            </body>
            <div className="dark:text-white text-xs underline">
                <a href="https://app.warp.dev/get_warp" target="_blank" rel="noreferrer">Download Now</a>
            </div>
        </div>
    </div>
  );
}