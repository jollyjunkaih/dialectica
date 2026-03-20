import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, slug, categoryId, coverColor, status } = body;

  if (!title || !slug || !categoryId) {
    return NextResponse.json(
      { error: "title, slug, and categoryId are required" },
      { status: 400 }
    );
  }

  const topic = await prisma.topic.create({
    data: {
      title,
      description,
      slug,
      categoryId,
      ...(coverColor && { coverColor }),
      ...(status && { status }),
    },
  });

  return NextResponse.json(topic, { status: 201 });
}
