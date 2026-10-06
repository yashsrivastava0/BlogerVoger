import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("jwt");
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="sm:ml-64 p-4 md:p-8 min-h-screen">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
