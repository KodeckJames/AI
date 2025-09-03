import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST() {
    const { text } = await generateText({
        model : openai("gpt-4.1-nano"),
        prompt: "Explain what an LLM is in simple terms"
    });
    return Response.json({ text });
}