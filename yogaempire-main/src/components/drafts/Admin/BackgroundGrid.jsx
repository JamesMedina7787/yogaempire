import React from "react";
import Block from "./Block";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const GRID_SIZE = 50; // Define grid snapping size

const BackgroundGrid = ({ blocks, updateBlock, deleteBlock, setSelectedBlockId }) => {
  const [, drop] = useDrop({
    accept: "block",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const gridRect = document.querySelector(".background-grid").getBoundingClientRect();
      if (offset && gridRect) {
        const snappedX = Math.round((offset.x - gridRect.left) / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round((offset.y - gridRect.top) / GRID_SIZE) * GRID_SIZE;
        updateBlock(item.id, { x: snappedX, y: snappedY });
      }
    },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={drop}
        className="background-grid relative bg-gray-200 mx-auto"
        style={{
          width: "100%", // Full width
          height: "1000px", // Fixed height
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          backgroundImage:
            "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            updateBlock={updateBlock}
            deleteBlock={deleteBlock}
            setSelectedBlockId={setSelectedBlockId}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BackgroundGrid;
