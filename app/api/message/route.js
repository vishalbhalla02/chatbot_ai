import prisma from "../../../lib/prisma";

export async function POST(req) {
  console.log("post req");

  const { sender, text, chatId } = await req.json();

  const message = await prisma.message.create({
    data: { sender, text, chatId },
  });

  return new Response(JSON.stringify(message), { status: 201 });
}

export async function GET() {
  const messages = await prisma.message.findMany();

  return new Response(JSON.stringify(messages), { status: 200 });
}
