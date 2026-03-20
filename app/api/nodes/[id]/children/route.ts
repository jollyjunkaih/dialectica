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
