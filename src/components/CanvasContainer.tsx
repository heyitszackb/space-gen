// CanvasContainer.js
import React, { useState } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "../sketch";

function CanvasContainer() {
  const [skyColor, setSkyColor] = useState(0);

  const handleClick = () => {
    setSkyColor(Math.random() * 360);
  };

  return (
    <>
      <ReactP5Wrapper sketch={sketch} skyColor={skyColor} />
      <button onClick={handleClick}>Rotate</button>
    </>
  );
}

export default CanvasContainer;