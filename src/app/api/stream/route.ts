import { streamText } from "ai";
// streamText is a function specifically designed for streaming responses
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json()
        const result = streamText({
            model: openai("gpt-4.1-nano"),
            prompt,
        });

        result.usage.then((usage) => {
            console.log({
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens
            });
            
        })

        return result.toUIMessageStreamResponse()
        //this method toUIMessageStreamResponse(), creates a HTTP response that streams the data in a format that the UI can understand
    } catch (error) {
        console.error("Error streaming text:", error);
        return new Response("Failed to stream text", {status:500})        
    }
}
