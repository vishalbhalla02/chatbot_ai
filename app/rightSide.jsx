"use client";

import { useState, useEffect } from "react";

export default function RightSide({ id: chatId }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  console.log("Right", chatId);

  // async function fetchChats() {
  //   try {
  //     // Mock data - simulating your Prisma response
  //     const mockData = [
  //       { sender: "bot", text: "Hello", chatId: chatId },
  //       { sender: "bot", text: "Bot", chatId: chatId },
  //     ];
  //     // Simulate API delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Set the data (replace entire array)
  //     setMessages(mockData);
  //   } catch (error) {
  //     console.error("Error fetching chats:", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchChats();
  // }, [chatId]);

  // const handleChange = (e) => setText(e.target.value);

  useEffect(() => {
    if (!chatId) return;

    // Fetch messages for the current chatId
    fetch(`/api/message?chatId=${chatId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setMessages(data);
        else console.error(data.error);
      })
      .catch((err) => console.error("Failed to fetch messages", err));
  }, [chatId]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text, chatId: chatId };
    setText("");

    let botMessage = { sender: "bot", text: "", chatId: chatId };

    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store",
      });
      const data = await res.json();
      botMessage.text = data.slip.advice;
    } catch (err) {
      console.error("Failed to fetch advice", err);
      botMessage.text = "Sorry, I couldn’t fetch advice.";
    }

    // Update local state
    setMessages((prev) => [...prev, userMessage, botMessage]);
    const temp = JSON.stringify([userMessage, botMessage]);
    console.log(temp);

    // Save to DB
    try {
      await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([userMessage, botMessage]),
      });
    } catch (err) {
      console.error("Failed to save messages to DB", err);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      {chatId !== 0 ? (
        <>
          <div className="mb-4">
            <input
              value={text}
              onChange={handleChange}
              placeholder="Enter message"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
            <button
              onClick={handleSubmit}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Messages:</h2>
            <ul className="space-y-2">
              {messages.map((msg, i) => (
                <li
                  key={i}
                  className={
                    msg.sender === "user"
                      ? "text-white bg-gray-800 p-2 rounded"
                      : "text-blue-600 bg-gray-100 p-2 rounded"
                  }
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          </div>{" "}
        </>
      ) : (
        <div>Create a chat</div>
      )}
    </div>
  );
}
