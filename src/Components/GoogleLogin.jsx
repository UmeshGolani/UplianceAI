import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const responseGoogle = async (response) => {
    const decoded = jwtDecode(response.credential);

    const userDetails = {
      name: decoded.given_name + " " + decoded.family_name,
      email: decoded.email,
      address: "",
      phone: "",
    };

    login(userDetails);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold">Sign in with Google</h2>
        <GoogleLogin onSuccess={responseGoogle} />
      </div>
    </div>
  );
};

export default Login;
