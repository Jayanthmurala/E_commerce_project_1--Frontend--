import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../Api";
import endPoints from "../../../Api/endPoints";
import { toast } from "react-hot-toast";

const Otp = () => {
  const [formData, setFormData] = useState({ otp: "" });
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state?.email === undefined) {
    navigate("/auth/login");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...endPoints.otp,
        data: {
          email: location?.state?.email,
          otp: formData.otp,
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/auth/forgotPassword/resetpassword", {
          state: {
            email: location?.state?.email,
          },
        });
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
          Enter OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              otp:
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.password}
              onChange={handleChange}
              placeholder="enter you 6 digits number"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify
          </button>
          <p>
            Don't Have Account
            <span className="text-blue-600">
              <Link to="/auth/login">Login</Link>
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Otp;
