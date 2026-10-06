import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const { blogs } = useAuth();
  // Get latest 4 blogs
  const latestBlogs = blogs?.slice(0, 4) || [];

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Discover. Read. <span className="text-blue-600">Create.</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Welcome to the ultimate platform for readers and writers. Explore trending topics, dive into profound insights, and share your own stories.
        </p>
      </motion.div>

      {latestBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestBlogs.map((element, index) => (
            <motion.div
              key={element._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/blog/${element._id}`}
                className="group block h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={element.blogImage?.url}
                    alt={element.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-bold rounded-full backdrop-blur-sm">
                      {element.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {element.title}
                  </h2>
                  <div className="flex items-center space-x-3 mt-4">
                    <img
                      src={element.adminPhoto || "https://via.placeholder.com/40"}
                      alt={element.adminName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{element.adminName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
           Loading amazing content...
        </div>
      )}
    </div>
  );
}

export default Hero;
