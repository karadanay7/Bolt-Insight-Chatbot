import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-green-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
