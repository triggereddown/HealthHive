import React, { useState } from "react";
import { assets } from "../assets/assets";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ChatBotIcon = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [resize, setResize] = useState({
    width: 400,
    height: 350,
    offsetX: 0,
    offsetY: 0,
  });

  const createHealthChatPrompt = (input) => {
    return `
       You are HealthHive, a friendly and supportive AI companion designed to offer mental health support and lifestyle advice.
    
    Your task is to provide the user with a concise, empathetic, and practical response in 4-5 lines. Your tone should be warm, encouraging, and non-judgmental. Here's how you should structure your response:
    
    1. Acknowledge the user's concern with empathy.
    2. Provide a brief piece of advice or actionable steps.
    3. Offer gentle encouragement or motivation.
    4. If necessary, remind the user to consult a healthcare professional for further guidance.
    
    Keep your response short, clear, and focused on helping the user feel supported. Avoid lengthy explanations or overly technical language.
    
    Here is what the user said: "${input}"
    `;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { type: "user", message: input }];
    setChat(newChat);
    setInput("");

    const healthChatPrompt = createHealthChatPrompt(input);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: healthChatPrompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const responseBody = await response.json();
      console.log("API Response:", responseBody);

      const botMessage =
        responseBody?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "❌ Something went wrong. Try again later.";

      setChat([...newChat, { type: "bot", message: botMessage }]);
    } catch (err) {
      console.error("Gemini error:", err);
      setChat([
        ...newChat,
        { type: "bot", message: "❌ Something went wrong. Try again later." },
      ]);
    }
  };

  const handleResize = (e) => {
    const newWidth = resize.width + (resize.offsetX - e.clientX);
    const newHeight = resize.height + (resize.offsetY - e.clientY);

    if (newWidth > 200 && newHeight > 200) {
      setResize({
        width: newWidth,
        height: newHeight,
        offsetX: e.clientX,
        offsetY: e.clientY,
      });
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setResize({
      ...resize,
      offsetX: e.clientX,
      offsetY: e.clientY,
    });

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleResize);
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-2 rounded-full cursor-pointer z-40"
        onClick={toggleChat}
      >
        {isOpen ? null : "💬"}
      </div>

      {isOpen && (
        <div
          className="fixed bottom-4 right-4 bg-blue-100 shadow-lg rounded-lg border border-gray-700 z-40 flex flex-col"
          style={{ width: resize.width, height: resize.height }}
        >
          <div
            className="absolute top-0 right-0 bg-white text-white p-1 rounded-full cursor-pointer z-50 border border-gray-700"
            onClick={toggleChat}
          >
            ❌
          </div>

          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto border-b p-2">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`my-1 p-2 rounded ${
                    msg.type === "user"
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-100 self-start"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            <div className="flex items-center border-t pt-2">
              <input
                type="text"
                className="flex-1 border border-gray-700 rounded-l px-2 py-2 focus:outline-none"
                placeholder="Talk to your AI Friend HealthHive..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>

          <div
            className="resize-handle"
            onMouseDown={handleMouseDown}
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#000",
              position: "absolute",
              bottom: "0",
              right: "0",
              cursor: "nw-resize",
            }}
          >
            <img
              src={assets.logout_icon}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotIcon;
