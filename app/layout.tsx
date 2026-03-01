import "../styles/globals.css";
import "../styles/home.css";
import type { Metadata } from "next";
import ScrollProgress from "./scrollProgress";
import ChatBot from "./components/ChatBot";

export const metadata: Metadata = {
  title: "Sammamish Circle",
  description: "Community resource hub for Sammamish",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600&family=Source+Serif+4:wght@400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ScrollProgress />
        {children}
        <ChatBot />
        </body>
    </html>
  );
}
