import React, { useState, useRef, useEffect } from "react";
import { Engine, Render, World, Bodies, Body, Common } from "matter-js";

export default function Renderer() {
  const container = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const engine = Engine.create();
    engine.world.gravity.y = 0;
    const render = Render.create({
      elemenet: container.current,
      canvas: canvas.current,
      engine,
      options: {
        wireframes: false
      }
    });
    function wall(x, y, width, height) {
      return Bodies.rectangle(
        width / 2.0 + x,
        height / 2.0 + y,
        width,
        height,
        { isStatic: true }
      );
    }

    function percentX(percent) {
      return Math.round((percent / 100) * canvas.current.innerWidth);
    }
    function percentY(percent) {
      return Math.round((percent / 100) * canvas.current.innerHeight);
    }

    const wallThickness = 50;
    const wallWidth = 720; //canvas.current.innerWidth;
    const wallHeight = 720; //canvas.current.innerHeight;

    const walls = [
      wall(0, 0, wallWidth, wallThickness),
      wall(0, 0, wallThickness, wallHeight),
      wall(wallWidth, 0, wallThickness, wallHeight),
      wall(0, wallHeight, wallWidth + wallThickness, wallThickness)
    ];

    World.add(engine.world, walls);

    const organisms = [
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 1.0
      }),
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 0.8
      }),
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 0.8
      }),
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 0.8
      }),
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 0.8
      }),
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 0.8
      }),
      Bodies.circle(Common.random(25, 680), Common.random(25, 680), 20, {
        restitution: 0.8
      })
    ];

    for (const p of organisms) {
      Body.setAngle(p, 2.0 + Common.random(-10, 10));
      Body.setVelocity(p, {
        x: Common.random(-10, 10),
        y: Common.random(-10, 10)
      });
    }

    World.add(engine.world, organisms);

    // World.add(engine.world, [boxA, boxB]);

    function resizeCanvas() {
      canvas.current.width = container.current.clientWidth;
      canvas.current.height = container.current.clientHeight;
    }

    function run() {
      window.requestAnimationFrame(run);
      resizeCanvas();
      for (const p of organisms) {
        if (
          Math.abs(p.velocity.x).toFixed(1) == "0.0" ||
          Math.abs(p.velocity.y).toFixed(1) == "0.0"
        ) {
          // const x = Math.random() * 0.25 - 0.13;
          // const y = Math.random() * 0.25 - 0.13;
          // Body.applyForce(p, p.position, { x, y });
          organisms.splice(organisms.indexOf(p), 1);
          World.remove(engine.world, p);
        }
      }

      if (Math.random() > 0.9) {
        const p = Bodies.circle(
          Common.random(25, 680),
          Common.random(25, 680),
          20,
          {
            restitution: 0.8
          }
        );
        Body.setAngle(p, 2.0 + Common.random(-10, 10));
        Body.setVelocity(p, {
          x: Common.random(-10, 10),
          y: Common.random(-10, 10)
        });
        organisms.push(p);
        World.addBody(engine.world, p);
      }

      Engine.update(engine, 1000 / 60);
      Render.world(render);
    }

    run();
  });

  return (
    <div ref={container} id="canvas-container">
      <canvas ref={canvas} id="canvas" width="1024" height="640" />
    </div>
  );
}
