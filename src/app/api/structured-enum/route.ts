import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const result = await generateObject({
      model: openai('gpt-4.1-mini'), //gpt-4.1-mini supports enum better than gpt-4.1-nano
      output: 'enum',
      enum: ['positive', 'negative', 'neutral'],
      prompt: `Classify the sentiment in this text: "${text}"`,
    })

    return result.toJsonResponse()
  } catch (error) {
    console.error('Error getting sentiment:', error)
    return new Response('Failed to generate sentiment', { status: 500 })
  }
}
// NB: Here, we're using generateObject() instead of streamObject() because the latter doesn't support enums.
// We're also using .toJsonResponse instead of .toTextStreamResponse() because enums return a single value hence no need for streaming.