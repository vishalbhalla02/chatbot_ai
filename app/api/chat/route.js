import prisma from "../../../lib/prisma";

export async function POST(req) {
  try {
    const {index} = await req.json();

    const chat = await prisma.chat.create({
      data: { index},
    });


    return new Response(JSON.stringify(`Chat ${index}`), { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: { index: 'asc' }
    });
    const data = chats.length
    // console.log(data);
    

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
