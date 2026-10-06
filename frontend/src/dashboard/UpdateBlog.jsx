import React, { useEffect, useState } from "react";
import { apiRequest } from "/src/services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Save, Image } from "lucide-react";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await apiRequest("get", `/blogs/single-blog/${id}`);
        const blog = data?.blog || data;
        if (blog) {
          setTitle(blog.title || "");
          setCategory(blog.category || "Technology");
          setAbout(blog.about || "");
          setBlogImage(blog.blogImage?.url || "");
        }
      } catch (error) {
        console.error("Failed to fetch blog details", error);
        toast.error("Unable to load article details");
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !category || !about.trim()) {
      toast.error("Please fill in title, category, and content");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage && typeof blogImage !== "string") {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await apiRequest("put", `/blogs/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data?.message || "Article updated successfully!");
      navigateTo("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 text-center text-gray-400 text-sm flex items-center justify-center space-x-2">
        <Loader2 size={16} className="animate-spin" />
        <span>Loading article...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo(-1)}
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center space-x-1"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Editor Mode
        </span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700/60">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
          Update Article
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Devotion">Devotion</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
                Article Title
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
              Cover Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={blogImagePreview || blogImage || "/code1.avif"}
                alt="Preview"
                className="w-40 h-24 object-cover rounded-2xl border"
              />
              <label className="cursor-pointer py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-1.5 transition">
                <Image size={15} />
                <span>Change Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={changePhotoHandler}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
              Article Content
            </label>
            <textarea
              rows="8"
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
              placeholder="Article body content..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
