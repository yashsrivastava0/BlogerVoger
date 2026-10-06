import React, { useEffect, useState } from "react";
import { apiRequest } from "/src/services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Edit3, Trash2, BookOpen } from "lucide-react";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await apiRequest("get", "/blogs/my-blog");
        const list = Array.isArray(data) ? data : (data?.blogs || []);
        setMyBlogs(list);
      } catch (error) {
        console.error("Failed to load author blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await apiRequest("delete", `/blogs/delete/${id}`);
      toast.success(res.data?.message || "Blog deleted successfully");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            My Published Stories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage, update, and track your active articles and drafts
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400 text-sm">
          Loading your stories...
        </div>
      ) : myBlogs && myBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myBlogs.map((element) => (
            <div
              key={element._id}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700/60 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={element?.blogImage?.url || "/code2.jpg"}
                    alt={element.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {element.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {element.title}
                  </h2>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-700/60 mt-4 flex items-center justify-between gap-2">
                <Link
                  to={`/blog/update/${element._id}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-1.5"
                >
                  <Edit3 size={14} />
                  <span>Edit Post</span>
                </Link>
                <button
                  onClick={() => handleDelete(element._id)}
                  className="py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-1"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700/60 max-w-md mx-auto mt-8">
          <BookOpen size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            No published stories yet
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-6">
            Share your thoughts, tutorials, or industry insights with the community.
          </p>
        </div>
      )}
    </div>
  );
}

export default MyBlogs;
