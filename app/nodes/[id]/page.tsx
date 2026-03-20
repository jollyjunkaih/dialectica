import NodePageView from "@/components/node-tree/NodePageView";
import type { NodeWithChildren } from "@/lib/types";

async function getNode(id: string): Promise<NodeWithChildren | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/nodes/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function NodePage({
  params,
}: {
  params: { id: string };
}) {
  const node = await getNode(params.id);

  if (!node) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-amber-200 mb-4">
            Node Not Found
          </h1>
          <a
            href="/"
            className="text-amber-500 hover:text-amber-400 font-serif underline"
          >
            Return to the library
          </a>
        </div>
      </div>
    );
  }

  return <NodePageView node={node} />;
}
