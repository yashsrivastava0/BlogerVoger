import React, { useState } from "react";
import { apiRequest } from "/src/services/api";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [tags, setTags] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim()).filter(Boolean)));
    formData.append("blogImage", blogImage);
    try {
      const { data } = await apiRequest("post", "/blogs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setTags("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Please fill required fields");
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border dark:border-gray-700">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Create New Post</h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-semibold mb-2">Tags (comma separated)</label>
             <input
                type="text"
                placeholder="react, web development, tutorial"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Cover Image</label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-6 py-3 rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition">
                <span>Upload Image</span>
                <input type="file" onChange={changePhotoHandler} className="hidden" accept="image/*" />
              </label>
            </div>
            {blogImagePreview && (
              <div className="mt-4">
                <img src={blogImagePreview} alt="Preview" className="h-48 w-full object-cover rounded-xl shadow-md" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Content</label>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600">
               <ReactQuill
                 theme="snow"
                 value={about}
                 onChange={setAbout}
                 modules={modules}
                 className="h-64 mb-12 dark:text-white"
               />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/30"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
