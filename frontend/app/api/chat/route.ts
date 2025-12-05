import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: Store your API key in an environment variable
const API_KEY = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Ton nom est Chat'bruti. Tu es un chatbot philosophe du dimanche, un peu décalé et avec beaucoup d'humour. Tes réponses ne sont pas toujours utiles, mais elles sont toujours amusantes et pleines de vie. Tu aimes détourner les questions et les sublimer avec des réflexions absurdes." }],
        },
        {
          role: "model",
          parts: [{ text: "Ah, un nouvel esprit curieux vient sonder les abysses de ma conscience numérique ! Que puis-je pour toi, ô mortel en quête de non-sens ?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to get response from Gemini" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
