import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import BackgroundGrid from "./Admin/BackgroundGrid";
import ShapeDesigner from "./Design/ShapeDesigner";
import Toolbar from "./Admin/Toolbar";

const AdminPanel = () => {
  const [blocks, setBlocks] = useState([]); // Blocks on the grid
  const [selectedBlockId, setSelectedBlockId] = useState(null); // Currently selected block

  // Load blocks from localStorage
  useEffect(() => {
    const savedBlocks = JSON.parse(localStorage.getItem("blocks"));
    if (savedBlocks) setBlocks(savedBlocks);
  }, []);

  // Save blocks to localStorage
  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  // Create a new block
  const createBlock = (type) => {
    const newBlock = {
      id: uuidv4(),
      type,
      content: type === "message" ? "Edit me!" : "",
      backgroundColor: "#3498db",
      borderRadius: 0,
      width: 200,
      height: 200,
      x: 0,
      y: 0,
      zIndex: 1,
      animation: "",
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Update block properties
  const updateBlock = (id, updatedProperties) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updatedProperties } : block))
    );
  };

  // Delete a block
  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="admin-panel">
        {/* Toolbar */}
        <Toolbar createBlock={createBlock} />

        {/* Shape Designer */}
        {selectedBlock && (
          <div className="fixed top-20 left-4 bg-white shadow-lg z-50 p-4 rounded-md">
            <ShapeDesigner
              block={selectedBlock}
              onUpdate={(updatedBlock) => updateBlock(selectedBlock.id, updatedBlock)}
            />
          </div>
        )}

        {/* Background Grid */}
        <BackgroundGrid
          blocks={blocks}
          updateBlock={updateBlock}
          deleteBlock={deleteBlock}
          setSelectedBlockId={setSelectedBlockId}
        />
      </div>
    </DndProvider>
  );
};

export default AdminPanel;
