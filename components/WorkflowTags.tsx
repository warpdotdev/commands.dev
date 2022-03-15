export default function WorkflowTags({ tags }: { tags: string[] }) {
  const onTagClick = (tag: string) => {
    let searchBar = document.querySelector(
      "#algolia_search"
    ) as HTMLInputElement;
    if (searchBar != null) {
      searchBar.setRangeText(tag, 0, searchBar.value.length - 1);
      searchBar.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  return (
    <div className="flex mt-1 flex-wrap">
      {tags.map((tag, id) => (
        <button
          key={id}
          className="rounded-full text-black dark:text-white bg-pill-light dark:bg-pill-dark px-5 my-1 mr-2 text-sm flex flex-col justify-center text-center hover:opacity-60"
          onClick={(e) => {
            onTagClick(tag);
            e.preventDefault(); // prevents navigation when the tags are on the card
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
