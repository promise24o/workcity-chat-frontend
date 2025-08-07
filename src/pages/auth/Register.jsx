import axios from "axios";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/auth/signup", formData);
      toastr.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toastr.error(error.response?.data?.message || "Registration failed!");
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
            id="basic-addon1"
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
            required
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <div className="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent relative">
          <span
            className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
            id="basic-addon2"
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

      <div className="mb-6">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Register as
        </label>
        <div className="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent">
          <span
            className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
            id="basic-addon3"
          >
            <UserPlus size={16} />
          </span>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border-gray-100 rounded rounded-l-none bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
            required
          >
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
            <option value="designer">Designer</option>
            <option value="agent">Agent</option>
          </select>
        </div>
      </div>

      <div className="grid">
        <button
          className="py-2 text-white border-transparent btn bg-violet-500 hover:bg-violet-600 text-16"
          type="submit"
        >
          Register
        </button>
      </div>

      <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-violet-500 hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
