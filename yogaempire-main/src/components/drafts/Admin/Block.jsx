import React from "react";
import { useDrag } from "react-dnd";

const GRID_SIZE = 50; // Define grid snapping size

const Block = ({ block, updateBlock, deleteBlock, setSelectedBlockId }) => {
  // Enable dragging functionality
  const [, drag] = useDrag({
    type: "block",
    item: { id: block.id },
    end: (item, monitor) => {
      const offset = monitor.getSourceClientOffset(); // Get the final position
      const gridRect = document.querySelector(".background-grid").getBoundingClientRect(); // Get grid bounds

      if (offset && gridRect) {
        // Snap the block to the grid
        const snappedX = Math.round((offset.x - gridRect.left) / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round((offset.y - gridRect.top) / GRID_SIZE) * GRID_SIZE;

        updateBlock(item.id, { x: snappedX, y: snappedY });
      }
    },
  });

  return (
    <div
      ref={drag}
      onClick={() => setSelectedBlockId(block.id)}
      className="block absolute border shadow-lg cursor-pointer"
      style={{
        top: block.y || 0,
        left: block.x || 0,
        width: block.width,
        height: block.height,
        backgroundColor: block.backgroundColor,
        borderRadius: `${block.borderRadius}%`,
        zIndex: block.zIndex,
      }}
    >
      {/* Block-specific content */}
      {block.type === "message" && (
        <textarea
          value={block.content}
          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            border: "none",
            background: "transparent",
          }}
        />
      )}
      {block.type === "image" && block.content && (
        <img
          src={block.content}
          alt="Block"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {block.type === "video" && block.content && (
        <iframe
          title="YouTube Video"
          width="100%"
          height="100%"
          src={block.content.replace("watch?v=", "embed/")}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      {block.type === "button" && (
        <button
          onClick={() =>
            updateBlock(block.id, { animation: "bounce 1s infinite" })
          }
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trigger Animation
        </button>
      )}

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click bubbling
          deleteBlock(block.id);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
      >
        ✕
      </button>
    </div>
  );
};

export default Block;
