import prisma from '../../../lib/prisma';

export async function POST(req) {
  try {
    const messages = await req.json();

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

    return new Response(JSON.stringify('createdMessages'), { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  // console.log(searchParams);

  const chatId = searchParams.get('chatId');
  // console.log(chatId);

  if (!chatId) {
    return new Response(JSON.stringify({ error: 'Message ID is required' }), {
      status: 400,
    });
  }

  const messages = await prisma.message.findMany({
    where: {
      chatId: Number(chatId),
    },
  });
  // console.log(messages);

  if (!chatId) {
    return new Response(JSON.stringify({ error: 'Message not found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(messages), { status: 200 });
}
