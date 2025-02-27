import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { animated, useSpring } from "react-spring";

export default function Header() {
  const { user, login, logout } = useAuth();
  
  // Animate header
  const animation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 300,
  });

  return (
    <animated.nav style={animation} className="bg-gray-900 p-4 text-white flex justify-between">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Counter</Link>
            <Link to="/user-form" className="hover:text-gray-300">User Form</Link>
            <Link to="/editor" className="hover:text-gray-300">Editor</Link>
          </>
        )}
        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <button onClick={() => login({ name: "User" })} className="bg-green-500 px-3 py-1 rounded">Login</button>
        )}
      </div>
    </animated.nav>
  );
}
