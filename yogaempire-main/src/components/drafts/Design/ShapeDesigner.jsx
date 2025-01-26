import React, { useState } from "react";

const ShapeDesigner = () => {
  const [shape, setShape] = useState({
    width: 100,
    height: 100,
    borderRadius: 0,
    backgroundColor: "#3498db",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShape((prev) => ({
      ...prev,
      [name]: name === "width" || name === "height" || name === "borderRadius" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Shape Designer</h2>
      <div
        className="preview mb-4"
        style={{
          width: `${shape.width}px`,
          height: `${shape.height}px`,
          borderRadius: `${shape.borderRadius}%`,
          backgroundColor: shape.backgroundColor,
        }}
      />
      <div className="controls grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Width (px)</label>
          <input
            type="range"
            name="width"
            min="50"
            max="300"
            value={shape.width}
            onChange={handleChange}
            aria-label="Width"
          />
        </div>
        <div>
          <label className="block text-sm">Height (px)</label>
          <input
            type="range"
            name="height"
            min="50"
            max="300"
            value={shape.height}
            onChange={handleChange}
            aria-label="Height"
          />
        </div>
        <div>
          <label className="block text-sm">Border Radius (%)</label>
          <input
            type="range"
            name="borderRadius"
            min="0"
            max="50"
            value={shape.borderRadius}
            onChange={handleChange}
            aria-label="Border Radius"
          />
        </div>
        <div>
          <label className="block text-sm">Background Color</label>
          <input
            type="color"
            name="backgroundColor"
            value={shape.backgroundColor}
            onChange={handleChange}
            aria-label="Background Color"
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeDesigner;
