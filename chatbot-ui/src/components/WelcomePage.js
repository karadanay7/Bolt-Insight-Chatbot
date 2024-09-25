import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const startChat = () => {
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <img src="/logo.png" alt="Logo" className="h-32 mb-4" />
      <h1 className=" text-3xl md:text-5xl font-extrabold mb-4 text-green-400 font-playwrite">
        Welcome to
      </h1>
      <h1 className=" text-3xl md:text-5xl font-extrabold mb-4 text-green-400 font-playwrite">
        Bolt Insight Chatbot
      </h1>
      <p className="text-lg mb-8 ">
        Your personal AI chatbot for life coaching and advice.
      </p>
      <button
        onClick={startChat}
        className="py-2 px-4 bg-green-400 text-gray-900 rounded-lg text-lg hover:bg-green-500 hover:border-gray-600 border"
      >
        Start Chat
      </button>
    </div>
  );
};

export default WelcomePage;
