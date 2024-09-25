import { faBars, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Sidebar = ({
  sessions,
  fetchSession,
  deleteSession,
  startNewSession,
  isOpen,
  toggleSidebar,
}) => {
  const formatDate = (dateString) => {
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return `${date.toLocaleDateString(
      "en-GB",
      dateOptions
    )} ${date.toLocaleTimeString("en-GB", timeOptions)}`;
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 fixed top-0 left-0 right-0 z-50 ">
        <h2 className="text-xl font-bold text-white ">Sessions</h2>
        <button onClick={toggleSidebar} className="text-white">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-800  z-50 transform px-4 gap-2 border-r border-gray-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:bg-opacity-100 md:z-auto md:flex md:flex-col md:w-72 md:p-4 md:overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-4 md:hidden ">
          <h2 className="text-xl font-bold text-white ">Sessions</h2>

          <button onClick={toggleSidebar} className="text-white">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center my-4 ">
          <button
            onClick={startNewSession}
            className="py-2 px-4 bg-green-400 text-gray-900 rounded-lg text-lg"
          >
            Start New Session
          </button>
        </div>
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 p-4">
            <p>No sessions available</p>
          </div>
        ) : (
          <ul>
            {sessions.map((session) => (
              <li
                key={session._id}
                className="mb-2 flex justify-between items-center"
              >
                <button
                  className="flex-1 text-left p-2 hover:bg-gray-700 rounded-lg"
                  onClick={() => {
                    fetchSession(session._id);
                    toggleSidebar();
                  }}
                >
                  {formatDate(session.startTime)}
                </button>
                <button
                  className="ml-2 p-2 text-gray-400 rounded-lg"
                  onClick={() => deleteSession(session._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
