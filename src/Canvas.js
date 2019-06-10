import React, { useState, useRef, useEffect } from "react";

export default function Canvas(props) {
  const [frameCount, setFrameCount] = useState(0);
  const [timestamp, setTimestamp] = useState(0.0);
  const [circle, setCircle] = useState({
    x: 100,
    y: 75,
    direction: Math.random() * Math.PI,
    velocity: 2.0 + Math.random() * 5.0,
    radius: 10
  });
  const [cirlceTwo, setCircleTwo] = useState({
    x: 300,
    y: 200,
    direction: Math.random() * Math.PI,
    velocity: 2.0 + Math.random() * 5.0,
    radius: 10
  });

  const [rect, setRect] = useState({
    x: 10,
    y: 10,
    width: 10,
    height: 10
  });

  const [containerRef, canvasRef] = useCanvas((ctx, timestamp, frameId) => {
    setFrameCount(frameId);
    setTimestamp(timestamp);

    let direction = circle.direction;
    let velocity = circle.velocity;

    if (
      circle.x < circle.radius ||
      circle.x > ctx.canvas.width - circle.radius
    ) {
      direction = Math.PI - direction;
      velocity = 2.0 + Math.random() * 5.0;
      console.log(`horizontal collision! ${direction}`);
    }

    if (
      circle.y < circle.radius ||
      circle.y > ctx.canvas.height - circle.radius
    ) {
      direction = -direction;
      velocity = 2.0 + Math.random() * 5.0;
      //console.log(`vertical collision ${theta}`);
    }

    const [x, y] = [
      Math.cos(direction) * circle.velocity,
      Math.sin(direction) * circle.velocity
    ];

    setCircle(
      Object.assign(circle, {
        x: circle.x + x,
        y: circle.y + y,
        direction,
        velocity
      })
    );

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.stroke();
  });

  return (
    <div ref={containerRef} id="canvas-container">
      <canvas ref={canvasRef} id="canvas" width="1024" height="640" />
    </div>
  );
}

function useCanvas(draw) {
  const canvas = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    let frameId = window.requestAnimationFrame(renderFrame);

    function renderFrame(timestamp) {
      frameId = window.requestAnimationFrame(renderFrame);
      resizeCanvas();
      draw(ctx, timestamp, frameId);
    }

    function resizeCanvas() {
      canvas.current.width = container.current.clientWidth;
      canvas.current.height = container.current.clientHeight;
    }

    resizeCanvas();

    return () => window.cancelAnimationFrame(frameId);
  });

  return [container, canvas];
}
