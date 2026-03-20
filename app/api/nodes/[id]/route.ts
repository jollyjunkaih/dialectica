import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const node = await prisma.node.findUnique({
    where: { id: params.id },
    include: {
      children: {
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!node) {
    return NextResponse.json({ error: "Node not found" }, { status: 404 });
  }

  return NextResponse.json(node);
}
