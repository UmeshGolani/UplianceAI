import { animated, useSpring } from "react-spring";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 200,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <animated.div style={cardAnimation} className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Bezier Curve Counter</h2>
          <p>Animated counter using React Spring</p>
          <Link to="/curve" className="text-blue-500">Go to Counter</Link>
        </animated.div>

        <animated.div style={cardAnimation} className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">User Registration</h2>
          <p>Register new users with Redux state</p>
          <Link to="/user-form" className="text-blue-500">Go to Form</Link>
        </animated.div>

        <animated.div style={cardAnimation} className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Rich Text Editor</h2>
          <p>Save and edit documents easily</p>
          <Link to="/editor" className="text-blue-500">Go to Editor</Link>
        </animated.div>
      </div>
    </div>
  );
}
