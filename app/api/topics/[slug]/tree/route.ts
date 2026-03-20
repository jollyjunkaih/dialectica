import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NodeWithChildren } from "@/lib/types";

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
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const depth = parseInt(searchParams.get("depth") || "10", 10);

  const topic = await prisma.topic.findUnique({
    where: { slug: params.slug },
    include: {
      nodes: {
        where: { parentId: null },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  const nodesWithTrees = await Promise.all(
    topic.nodes.map((node) => fetchNodeTree(node.id, 0, depth))
  );

  return NextResponse.json({
    ...topic,
    nodes: nodesWithTrees.filter(Boolean),
  });
}
