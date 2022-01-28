import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }: { refine: Dispatch<SetStateAction<string>> }) {
  return (
    <input
      id="algolia_search"
      type="search"
      placeholder="Click or press 'Ctrl + K' to search"
      onChange={(e) => refine(e.currentTarget.value)}
      className="w-screen md:w-2/3 bg-sky-700 h-9 cursor-pointer border border-white/30 px-3 rounded-lg text-sm text-white placeholder:text-gray-300 focus:outline-none"
    />
  );
}

export default connectSearchBox(SearchBox);
