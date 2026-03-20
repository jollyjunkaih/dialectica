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

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const { title, description, slug, coverColor, status, categoryId } = body;

  const topic = await prisma.topic.update({
    where: { slug: params.slug },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(slug !== undefined && { slug }),
      ...(coverColor !== undefined && { coverColor }),
      ...(status !== undefined && { status }),
      ...(categoryId !== undefined && { categoryId }),
    },
  });

  return NextResponse.json(topic);
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await prisma.topic.delete({
    where: { slug: params.slug },
  });

  return NextResponse.json({ success: true });
}
