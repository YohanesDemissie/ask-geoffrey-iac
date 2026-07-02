import { GoogleGenAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // 1. Parse the JSON body coming from your chat frontend
    const { message } = await request.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // 2. Initialize Gemini using the environment variable
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Generate response text from the model
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    // 4. Send the chat reply back to your React frontend as JSON
    return Response.json({ reply: responseText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
