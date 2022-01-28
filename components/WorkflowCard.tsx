import Link from "next/link";

export interface Workflow {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const WorkflowCard = ({ id, title, description, tags }: Workflow) => (
  <Link href={`/workflows/${id}`} key={id}>
    <a className="p-6 m-6 border border-white/30 w-96 rounded-md bg-white bg-opacity-10 hover:bg-opacity-30 active:bg-opacity-50">
      <h3 className="min-h-15 text-xl text-white font-bold h-16 line-clamp-2">
        {title}
      </h3>
      <p className="mt-4 text-gray-300 text-l line-clamp-4 h-20">
        {description}
      </p>
      <div className="flex">
        {tags.map((tag, id) => (
          <div
            key={id}
            className="rounded-full text-white bg-white bg-opacity-20 px-5 mr-2 text-sm flex flex-col justify-center text-center"
          >
            {tag}
          </div>
        ))}
      </div>
    </a>
  </Link>
);

export function WorkflowWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap justify-around py-5">{children}</div>;
}
