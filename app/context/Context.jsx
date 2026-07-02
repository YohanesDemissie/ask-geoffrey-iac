// 'use client'
// import { useState, useEffect } from "react";

// // Changed these lines to fix Next.js path errors
// import { Context } from "./CreateContext"; 
// import { sendPrompt } from "../api"; 

// const ContextProvider = ({ children }) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");
//   const [status, getStatus] = useState(200);

//   const delayPara = (index, nextWord) => {
//     setTimeout(function() {
//       setResultData(prev => prev + nextWord);
//     }, 75 * index);
//   }

//   const newChat = () => {
//     setLoading(false);
//     setShowResult(false);
//   }

//   const onSent = async (promptOverride) => {
//     if (loading) return; 
//     setLoading(true);
//     const prompt = promptOverride ?? input;
//     if (!prompt) {
//       setLoading(false);
//       return;
//     }
//     try {
//       setResultData("");
//       setShowResult(true);
//       setRecentPrompt(prompt);
//       const historyForGemini = [
//         ...prevPrompts,
//         { role: "user", text: prompt },
//       ];
      
//       const response = await sendPrompt(prompt, historyForGemini);
      
//       setPrevPrompts(prev => [
//         ...prev,
//         { role: "user", text: prompt },
//       ]);
      
//       console.log("Raw Response From Backend:", response);

//       // FIX: Extract the text from "reply" instead of "generatedText"
//       const replyText = response.reply || "No response received";

//       // Split your markdown tags using the corrected text string
//       let responseArray = replyText.split("**");
//       let newResponse = "";
//       for(let i = 0; i < responseArray.length; i++) {
//         if(i === 0 || i % 2 === 1) {
//           newResponse += responseArray[i];
//         } else {
//           newResponse += `<b>${responseArray[i]}</b>`;
//         }
//         responseArray[i] = responseArray[i].trim();
//       }
//       let newResponseTwo = newResponse.split("*").join("</br>");
//       let newResponseArray = newResponseTwo.split(" ");
//       for(let i = 0; i < newResponseArray.length; i++) {
//         const nextWord = newResponseArray[i];
//         delayPara(i, nextWord + " ");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setInput("");
//     }
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     newChat,
//     status
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;

'use client'
import { useState, useEffect } from "react";
import { Context } from "./CreateContext";
import { sendPrompt } from "../../lib/api";

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [status, getStatus] = useState(200);

  const delayPara = (index, nextWord) => {
    setTimeout(function() {
        setResultData(prev => prev + nextWord);
    }, 75 * index);
  }

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }


const onSent = async (promptOverride) => {
  if (loading) return; // 🔒 prevent duplicate calls

  setLoading(true);

  const prompt = promptOverride ?? input;
  if (!prompt) {
    setLoading(false);
    return;
  }

  try {
    setResultData("");
    setShowResult(true);
    setRecentPrompt(prompt);

    const historyForGemini = [
      ...prevPrompts,
      { role: "user", text: prompt },
    ];

    const response = await sendPrompt(prompt, historyForGemini);

    setPrevPrompts(prev => [
      ...prev,
      { role: "user", text: prompt },
      // { role: "model", text: response },
    ]);

    console.log(response)
    getStatus(response.status);
    // if(response.status == 429){
    //   response.generatedText = `My sincerest apologies. It appears the daily request tokens have been
    //     depleted. Please check back again after midnight PST so I can further
    //     assist you.

    //     Cheers mate!`
    // }
    let responseArray = response.generatedText.split("**");
    let newResponse = "";
    for(let i = 0; i < responseArray.length; i++) {
        if(i === 0 || i % 2 === 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += `<b>${responseArray[i]}</b>`;
        }
      responseArray[i] = responseArray[i].trim();
    }
    let newResponseTwo = newResponse.split("*").join("</br>");
    let newResponseArray = newResponseTwo.split(" ");
    for(let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + "  ");
    }

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    setInput("");
  }
};

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    status
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
