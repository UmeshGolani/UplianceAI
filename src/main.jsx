import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store.js";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='421840216061-3kp6qpankprrk7kq56ll4i990u159uga.apps.googleusercontent.com'>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
