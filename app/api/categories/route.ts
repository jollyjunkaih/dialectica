import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      topics: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, icon, color, slug } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "name and slug are required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: { name, icon, color, slug },
  });

  return NextResponse.json(category, { status: 201 });
}
