import { UIMessage, streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const result = streamText({
      model: openai('gpt-4.1-nano'),
      messages: convertToModelMessages(messages),
    })

    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.outputTokens,
      })
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error streaming chat completion:', error)
    return new Response('Failed to stream chat completion', { status: 500 })
  }
}
// NB: The messages from our UI may contain extra information that we may need to render the UI for e.g., a timestamp, for when the message was sent or the duration it took to generate the response. However, the AI model isn't interested in such info, and only needs the core message content considering token input constrains and costs. To address this, the AI-SDK provides a helper function; convertToModelMessages from ai, and now you can use it when passing messages to the streamText function.That helper function strips away UI specific metadata like timestamps, and converts messages to the format the AI model expects
