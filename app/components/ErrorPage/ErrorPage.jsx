'use client'
import React from "react";
import { createPortal } from "react-dom";
import "./errorPage.css";

// export const RequestLimitReached = () => {
//   const modalRoot = document.getElementById("error-modal");
//   const rootApp = document.getElementById("root")
// //   modalRoot.style.display = "none";

//   const close = () => {
//     modalRoot.style.display = "none";
//     rootApp.style.display = "flex";
//     rootApp.style.backgroundColor = "white"

//   }

//   if (!modalRoot) return null; // ✅ safety guard

//   return createPortal(
//     <div className="error-modal">
//         <button onClick={() => close()} aria-label="Close modal">
//             &times;
//             test
//           </button>
//       <p>
//         My sincerest apologies. It appears the daily request tokens have been
//         depleted. Please check back again after midnight PST so I can further
//         assist you.
//       </p>
//       <p>Cheers mate!</p>
//     </div>,
//     modalRoot
//   );
// };

export const RequestLimitReached = ({ isOpen, onClose }) => {

  if (!isOpen) return null; // ✅ safety guard

//   const delayPara = (index, nextWord) => {
//     setTimeout(function() {
//         setResultData(prev => prev + nextWord);
//     }, 75 * index);
//   }

//   for(let i = 0; i < newResponseArray.length; i++) {
//         const nextWord = newResponseArray[i];
//         delayPara(i, nextWord + "  ");
//     }

  return (
    <div className="error-modal">
        <button onClick={onClose} aria-label="Close modal">
            &times;
            test
          </button>
      <p>
        My sincerest apologies. It appears the daily request tokens have been
        depleted. Please check back again after midnight PST so I can further
        assist you.
      </p>
      <p>Cheers mate!</p>
    </div>
  );
};

