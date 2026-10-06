import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { BookOpen, PlusCircle, User, Home, LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Sidebar({ component, setComponent }) {
  const { profile, logout } = useAuth();
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

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

  const menuItems = [
    { label: "My Blogs", icon: BookOpen },
    { label: "Create Blog", icon: PlusCircle },
    { label: "My Profile", icon: User },
  ];

  return (
    <>
      <div
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl text-gray-800 dark:text-gray-200" />
      </div>

      <div
        className={`w-64 h-full shadow-2xl fixed top-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 transform z-40 sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        {/* Profile Card */}
        <div className="pt-8 pb-6 px-6 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="relative inline-block">
            <img
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-blue-500 shadow-md"
              src={profile?.user?.photo?.url || profile?.photo?.url || "/user.jpg"}
              alt="Avatar"
            />
            <span className="absolute bottom-3 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
          </div>
          <p className="text-base font-bold text-gray-900 dark:text-white truncate">
            {profile?.user?.name || profile?.name || "Author"}
          </p>
          <p className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
            {profile?.user?.role || profile?.role || "Admin"}
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="p-4 space-y-2">
          {menuItems.map(({ label, icon: Icon }) => {
            const active = component === label;
            return (
              <button
                key={label}
                onClick={() => handleComponents(label)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <button
              onClick={gotoHome}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition disabled:opacity-60"
            >
              {loggingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
