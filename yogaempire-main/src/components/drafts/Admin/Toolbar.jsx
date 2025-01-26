import React from "react";

const Toolbar = ({ createBlock }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-[200] p-4 flex gap-4 justify-center">
      <button
        onClick={() => createBlock("message")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Message
      </button>
      <button
        onClick={() => createBlock("image")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Image
      </button>
      <button
        onClick={() => createBlock("video")}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Add Video
      </button>
      <button
        onClick={() => createBlock("button")}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Add Button
      </button>
    </div>
  );
};

export default Toolbar;
