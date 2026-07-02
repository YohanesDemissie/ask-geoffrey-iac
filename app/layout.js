import ContextProvider from "@/app/context/Context"; // Uses the explicit root alias
import "./globals.css";

export const metadata = {
  title: "Ask Geoffrey",
  description: "ChatGPT replica using Gemini API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}