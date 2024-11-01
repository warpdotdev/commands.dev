import Link from "next/link";

export default function WorkflowTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex mt-1 flex-wrap">
      {tags.map((tag, id) => (
        <Link
          key={id}
          href={`/categories/${tag}`}
          className="rounded-full text-black dark:text-white bg-pill-light dark:bg-pill-dark px-5 my-1 mr-2 text-sm flex flex-col justify-center text-center hover:opacity-60">
          {tag}
        </Link>
      ))}
    </div>
  );
}
