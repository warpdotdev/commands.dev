import { connectSearchBox } from "react-instantsearch-dom";
import { Dispatch, SetStateAction } from "react";

function WorkflowTags({
  refine,
  tags,
}: {
  refine: Dispatch<SetStateAction<string>>;
  tags: string[];
}) {
  return (
    <div className="flex mt-1 flex-wrap">
      {tags.map((tag, id) => (
        <button
          key={id}
          className="rounded-full text-black dark:text-white bg-pill-light dark:bg-pill-dark px-5 my-1 mr-2 text-sm flex flex-col justify-center text-center"
          onClick={() => {
            refine(tag);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default connectSearchBox(WorkflowTags);
