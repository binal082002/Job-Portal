import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useAuth} from "../store/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success("Login Successful!");
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", password: "" });
        setError(null);
        navigate("/jobs");
      } else {
        setError(res_data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-6 mt-5">Login Form</h1>

      <div className="border-2 border-amber-500 p-4">
        <div className="p-2">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
            value={user.email}
            onChange={handleInput}
          />
        </div>
        <div className="p-2">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="ml-4 p-1 border-2 border-gray-600 rounded-sm"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleInput}
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-lg py-2 px-4 mt-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Login
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}

      </div>
    </>
  );
};

export default Login;
