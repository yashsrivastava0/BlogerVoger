import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "/src/services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await apiRequest('get', "/users/my-profile");
      if (data && data.user) {
        setProfile(data.user);
        setIsAuthenticated(true);
      } else {
        setProfile(null);
        setIsAuthenticated(false);
      }
    } catch {
      setProfile(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await apiRequest('get', "/blogs/all-blogs");
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProfile();
  }, []);

  const login = async (email, password, role) => {
    const { data } = await apiRequest("post", "/users/login", { email, password, role });
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    const userObj = data.user || data;
    setProfile(userObj);
    setIsAuthenticated(true);
    return data;
  };

  const register = async (formData) => {
    const { data } = await apiRequest("post", "/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    const userObj = data.user || data;
    setProfile(userObj);
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    try {
      await apiRequest("get", "/users/logout");
    } finally {
      localStorage.removeItem("jwt");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authSession");
      setProfile(null);
      setIsAuthenticated(false);
    }
  };

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
        setLoading,
        login,
        register,
        logout,
        fetchBlogs,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
