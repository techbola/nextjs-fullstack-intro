import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, content } = await request.json();
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      author: {
        create: {
          name: "Bola",
        },
      },
    },
  });
  return NextResponse.json({ result });
}
