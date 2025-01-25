import React, { useState } from "react";

const AnimationPicker = () => {
  const [animation, setAnimation] = useState("bounce");

  const animations = [
    "bounce",
    "pulse",
    "rotate",
    "fade",
    "zoom-in",
    "zoom-out",
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Animation Picker</h2>
      <div
        className={`animated-preview mb-4 ${animation}`}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#3498db",
        }}
      />
      <div className="controls">
        <label className="block text-sm mb-2">Choose Animation</label>
        <select
          value={animation}
          onChange={(e) => setAnimation(e.target.value)}
          className="block w-full px-3 py-2 border rounded"
        >
          {animations.map((anim) => (
            <option key={anim} value={anim}>
              {anim}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AnimationPicker;
