import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { StateContext } from "../../context/StateProvider";
import axiosClient from "../../utils/axiosClient";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("auth/login", formData);
      dispatch({
        type: "SET_USER",
        payload: { token: response.data.token, user: response.data.user },
      });
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
      toastr.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toastr.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <div className="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent">
          <span
            className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
            id="basic-addon3"
          >
            <Mail size={16} />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
            placeholder="Enter Email"
            aria-label="Enter Email"
            aria-describedby="basic-addon3"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="float-right">
          <Link to="#" className="text-gray-500 text-13 hover:underline">
            Forgot password?
          </Link>
        </div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <div className="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent relative">
          <span
            className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
            id="basic-addon4"
          >
            <Lock size={16} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200 pr-10"
            placeholder="Enter Password"
            aria-label="Enter Password"
            aria-describedby="basic-addon4"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="border-gray-100 rounded focus:ring-1 checked:ring-1 focus:ring-offset-0 focus:outline-0 checked:bg-violet-500 dark:bg-zinc-600 dark:border-zinc-600 dark:checked:bg-violet-500"
          id="remember-check"
        />
        <label
          className="font-medium text-gray-700 ltr:ml-2 rtl:mr-2 dark:text-gray-200 ms-2"
          htmlFor="remember-check"
        >
          Remember me
        </label>
      </div>

      <div className="grid">
        <button
          className="py-2 text-white border-transparent btn bg-violet-500 hover:bg-violet-600 text-16"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Login;
