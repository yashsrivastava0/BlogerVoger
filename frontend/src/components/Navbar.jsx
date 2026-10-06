import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import { apiRequest } from "/src/services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiRequest("get", "/users/logout");
      localStorage.removeItem("jwt");
      toast.success(data.message || "Logged out");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/80 shadow-sm dark:shadow-gray-800 transition-colors duration-300 px-4 py-3"
      >
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-bold text-2xl tracking-tight text-gray-800 dark:text-gray-100">
            BLOGer<span className="text-blue-500">Voger</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((link) => (
              <Link
                key={link}
                to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                className="hover:text-blue-500 transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && profile?.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-full text-sm"
                >
                  Dashboard
                </Link>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-500/30 px-5 py-2 rounded-full text-sm"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md shadow-red-500/30 px-5 py-2 rounded-full text-sm"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden text-gray-800 dark:text-gray-200 cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={26} /> : <AiOutlineMenu size={26} />}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <ul className="flex flex-col items-center pt-10 space-y-6 text-lg font-medium text-gray-800 dark:text-gray-200">
              {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((link) => (
                <Link
                  key={link}
                  to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                  onClick={() => setShow(false)}
                  className="hover:text-blue-500"
                >
                  {link}
                </Link>
              ))}
              <div className="w-full px-10 pt-4 flex flex-col space-y-4">
                 {isAuthenticated && profile?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setShow(false)}
                    className="w-full text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-3 rounded-xl"
                  >
                    Dashboard
                  </Link>
                 )}
                 {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setShow(false)}
                    className="w-full text-center bg-blue-600 text-white py-3 rounded-xl"
                  >
                    Sign In
                  </Link>
                 ) : (
                  <button
                    onClick={(e) => { handleLogout(e); setShow(false); }}
                    className="w-full text-center bg-red-500 text-white py-3 rounded-xl"
                  >
                    Logout
                  </button>
                 )}
              </div>
            </ul>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}

export default Navbar;
