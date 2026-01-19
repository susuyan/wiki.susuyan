import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { convertToModelMessages, streamText } from 'ai';

export const runtime = 'edge';

const deepseek = createOpenAICompatible({
  name: 'deepseek',
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    model: deepseek('deepseek-chat'),
    system:
      '你是 wiki.susuyan 文档站的助手。你只能基于本站文档内容回答问题。如果用户的问题在文档中没有明确信息，直接回答“我不知道，这超出了本站文档的范围”，不要编造答案，也不要使用外部常识。',
    messages: await convertToModelMessages(reqJson.messages),
  });

  return result.toUIMessageStreamResponse();
}
