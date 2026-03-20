import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length === 0) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  const query = `%${q}%`;

  const [nodes, topics] = await Promise.all([
    prisma.node.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { body: { contains: q } },
        ],
        status: "PUBLISHED",
      },
      include: {
        topic: { select: { title: true, slug: true } },
      },
      take: 50,
    }),
    prisma.topic.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
        status: "PUBLISHED",
      },
      include: {
        category: { select: { name: true, slug: true } },
      },
      take: 20,
    }),
  ]);

  return NextResponse.json({ nodes, topics });
}
