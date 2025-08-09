import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken } from "../../Features/Tab/TokenReducer";
import { Toaster,toast } from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    fetch(import.meta.env.VITE_API_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: formData.name,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          dispatch(setToken(data.token));
          navigate("/admin/dashboard/pages");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Toaster />
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to manage your content
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {/* Username Input */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-light text-gray-600 block"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 font-light"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-light text-gray-600 block"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 font-light"
                placeholder="Enter your password"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 font-light"
                >
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-600 font-light"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-light
                hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
