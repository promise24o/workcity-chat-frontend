// src/layouts/AuthLayout.jsx
import { useContext, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateProvider";

function AuthLayout() {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state.token && state.user) {
      navigate("/dashboard");
    } else if (!state.token || !state.user) {
      navigate("/login");
    }
  }, [state.token, state.user, navigate]);

  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-violet-100/30 dark:bg-zinc-700 flex items-center justify-center p-5 sm:p-24 lg:p-0 w-full h-full">
      <div className="grid items-center justify-center grid-cols-1 lg:grid-cols-12">
        <div className="mx-5 lg:mx-20 lg:col-start-5 lg:col-span-4">
          <div className="text-center mb-10">
            <Link to="/" className="block">
              <img
                src="/assets/images/logo-dark.png"
                alt="Workcity Logo"
                className="h-8 mx-auto dark:hidden"
              />
              <img
                src="/assets/images/logo-light.png"
                alt="Workcity Logo"
                className="h-8 mx-auto hidden dark:block"
              />
            </Link>
            <h4 className="mt-6 text-2xl font-bold text-gray-800 dark:text-gray-50">
              {isLogin ? "Login" : "Register"}
            </h4>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              {isLogin
                ? "Access your Workcity account."
                : "Create your Workcity account."}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 dark:border-transparent rounded-lg shadow-lg p-5">
            <div className="p-4">
              <Outlet />
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="mb-5 text-gray-700 dark:text-gray-200">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-violet-500 hover:underline"
                  >
                    Signup now
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-violet-500 hover:underline"
                  >
                    Login
                  </Link>
                </>
              )}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              © {new Date().getFullYear()} Workcity. Crafted with{" "}
              <i className="text-red-500 mdi mdi-heart"></i> by OBE, Promise
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
