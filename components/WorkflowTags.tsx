export default function WorkflowTags(tags: string[]) {
  return (
    <div className="flex mt-1 flex-wrap">
      {tags.map((tag, id) => (
        <div
          key={id}
          className="rounded-full text-black dark:text-white bg-pill-light dark:bg-pill-dark px-5 my-1 mr-2 text-sm flex flex-col justify-center text-center"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
