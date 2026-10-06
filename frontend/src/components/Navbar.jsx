import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Moon, Sun, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Navbar() {
  const [show, setShow] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { profile, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    setLoggingOut(true);
    try {
      await logout();
      toast.success("Signed out successfully");
      navigateTo("/login");
    } catch {
      toast.error("Failed to sign out");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm dark:shadow-gray-800/50 transition-colors duration-300 px-4 py-3.5 border-b border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-between container mx-auto max-w-7xl">
          <Link to="/" className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-gray-100 flex items-center space-x-1">
            <span>BLOGer</span><span className="text-blue-600">Voger</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-300">
            {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((link) => (
              <Link
                key={link}
                to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-200"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && profile?.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-xl text-xs tracking-wide uppercase"
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated && profile && (
                <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50">
                  <img
                    src={profile.photo?.url || "/user.jpg"}
                    alt="User"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                    {profile.name?.split(" ")[0]}
                  </span>
                </div>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/25 px-5 py-2 rounded-xl text-xs tracking-wide transition duration-200"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60 font-semibold px-4 py-2 rounded-xl text-xs tracking-wide transition duration-200 flex items-center space-x-1.5 disabled:opacity-60"
                >
                  {loggingOut ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Signing out...</span>
                    </>
                  ) : (
                    <span>Sign Out</span>
                  )}
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden text-gray-800 dark:text-gray-200 cursor-pointer p-1" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pt-4 pb-6 px-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-3"
          >
            <ul className="flex flex-col space-y-4 text-base font-semibold text-gray-800 dark:text-gray-200">
              {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((link) => (
                <Link
                  key={link}
                  to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                  onClick={() => setShow(false)}
                  className="hover:text-blue-600 py-1"
                >
                  {link}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">
                {isAuthenticated && profile?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setShow(false)}
                    className="w-full text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-2.5 rounded-xl font-semibold text-sm"
                  >
                    Studio Dashboard
                  </Link>
                )}
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setShow(false)}
                    className="w-full text-center bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm shadow-md"
                  >
                    Sign In
                  </Link>
                ) : (
                  <button
                    onClick={(e) => { handleLogout(e); setShow(false); }}
                    disabled={loggingOut}
                    className="w-full text-center bg-rose-50 text-rose-600 border border-rose-200 py-2.5 rounded-xl font-semibold text-sm"
                  >
                    {loggingOut ? "Signing out..." : "Sign Out"}
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
