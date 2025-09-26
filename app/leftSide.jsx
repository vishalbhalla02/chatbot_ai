'use client';
import React, { useState, useEffect } from 'react';

export default function LeftSide({ onSelect, id }) {
  const [chats, setChats] = useState([]);
  const [chatState, setChatState] = useState(0);
  const chatStates = ['Fetching Chats', 'Creating Chat', 'Add Chat'];
  // chat structure
  // {
  //   index : 1
  // }
  // //Run once only

  useEffect(() => fetchData(), []);

  // //Fetch existing chats
  const fetchData = async () => {
    try {
      const response = await fetch('/api/chat');
      const result = await response.json();
      console.log(result);

      const fetched_chats = result.map((item) => ({ index: item.index }));
      console.log('fetched chats', fetched_chats);

      setChats(fetched_chats);
      setChatState(2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // //Delete a caht
  async function deleteChat(chatId) {
    try {
      const response = await fetch('/api/chat', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: chatId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      fetchData();

      // Return success status
      return { success: true, message: result };
    } catch (error) {
      console.error('Error deleting chat:', error);

      // Return error status
      return { success: false, error: error.message };
    }
  }

  //DELVELOPMENT DELETE CHAT
  // async function deleteChat(chatId) {
  //   const newItems = chats.filter((item) => item.index !== chatId);

  //   setChats(newItems);
  // }

  //Add new chat
  async function addNewChat() {
    const newId = chats.length > 0 ? chats[chats.length - 1].index + 1 : 1;
    const newChatData = { index: newId };
    setChatState(1);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChatData),
      });

      if (response.ok) {
        setChats((prev) => [...prev, newChatData]);
        setChatState(2);
        return newId;
      } else {
        console.error('Failed to create chat in database');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  }

  //DEVELOPMENT ADD CHAT
  // async function addNewChat() {
  //   const newId = chats.length > 0 ? chats[chats.length - 1].index + 1 : 1;
  //   const newChatData = { index: newId };
  //   setChats((prev) => [...prev, newChatData]);
  // }

  return (
    <div className="fixed top-0 left-0 flex h-[100vh] w-[15%] min-w-[110px] flex-col items-center rounded-r-2xl bg-gray-800 p-1 text-white lg:p-4">
      <h2 className="mb-4 w-full border-b border-gray-600 pb-1 text-center text-base font-semibold lg:pb-2 lg:text-2xl">
        Chat History
      </h2>
      <button
        onClick={async () => {
          const newId = await addNewChat();
          onSelect(newId);
          // console.log(newId);
        }}
        className="mb-2 w-full cursor-pointer rounded-full bg-blue-500 py-2 text-center font-medium text-white shadow-md transition-colors hover:bg-blue-600 lg:mb-6 lg:px-4"
      >
        {chatStates[chatState]}
      </button>
      <ul className="flex w-full flex-col gap-2">
        {chats.map((chat) => (
          <li
            key={chat.index}
            className={`flex items-center justify-evenly rounded-xl px-3 text-center shadow-sm transition-colors hover:bg-gray-700 lg:py-2 ${
              id === chat.index && 'bg-gray-600'
            }`}
          >
            <button
              onClick={() => onSelect && onSelect(chat.index)}
              className="w-3/4 cursor-pointer text-white"
            >{`Chat ${chat.index}`}</button>
            <button
              onClick={() => deleteChat(chat.index)}
              className="hover:bg-opacity-20 ml-2 cursor-pointer rounded-full p-1 transition-colors group-hover:opacity-100 hover:bg-red-500"
              title="Delete chat"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
