import React, { useState, useEffect } from "react";
import CalendarGrid from "./Calendar/CalendarGrid";
import MediaUploader from "./Media/MediaUploader";
import ShapeDesigner from "./Design/ShapeDesigner";

const AdminPanel = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [activeBlock, setActiveBlock] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const mockBlocks = [
          { id: 1, zIndex: 1, name: "Block 1" },
          { id: 2, zIndex: 2, name: "Block 2" },
        ];
        setBlocks(mockBlocks);
      } catch (error) {
        console.error("Failed to fetch blocks:", error);
      }
    };
    fetchBlocks();
  }, []);

  const onUpdate = (updatedBlock) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.id === updatedBlock.id ? updatedBlock : block))
    );
  };

  const onGroup = (block) => console.log("Group block:", block);
  const onUngroup = (block) => console.log("Ungroup block:", block);

  const onDelete = (blockId) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== blockId));
  };

  return (
    <div className="admin-panel">
      <h1 className="text-3xl font-bold text-center my-6">
        Welcome to the Yoga Empire Admin Panel
      </h1>
      {showMenu && activeBlock && (
        <div className="block-menu">
          <h2>Menu for {activeBlock.name}</h2>
          <button onClick={() => onUpdate({ ...activeBlock, zIndex: activeBlock.zIndex + 1 })}>
            Bring to Front
          </button>
          <button onClick={() => onUpdate({ ...activeBlock, zIndex: activeBlock.zIndex - 1 })}>
            Send to Back
          </button>
          <button onClick={() => onGroup(activeBlock)}>Group</button>
          <button onClick={() => onUngroup(activeBlock)}>Ungroup</button>
          <button onClick={() => onDelete(activeBlock.id)}>Delete</button>
          <button onClick={() => setShowMenu(false)}>Close Menu</button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-6 p-6">
      <div className="calendar-section col-span-2">
          <CalendarGrid />
        </div>
        <div className="media-social-section col-span-1 space-y-6">
          <MediaUploader />
        </div>
        <div className="zoom-design-section col-span-3 space-y-6">
          <ShapeDesigner />
        </div>
      </div>
      <div className="block-container">
        <h2 className="text-xl font-bold mt-6">Blocks</h2>
        {blocks.map((block) => (
          <div
            key={block.id}
            className="block-item border p-2 m-2 cursor-pointer"
            style={{ zIndex: block.zIndex }}
            onClick={() => {
              setActiveBlock(block);
              setShowMenu(true);
            }}
          >
            {block.name} (zIndex: {block.zIndex})
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
