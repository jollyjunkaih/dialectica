import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NodeWithChildren } from "@/lib/types";

// Recursively fetch node tree up to a depth limit
async function fetchNodeTree(
  nodeId: string,
  currentDepth: number,
  maxDepth: number
): Promise<NodeWithChildren | null> {
  const node = await prisma.node.findUnique({
    where: { id: nodeId },
    include: {
      children: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!node) return null;

  if (currentDepth >= maxDepth) {
    return { ...node, children: [] };
  }

  const childrenWithTree = await Promise.all(
    node.children.map((child) =>
      fetchNodeTree(child.id, currentDepth + 1, maxDepth)
    )
  );

  return {
    ...node,
    children: childrenWithTree.filter(Boolean) as NodeWithChildren[],
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const depth = parseInt(searchParams.get("depth") || "10", 10);

  const tree = await fetchNodeTree(params.id, 0, depth);

  if (!tree) {
    return NextResponse.json({ error: "Node not found" }, { status: 404 });
  }

  return NextResponse.json(tree);
}
