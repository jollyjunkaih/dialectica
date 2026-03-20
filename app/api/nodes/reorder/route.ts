import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { items } = body as { items: { id: string; order: number }[] };

  if (!items || !Array.isArray(items)) {
    return NextResponse.json(
      { error: "items array of { id, order } is required" },
      { status: 400 }
    );
  }

  await prisma.$transaction(
    items.map((item) =>
      prisma.node.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );

  return NextResponse.json({ success: true });
}
