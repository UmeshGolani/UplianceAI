import { Route, Routes } from "react-router-dom";
import BezierCurve from "./Components/BezierCurve";
import Login from "./Components/GoogleLogin";
import RichTextEditor from "./Components/RichTextEditor";
import UserForm from "./Components/UserForm";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <BezierCurve />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-form"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <RichTextEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
