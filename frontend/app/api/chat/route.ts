import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: Store your API key in an environment variable
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in environment variables");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Vérifier que la clé API est configurée
  if (!API_KEY || !genAI) {
    console.error("GEMINI_API_KEY environment variable is missing or invalid");
    return new Response(
      JSON.stringify({ 
        error: "API key not configured. Please set GEMINI_API_KEY environment variable." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

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
        maxOutputTokens: 100,
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
