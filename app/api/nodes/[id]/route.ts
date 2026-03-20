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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { title, body: nodeBody, type, status, order } = body;

  const node = await prisma.node.update({
    where: { id: params.id },
    data: {
      ...(title !== undefined && { title }),
      ...(nodeBody !== undefined && { body: nodeBody }),
      ...(type !== undefined && { type }),
      ...(status !== undefined && { status }),
      ...(order !== undefined && { order }),
    },
  });

  return NextResponse.json(node);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.node.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
