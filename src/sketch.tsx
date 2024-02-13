import React, { useEffect, useState } from "react";
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps
} from "react-p5-wrapper";

type MySketchProps = SketchProps & {
  skyColor: number;
};

function sketch(p5: P5CanvasInstance<MySketchProps>) {
  let skyColor = 0;

  p5.setup = () => {
    p5.createCanvas(600, 400)
    p5.colorMode(p5.HSL);
};

  p5.updateWithProps = (props: { skyColor: number; }) => {
    skyColor = props.skyColor;
    console.log("Sketch props updated!")
  };

  p5.draw = () => {
    let bgColor = p5.color(skyColor, 40, 50);
    p5.background(bgColor);

  };
}
export default sketch;
