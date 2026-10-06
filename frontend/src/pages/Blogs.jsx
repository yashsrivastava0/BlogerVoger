import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function Blogs() {
  const { blogs } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Business", "Sports", "Entertainment", "Devotion", "Lifestyle"];

  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">All Blogs</h1>
           <p className="text-gray-600 dark:text-gray-400">Discover stories, thinking, and expertise from writers on any topic.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
           <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                   selectedCategory === cat
                     ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>

           <div className="relative w-full md:w-72">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-5 w-5 text-gray-400" />
             </div>
             <input
               type="text"
               placeholder="Search blogs or tags..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-3 rounded-full border-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
             />
           </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link
                  to={`/blog/${blog._id}`}
                  className="block h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.blogImage?.url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-blue-600 dark:text-blue-400">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors">
                      {blog.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags?.slice(0, 3).map((tag, i) => (
                         <span key={i} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 mt-auto">
                      <img
                        src={blog.adminPhoto || "https://via.placeholder.com/40"}
                        alt={blog.adminName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{blog.adminName}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">No blogs found.</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
