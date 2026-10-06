import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "/src/services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiRequest('get', "/users/my-profile");
        setProfile(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching profile", error);
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await apiRequest('get', "/blogs/all-blogs");
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        setBlogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
