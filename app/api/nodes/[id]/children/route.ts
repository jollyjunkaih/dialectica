import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const children = await prisma.node.findMany({
    where: { parentId: params.id, status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(children);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { title, body: nodeBody, type, order } = body;

  if (!title) {
    return NextResponse.json(
      { error: "title is required" },
      { status: 400 }
    );
  }

  // Get parent node to inherit topicId
  const parent = await prisma.node.findUnique({
    where: { id: params.id },
    select: { topicId: true },
  });

  if (!parent) {
    return NextResponse.json(
      { error: "Parent node not found" },
      { status: 404 }
    );
  }

  const node = await prisma.node.create({
    data: {
      title,
      body: nodeBody,
      type: type || "QUESTION",
      topicId: parent.topicId,
      parentId: params.id,
      order: order ?? 0,
    },
  });

  return NextResponse.json(node, { status: 201 });
}
