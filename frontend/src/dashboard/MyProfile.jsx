import React from "react";
import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";

function MyProfile() {
  const { profile } = useAuth();
  return (
    <div className="flex-1 p-8 dark:bg-gray-900 min-h-screen transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border dark:border-gray-700"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 w-full"></div>
        <div className="relative px-8 pb-8 flex flex-col items-center -mt-16">
          <img
            src={profile?.photo?.url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover bg-white"
          />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">{profile?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest text-sm mt-1">
             {profile?.role || "User"}
          </p>

          <div className="w-full mt-8 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 space-y-4 text-gray-700 dark:text-gray-200">
             <div className="flex justify-between border-b dark:border-gray-600 pb-3">
               <span className="font-semibold">Email</span>
               <span>{profile?.email}</span>
             </div>
             <div className="flex justify-between border-b dark:border-gray-600 pb-3">
               <span className="font-semibold">Phone</span>
               <span>{profile?.phone}</span>
             </div>
             <div className="flex justify-between">
               <span className="font-semibold">Bio / Education</span>
               <span className="text-right max-w-xs">{profile?.bio || profile?.education || "Not provided"}</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MyProfile;
