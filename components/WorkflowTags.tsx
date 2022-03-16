import { useRouter } from "next/router";

export default function WorkflowTags({ tags }: { tags: string[] }) {
  const router = useRouter();

  return (
    <div className="flex mt-1 flex-wrap">
      {tags.map((tag, id) => (
        <button
          key={id}
          className="rounded-full text-black dark:text-white bg-pill-light dark:bg-pill-dark px-5 my-1 mr-2 text-sm flex flex-col justify-center text-center hover:opacity-60"
          onClick={(e) => {
            e.preventDefault(); // prevents navigation when the tags are on the card
            router.push(`/categories/${tag}`);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
