import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      topics: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const { name, icon, color, slug } = body;

  const category = await prisma.category.update({
    where: { slug: params.slug },
    data: {
      ...(name !== undefined && { name }),
      ...(icon !== undefined && { icon }),
      ...(color !== undefined && { color }),
      ...(slug !== undefined && { slug }),
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await prisma.category.delete({
    where: { slug: params.slug },
  });

  return NextResponse.json({ success: true });
}
