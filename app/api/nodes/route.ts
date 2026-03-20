import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, body: nodeBody, type, topicId, parentId, order } = body;

  if (!title || !topicId) {
    return NextResponse.json(
      { error: "title and topicId are required" },
      { status: 400 }
    );
  }

  const node = await prisma.node.create({
    data: {
      title,
      body: nodeBody,
      type: type || "QUESTION",
      topicId,
      parentId: parentId || null,
      order: order ?? 0,
    },
  });

  return NextResponse.json(node, { status: 201 });
}
