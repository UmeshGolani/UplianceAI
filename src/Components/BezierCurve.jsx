import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const BezierCurve = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [count, setCount] = useState(5);
  const [control] = useState({ x: 50, y: 50 });
  const [end] = useState({ x: 90, y: 80 });

  const start = { x: 0, y: 100 };

  // Function to get dynamic background color based on count
  const getBackgroundColor = () => {
    const hue = (count * 5) % 360;
    return `hsl(${hue}, 80%, 70%)`;
  };

  // React Spring for background color transition
  const bgAnimation = useSpring({
    backgroundColor: getBackgroundColor(),
    config: { duration: 500 } // Smooth transition duration
  });

  // React Spring for SVG size transition
  const svgAnimation = useSpring({
    width: (windowSize.width * count) / 100,
    height: (windowSize.height * count) / 100,
    config: { tension: 200, friction: 20 }
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <animated.div
      className="fixed bottom-0 left-0 w-screen h-screen flex flex-col items-center justify-center p-4 transition-all"
      style={bgAnimation}
    >
      {/* Count Adjuster */}
      <div className="flex items-center gap-4 bg-white p-2 rounded shadow">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCount((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <p className="text-lg font-semibold">{count}</p>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCount((prev) => Math.min(80, prev + 1))}
        >
          +
        </button>
      </div>

      {/* SVG with Animated Size */}
      <animated.svg
        style={svgAnimation}
        className="mt-4"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
          stroke="black"
          strokeWidth="1"
          fill="transparent"
        />
        <line
          x1={start.x}
          y1={start.y}
          x2={control.x}
          y2={control.y}
          stroke="gray"
          strokeDasharray="2,2"
        />
        <line
          x1={control.x}
          y1={control.y}
          x2={end.x}
          y2={end.y}
          stroke="gray"
          strokeDasharray="2,2"
        />
        <circle cx={control.x} cy={control.y} r="2" fill="red" />
        <circle cx={start.x} cy={start.y} r="2" fill="blue" />
        <circle cx={end.x} cy={end.y} r="2" fill="blue" />
      </animated.svg>
    </animated.div>
  );
};

export default BezierCurve;
