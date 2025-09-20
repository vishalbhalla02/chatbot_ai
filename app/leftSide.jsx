"use client";
import React, { useState } from "react";
import { useEffect } from "react";

export default function LeftSide({ onSelect }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chat");
        const result = await response.json();
        let chats = [];

        // Start from 1 and go up to result (inclusive)
        for (let i = 1; i <= result; i++) {
          chats.push({ index: i }); // Fixed: 'chats' not 'chat'
        }

        setChats(chats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function addNewChat() {
    const newId = chats.length > 0 ? chats[chats.length - 1].index + 1 : 1;
    console.log("Creating chat with ID:", newId);

    const newChatData = { index: newId };
    console.log(newChatData);

    try {
      // Save to database first
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChatData),
      });

      console.log("left response", response);

      if (response.ok) {
        // Only update local state if database save was successful
        setChats((prev) => [...prev, newChatData]);
        console.log("New chat added to database and state");
      } else {
        console.error("Failed to create chat in database");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }

  return (
    <div>
      <h2>Chat history</h2>
      <button className="cursor-pointer" onClick={addNewChat}>
        New Chat
      </button>
      <ul>
        {chats.map((chat, id) => (
          <li
            key={id}
            onClick={() => {
              if (onSelect) onSelect(chat.index);
            }}
            className="cursor-pointer"
          >
            {`Chat ${chat.index}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
