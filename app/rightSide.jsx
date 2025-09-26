'use client';

import { useState, useEffect } from 'react';

import FormattedMessage from '../utils/component/FormattedMessage';

export default function RightSide({ id: chatId }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoad, setFetchLoad] = useState(false);
  const handleChange = (e) => {
    setText(e.target.value);
  };

  //FETCH CHATS OF THE SELECTED ID
  useEffect(() => {
    if (!chatId) return;
    setFetchLoad((prev) => !prev);
    // Fetch messages for the current chatId
    fetch(`/api/message?chatId=${chatId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setMessages(data);
          setFetchLoad((prev) => !prev);
        } else console.error(data.error);
      })
      .catch((err) => console.error('Failed to fetch messages', err));
  }, [chatId]);

  //SUBMIT CHAT HANDLING
  const handleSubmit = async () => {
    if (!text.trim() || isLoading) return;

    const userMessage = { sender: 'user', text, chatId: chatId };
    let botMessage = { sender: 'bot', text: '', chatId: chatId };

    setIsLoading(true); // start loading

    //API RESPONSE
    try {
      const res = await fetch('https://apifreellm.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          message: userMessage.text,
        }),
      });
      const data = await res.json();
      botMessage.text = data.response;
    } catch (err) {
      console.error('Failed to fetch advice', err);
      botMessage.text = 'Sorry, I couldn’t fetch advice.';
    }

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setText('');
    setIsLoading(false); // stop loading

    //UPDATING IN DATABASE
    try {
      await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([userMessage, botMessage]),
      });
    } catch (err) {
      console.error('Failed to save messages to DB', err);
    }
  };

  return (
    <div className="flex">
      <div className="mr-2 h-[100vh] w-[15%] min-w-[110px]"></div>
      <div className="max-w m-2 mr-4 flex h-full w-[85%] flex-col rounded-xl border border-gray-600 bg-gradient-to-br from-gray-600 to-gray-900 p-2 text-xs shadow-2xl md:p-6 md:text-base">
        {chatId !== 0 ? (
          <>
            <h1 className="text-center text-2xl font-bold">{`Chat ${chatId}`}</h1>
            <div className="rounded-lg bg-gray-700 p-1 shadow-inner md:mb-6 md:p-4">
              <div className="flex items-center gap-3">
                <input
                  value={text}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  className="w-full flex-1 rounded-lg border-2 border-gray-500 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
            {fetchLoad ? (
              <>
                <h1 className="text-center text-2xl">Fetching chats</h1>
              </>
            ) : (
              <>
                <div className="bg-gray-750 flex-1 overflow-y-auto rounded-lg p-1 md:p-4">
                  <h2 className="mb-1 border-b border-gray-600 pb-2 font-bold text-white md:mb-4">
                    Conversation
                  </h2>
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={
                            msg.sender === 'user'
                              ? 'max-w-md rounded-2xl rounded-br-md bg-blue-600 p-2 text-white shadow-lg md:p-4'
                              : 'max-w-md rounded-2xl rounded-bl-md bg-gray-600 p-2 text-gray-100 shadow-lg md:p-4'
                          }
                        >
                          <div className="mb-1 font-semibold opacity-75">
                            {msg.sender === 'user' ? 'You' : 'Assistant'}
                          </div>
                          <FormattedMessage text={msg.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-xl text-gray-300">
              <div className="mb-4 text-6xl">💬</div>
              <div className="mb-2 font-semibold">Welcome to Chat</div>
              <div>Create a new chat to get started</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
