import prisma from "../../../lib/prisma";

export async function POST(req) {
  try {
    const messages = await req.json();
    // console.log(messages);
    // // messages.chatId = Number (messages.chatId)
    // console.log(typeof(messages[0].chatId));
    //     console.log(messages[0].chatId);
    
    // Basic validation
    // if (!Array.isArray(messages) || messages.length === 0) {
    //   return new Response(JSON.stringify({ error: "Messages array required" }), { status: 400 });
    // }

    // // Validate each message has required fields
    // for (const msg of messages) {
    //   if (!msg.sender || !msg.text || !msg.chatId) {
    //     return new Response(JSON.stringify({ error: "sender, text, and chatId required" }), { status: 400 });
    //   }
    // }

    // // Create messages
    const createdMessages = await Promise.all(
      messages.map((msg) =>
        prisma.message.create({
          data: {
            sender: msg.sender,
            text: msg.text,
            chatId: msg.chatId,
          },
        })
      )
    );

    return new Response(JSON.stringify("createdMessages"), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  
  const chatId = searchParams.get("chatId");
  console.log(chatId);
  

  if (!chatId) {
    return new Response(JSON.stringify({ error: "Message ID is required" }), { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: {
      chatId: Number(chatId),
    },
  });
  console.log(messages);
  
  if (!chatId) {
    return new Response(JSON.stringify({ error: "Message not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(messages), { status: 200 });
}
