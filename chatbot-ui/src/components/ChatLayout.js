import React, { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import Loading from "./Loading";
import Sidebar from "./Sidebar";

const ChatLayout = () => {
  const [sessions, setSessions] = useState([]);
  const userId = "user123"; // Replace with the actual user ID
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/chatbot/sessions/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  const fetchSession = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/chatbot/session/${sessionId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch session");
      }
      const data = await response.json();
      setSessionId(sessionId);
      setMessages(
        data.interactions.flatMap((interaction) => [
          { sender: "bot", text: interaction.question },
          ...(interaction.answer
            ? [{ sender: "user", text: interaction.answer }]
            : []),
        ])
      );
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/chatbot/session/${sessionId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete session");
      }
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
      if (sessionId === sessionId) {
        setSessionId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/chatbot/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to start chat");
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages([{ sender: "bot", text: data.question }]);
      setSessions((prevSessions) => [
        ...prevSessions,
        {
          _id: data.sessionId,
          startTime: new Date().toISOString(),
          interactions: [{ question: data.question, answer: null }],
        },
      ]);
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-800 text-white font-roboto">
      <Sidebar
        sessions={sessions}
        fetchSession={fetchSession}
        deleteSession={deleteSession}
        startNewSession={startNewSession}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 pt-16">
        {loading ? (
          <Loading />
        ) : (
          <ChatPage
            userId={userId}
            sessionId={sessionId}
            setSessionId={setSessionId}
            messages={messages}
            setMessages={setMessages}
            startNewSession={startNewSession}
          />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
