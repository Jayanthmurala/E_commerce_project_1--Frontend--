import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Api";
import endPoints from "../../Api/endPoints";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...endPoints.login,
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        toast.success(res.data.message);

        // ✅ Fetch user details after login
        const userRes = await Axios({
          url: "/aip/v1/user/user-details",
          method: "GET",
        });

        if (userRes.status === 200) {
          dispatch(setUser(userRes.data?.Data));
          const role = userRes.data?.Data?.role;
          if (role === "Vendor" || role === "admin") {
            navigate("/vendor");
          } else {
            navigate("/");
          }
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="container max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <span className="text-blue-600">
              <Link to="/auth/forgotPassword">Forgot Password?</Link>
            </span>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center">
            Don't Have an Account?{" "}
            <span className="text-blue-600">
              <Link to="/auth/register">Register</Link>
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
