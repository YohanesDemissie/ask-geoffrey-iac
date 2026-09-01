import { sanitizePrompt } from "./utils";
// const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = process.env.NEXT_PUBLIC__API_URL;
const getApiUrl = () => process.env.NEXT_PUBLIC__API_URL;


export const sendPrompt = async (prompt, history = []) => {
  const cleanPrompt = sanitizePrompt(prompt);
  // const res = await fetch(`${API_URL}/api/generate`, {
    const res = await fetch(`${getApiUrl()}/api/generate`, {
  // const res = await fetch(`http://localhost:3001/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ prompt, history }),
    body: JSON.stringify({ 
        prompt: cleanPrompt, 
        history }),
  });

  const responseObj = await res.json();
  // if (res.status === 429 || res.status === 500) {
  //   let data = {
  //     generatedText: "Error",
  //     status: 429
  //   }
  //   return data;
    // return "Simulated response for development";
    
  // }
  if (!res.ok) {
    // throw new Error(responseObj.error || "Request failed");
    const data = {
      generatedText: `My sincerest apologies. It appears the daily request tokens have been
        depleted. Please check back again after midnight PST so I can further
        assist you. Cheers mate!`,
        status: 429
    }
    return data
  }

  // const data = {
  //   generatedText: responseObj.generatedText,
  //   status: res.status
  // }
    const data = {
    generatedText: responseObj.generatedText,
    status: res.status
  }

  return data;
};
