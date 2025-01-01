import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response.data.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleRegister}>
          <div className="font-semibold text-2xl text-center mb-6">
            BLOGer<span className="text-blue-500">Voger</span>
          </div>
          <h1 className="text-xl font-semibold mb-6 text-center">Register</h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Your Education</option>
            <option value="BCA">B.TECH</option>
            <option value="MCA">M.TECH</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
          </select>
          <div className="flex items-center mb-4">
            <div className="photo w-20 h-20 mr-4">
              <img
                src={photoPreview ? `${photoPreview}` : "photo"}
                alt="photo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-center mb-4">
            Already registered?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-700 duration-300 rounded-md text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
