import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const topic = await prisma.topic.findUnique({
    where: { slug: params.slug },
    include: {
      nodes: {
        where: { parentId: null, status: "PUBLISHED" },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(topic);
}
