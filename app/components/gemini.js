// import { GoogleGenAI } from "@google/genai";

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const ai = new GoogleGenAI({ apiKey });

// /**
//  * Converts stored chat history into Gemini "contents" format
//  */
// const buildContents = (history, currentPrompt) => {
//   const contents = [];

//   history.forEach((chat) => {
//     contents.push({
//       role: "user",
//       parts: [{ text: chat.prompt }],
//     });

//     contents.push({
//       role: "model",
//       parts: [{ text: chat.response }],
//     });
//   });

//   contents.push({
//     role: "user",
//     parts: [{ text: currentPrompt }],
//   });

//   return contents;
// };

// /**
//  * Sends a context-aware prompt to Gemini
//  */
// export async function runChat(prompt, history = []) {
//   if (!prompt) throw new Error("Prompt is required");

// //   const contents = buildContents(history, prompt);
//     const contents = history.map(msg => ({
//         role: msg.role,
//         parts: [{ text: msg.text }],    
//     })); 

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents,
//   });

//   return response.candidates[0].content.parts[0].text;
// }

// export default runChat;
