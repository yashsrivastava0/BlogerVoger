import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion") || [];

  return (
    <div className="py-12 bg-slate-50/50 dark:bg-gray-800/30 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Sacred Heritage & Philosophy
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Devotional & Cultural Heritage
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-2 text-sm">
            Explore timeless mythologies, philosophical insights, and the spiritual roots of ancient wisdom traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/60 h-64 flex flex-col justify-end p-6"
              >
                <img
                  src={blog?.blogImage?.url || "/lord-laxmi.jpg"}
                  alt={blog?.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="inline-block px-2.5 py-0.5 bg-blue-600/90 text-white text-[10px] font-bold uppercase rounded-full mb-2">
                    {blog?.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {blog?.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                    By {blog?.adminName}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
              Discover stories and sacred reflections.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;
