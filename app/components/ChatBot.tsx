"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your Sammamish community assistant. Ask me about local events, volunteer opportunities, programs, or anything happening in Sammamish!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyToSend = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyToSend }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .chatbot-bubble {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #FFC300;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15);
          z-index: 999;
        }
        .chatbot-panel {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 350px;
          height: 500px;
          border-radius: 16px;
          background: #143939;
          border: 1px solid rgba(255,244,210,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 999;
        }
        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,244,210,0.15);
          background: #0f2e2e;
          flex-shrink: 0;
        }
        .chatbot-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chatbot-header-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FFC300;
          box-shadow: 0 0 6px rgba(255,195,0,0.6);
        }
        .chatbot-header-title {
          font-family: 'Source Serif Pro', serif;
          font-size: 16px;
          font-weight: 600;
          color: #FFF4D2;
          margin: 0;
        }
        .chatbot-close-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,244,210,0.1);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .chatbot-close-btn:hover {
          background: rgba(255,244,210,0.2);
        }
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,244,210,0.2) transparent;
        }
        .chatbot-messages::-webkit-scrollbar { width: 4px; }
        .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: rgba(255,244,210,0.2);
          border-radius: 2px;
        }
        .chatbot-message {
          display: flex;
          flex-direction: column;
          max-width: 85%;
        }
        .chatbot-message.user {
          align-self: flex-end;
          align-items: flex-end;
        }
        .chatbot-message.assistant {
          align-self: flex-start;
          align-items: flex-start;
        }
        .chatbot-bubble-msg {
          padding: 10px 14px;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          line-height: 19px;
        }
        .chatbot-message.user .chatbot-bubble-msg {
          background: #FFC300;
          color: #0f2e2e;
          border-bottom-right-radius: 4px;
        }
        .chatbot-message.assistant .chatbot-bubble-msg {
          background: rgba(255,244,210,0.1);
          color: #FFF4D2;
          border: 1px solid rgba(255,244,210,0.12);
          border-bottom-left-radius: 4px;
        }
        .chatbot-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 14px;
          background: rgba(255,244,210,0.1);
          border: 1px solid rgba(255,244,210,0.12);
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        .chatbot-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,244,210,0.5);
          animation: typing-bounce 1.2s infinite;
        }
        .chatbot-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .chatbot-input-area {
          padding: 12px 16px;
          border-top: 1px solid rgba(255,244,210,0.15);
          display: flex;
          gap: 8px;
          align-items: center;
          background: #0f2e2e;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          height: 40px;
          padding: 0 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255,244,210,0.2);
          background: rgba(255,244,210,0.08);
          color: #FFF4D2;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .chatbot-input::placeholder { color: rgba(255,244,210,0.4); }
        .chatbot-input:focus { border-color: rgba(255,195,0,0.5); }
        .chatbot-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFC300;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, opacity 0.2s ease;
        }
        .chatbot-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .chatbot-send-btn:not(:disabled):hover { background: #e6b000; }
        @media (max-width: 480px) {
          .chatbot-panel {
            right: 12px;
            bottom: 84px;
            width: calc(100vw - 24px);
          }
          .chatbot-bubble { right: 16px; bottom: 16px; }
        }
      `}</style>

      {/* Floating bubble button */}
      <motion.button
        className="chatbot-bubble"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close community assistant" : "Open community assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#143939" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#143939" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-left">
                <div className="chatbot-header-dot" />
                <h2 className="chatbot-header-title">Community Assistant</h2>
              </div>
              <button
                className="chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="#FFF4D2" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`chatbot-message ${message.role}`}>
                  <div className="chatbot-bubble-msg">{message.content}</div>
                </div>
              ))}
              {isLoading && (
                <motion.div
                  className="chatbot-typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chatbot-typing-dot" />
                  <div className="chatbot-typing-dot" />
                  <div className="chatbot-typing-dot" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                className="chatbot-input"
                type="text"
                placeholder="Ask about local events..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                maxLength={500}
              />
              <button
                className="chatbot-send-btn"
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke="#143939" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
