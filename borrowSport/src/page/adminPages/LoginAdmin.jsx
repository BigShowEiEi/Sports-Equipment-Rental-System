import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = "http://127.0.0.1:8000";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    if (adminToken) {
      navigate("/admin/home");
    }
    if (userToken) {
      navigate("/home");
    }

  }, [navigate]);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.role === "admin") {
        if (data.access_token) {
          localStorage.setItem("adminToken", data.access_token);
          localStorage.setItem("adminId", data.user_id);
          localStorage.setItem("adminName", data.username);

          Swal.fire({
            title: "Success!",
            text: "Login successful.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/admin/home");
              window.location.reload();
            }
          });
        } else {
          // setError("No token received");
          Swal.fire({
            title: "Error!",
            text: "No token received.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else if (data.role === "user") {
        if (data.access_token) {
          localStorage.setItem("userToken", data.access_token);
          localStorage.setItem("userId", data.user_id);
          localStorage.setItem("userName", data.username);

          Swal.fire({
            title: "Success!",
            text: "Login successful.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/admin/home");
              window.location.reload();
            }
          });
        } else {
          // setError("No token received");
          Swal.fire({
            title: "Error!",
            text: "No token received.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // setError("Failed to login");
      Swal.fire({
        title: "Error!",
        text: "Failed to login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="bg-gray-900 w-screen h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account (Admin)
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={Login}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username..."
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
