"use client";
import { useState, useEffect } from "react";

function Page() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => setText(e.target.value);
  console.log("Page component mounted");


  const handleSubmit = async () => {
     console.log("Handle submit fired, text:", text);
  if (!text.trim()) return;
  
    
  const userMessage = { sender: "user", text };
  setText("");

  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data)
    const botMessage = { sender: "bot", text: data.slip.advice };

    // Add both user + bot message together
    setMessages((prev) => [...prev, userMessage, botMessage]);
  } catch (err) {
    console.error("Failed to fetch advice", err);
    setMessages((prev) => [
      ...prev,
      userMessage,
      { sender: "bot", text: "Sorry, I couldn’t fetch advice." },
    ]);
  }

  // Save user message in DB
  await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userMessage),
  });
};


  // Initial fetch of saved messages
  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  return (
    <>
      <div>
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
        />
        <button onClick={handleSubmit}>Send</button>
      </div>

      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, i) => (
            <li key={i} className = {msg.sender !== "user" ? "text-blue-600" : "text-white"} >
             <strong>{msg.sender}:</strong> {msg.text}
        </li>

          ))}
        </ul>
      </div>
    </>
  );
}

export default Page;
