import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const ChatPage = ({
  userId,
  sessionId,
  setSessionId,
  messages,
  setMessages,
  startNewSession,
}) => {
  const [input, setInput] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setChatStarted(true);
    }
  }, [sessionId]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    // Send message to server
    try {
      const response = await fetch("http://localhost:5001/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, answer: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.question };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto bg-gray-800 rounded-lg p-4">
      {!chatStarted ? (
        <div className="flex flex-col items-center justify-center flex-1 min-h-screen">
          <button
            onClick={startNewSession}
            className="py-2 px-4 bg-green-400 text-gray-900 rounded-lg text-lg"
          >
            Start New Session
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start my-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="h-8 w-8 rounded-full mr-2 text-green-400"
                  />
                )}
                <div
                  className={`p-4 m-2 max-w-xl ${
                    msg.sender === "user"
                      ? "bg-gray-700 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg"
                      : "bg-green-400 text-gray-900 rounded-bl-lg rounded-tr-lg rounded-br-lg"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="h-8 w-8 rounded-full ml-2 text-green-400"
                  />
                )}
              </div>
            ))}
            {loading && <Loading />}
          </div>
          <div className="sticky bottom-0 p-4 bg-gray-800 w-full mx-auto">
            <div className="flex items-center justify-center max-w-3xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 rounded-l-lg bg-gray-800 text-white border border-gray-700"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-green-400 text-gray-900 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
