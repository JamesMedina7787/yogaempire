import React, { useState } from "react";

const ShapeDesigner = ({ block, onUpdate }) => {
  const [shape, setShape] = useState(block);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShape((prev) => ({
      ...prev,
      [name]: name === "borderRadius" || name === "width" || name === "height" ? parseInt(value) : value,
    }));
  };

  const saveChanges = () => {
    onUpdate(shape);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Customize Block</h2>
      <div
        style={{
          width: `${shape.width}px`,
          height: `${shape.height}px`,
          borderRadius: `${shape.borderRadius}%`,
          backgroundColor: shape.backgroundColor,
          backgroundImage: shape.backgroundImage ? `url(${shape.backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="preview mb-4"
      />
      <div className="controls">
        <label>
          Width (px)
          <input
            type="range"
            name="width"
            min="50"
            max="500"
            value={shape.width}
            onChange={handleChange}
          />
        </label>
        <label>
          Height (px)
          <input
            type="range"
            name="height"
            min="50"
            max="500"
            value={shape.height}
            onChange={handleChange}
          />
        </label>
        <label>
          Border Radius (%)
          <input
            type="range"
            name="borderRadius"
            min="0"
            max="50"
            value={shape.borderRadius}
            onChange={handleChange}
          />
        </label>
        <label>
          Background Color
          <input
            type="color"
            name="backgroundColor"
            value={shape.backgroundColor}
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={saveChanges} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Save Changes
      </button>
    </div>
  );
};

export default ShapeDesigner;
