import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, BookOpen, Clock } from "lucide-react";

function Hero() {
  const { blogs } = useAuth();
  const latestBlogs = blogs?.slice(0, 4) || [];

  return (
    <div className="container mx-auto py-14 px-4 md:px-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
          <Sparkles size={13} className="text-blue-600" />
          <span>Curated Articles & Creator Perspectives</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
          Discover. Read. <span className="text-blue-600">Create.</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
          Welcome to <span className="font-semibold text-gray-900 dark:text-white">BLOGerVoger</span>. Explore thoughtful perspectives, software architecture insights, entrepreneurial breakthroughs, and cultural philosophies crafted by passionate creators.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link
            to="/blogs"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition duration-200 flex items-center space-x-1.5"
          >
            <BookOpen size={16} />
            <span>Explore All Stories</span>
          </Link>
          <Link
            to="/creators"
            className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-sm transition duration-200"
          >
            Meet Creators
          </Link>
        </div>
      </motion.div>

      {latestBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((element, index) => (
            <motion.div
              key={element._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link
                to={`/blog/${element._id}`}
                className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/60"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={element.blogImage?.url || "/code1.avif"}
                    alt={element.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/95 dark:bg-gray-900/95 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full shadow-sm">
                      {element.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/60 text-white">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {element.title}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700/60">
                    <div className="flex items-center space-x-2">
                      <img
                        src={element.adminPhoto || "/user.jpg"}
                        alt={element.adminName}
                        className="w-7 h-7 rounded-full object-cover border"
                      />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                        {element.adminName}
                      </span>
                    </div>
                    <div className="flex items-center text-[11px] text-gray-400 space-x-1">
                      <Clock size={12} />
                      <span>3 min</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-sm">
          Loading editorial collections...
        </div>
      )}
    </div>
  );
}

export default Hero;
