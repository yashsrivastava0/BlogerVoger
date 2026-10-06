import React from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "./Sidebar";
import MyProfile from "./MyProfile";
import MyBlogs from "./MyBlogs";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = React.useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="flex-1 overflow-y-auto">
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
