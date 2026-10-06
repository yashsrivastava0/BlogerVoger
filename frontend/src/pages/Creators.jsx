import React, { useEffect, useState } from "react";
import { apiRequest } from "/src/services/api";
import { Mail, Phone, Award } from "lucide-react";
import { motion } from "framer-motion";

function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await apiRequest("get", "/users/admins");
        if (data && (data.admins || data.admin)) {
          setCreators(data.admins || data.admin);
        }
      } catch (error) {
        console.error("Error fetching creators", error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Editorial Leadership & Writers
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
            Meet the Creators
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed">
            The visionary developers, storytellers, and curators who bring perspectives and technological deep dives to BLOGerVoger.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={creator._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/60 flex flex-col"
            >
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative" />

              <div className="px-6 pb-6 pt-0 flex-1 flex flex-col items-center -mt-16 text-center">
                <div className="relative mb-3">
                  <img
                    src={creator.photo?.url || "/user.jpg"}
                    alt={creator.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {creator.name}
                </h2>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                  {creator.role || "Admin"}
                </span>

                <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 px-2 leading-relaxed">
                  {creator.bio || "Full-stack engineer and editorial contributor focused on modern distributed applications."}
                </p>

                <div className="w-full mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/60 space-y-2 text-xs text-gray-500 dark:text-gray-400 text-left">
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-blue-500" />
                    <span className="truncate">{creator.email}</span>
                  </div>
                  {creator.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-emerald-500" />
                      <span>{creator.phone}</span>
                    </div>
                  )}
                  {creator.education && (
                    <div className="flex items-center space-x-2">
                      <Award size={14} className="text-amber-500" />
                      <span>{creator.education}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creators;
