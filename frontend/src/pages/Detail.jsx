import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "/src/services/api";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { format } from "date-fns";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { isAuthenticated, profile } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await apiRequest("get", `/blogs/single-blog/${id}`);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) return toast.error("Please login to like");
    try {
      const { data } = await apiRequest("put", `/blogs/like/${id}`);
      setBlogs((prev) => ({ ...prev, likes: data.likes }));
    } catch (error) {
      toast.error("Failed to like");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error("Please login to comment");
    if (!commentText.trim()) return;
    try {
      const { data } = await apiRequest("post", `/blogs/comment/${id}`, { text: commentText });
      setBlogs((prev) => ({ ...prev, comments: data.comments }));
      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to comment");
    }
  };

  if (!blogs) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading...</div>;
  }

  const isLiked = isAuthenticated && profile && blogs?.likes?.includes(profile._id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-10">
             {blogs?.tags && blogs.tags.length > 0 && (
               <div className="flex justify-center gap-2 mb-4">
                 {blogs.tags.map((tag, i) => (
                   <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-semibold tracking-wide uppercase">{tag}</span>
                 ))}
               </div>
             )}
             <p className="text-blue-500 font-semibold mb-2 uppercase tracking-wider text-sm">{blogs?.category}</p>
             <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{blogs?.title}</h1>
             <div className="flex items-center justify-center space-x-4">
                <img
                  src={blogs?.adminPhoto || "https://via.placeholder.com/150"}
                  alt="Author avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
                />
                <div className="text-left">
                  <p className="font-semibold text-lg">{blogs?.adminName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {blogs?.createdAt ? format(new Date(blogs.createdAt), "MMM d, yyyy") : "Unknown date"}
                  </p>
                </div>
             </div>
          </div>

          {blogs?.blogImage?.url && (
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={blogs?.blogImage?.url}
              alt={blogs?.title}
              className="w-full h-auto rounded-2xl shadow-xl mb-12 object-cover max-h-[500px]"
            />
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blogs?.about }} />

          {/* Interaction Bar */}
          <div className="flex items-center space-x-6 border-t border-b dark:border-gray-800 py-4 mb-12">
            <button onClick={handleLike} className={`flex items-center space-x-2 font-medium transition-colors ${isLiked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400'}`}>
               <ThumbsUp className={isLiked ? "fill-current" : ""} />
               <span>{blogs?.likes?.length || 0} Likes</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 font-medium">
               <MessageCircle />
               <span>{blogs?.comments?.length || 0} Comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Comments</h3>
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  rows="3"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">Post Comment</button>
              </form>
            ) : (
              <p className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center text-gray-600 dark:text-gray-400">Please <a href="/login" className="text-blue-500 font-semibold hover:underline">login</a> to leave a comment.</p>
            )}

            <div className="space-y-6">
              {blogs?.comments?.map((comment, idx) => (
                <div key={idx} className="flex space-x-4 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <img src={comment.user?.photo?.url || "https://via.placeholder.com/150"} alt="User" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{comment.user?.name || "Unknown User"}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(comment.createdAt), "MMM d, yyyy")}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
              {(!blogs?.comments || blogs.comments.length === 0) && (
                <p className="text-center text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Detail;
