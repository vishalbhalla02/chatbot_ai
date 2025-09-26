import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

export async function POST(req) {
  try {
    const { userMessage } = await req.json();
    console.log(userMessage);

    const completion = await openai.chat.completions.create({
      model: 'qwen/qwen2.5-coder-32b-instruct',
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    const aiReply = completion.choices[0]?.message?.content;

    return new Response(JSON.stringify({ response: aiReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI call failed:', error);
    return new Response(JSON.stringify({ error: 'AI error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
