import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { User, Mail, Lock, Phone, GraduationCap, Image, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

function Register() {
  const { register: registerUser } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [education, setEducation] = useState("B.TECH");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setPhoto(file);
      };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const data = await registerUser(formData);
      toast.success(data.message || "Registration completed successfully!");
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to register account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 dark:border-gray-800 relative z-10"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-block font-extrabold text-3xl tracking-tight text-gray-900 dark:text-white">
            BLOGer<span className="text-blue-600">Voger</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
            Join the community of readers, authors, and industry thinkers.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  role === "user"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Reader (User)
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  role === "admin"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Creator & Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Yash Srivastava"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Phone size={16} />
                </div>
                <input
                  type="text"
                  placeholder="+91 9369260135"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Education & Bio */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              Education / Discipline
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <GraduationCap size={16} />
              </div>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="B.TECH">B.TECH (Computer Science / IT)</option>
                <option value="M.TECH">M.TECH</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other Discipline</option>
              </select>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              Author Avatar (Optional)
            </label>
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 border">
                <img
                  src={photoPreview || "/user.jpg"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
                <Image size={14} />
                <span>Choose photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changePhotoHandler}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Registering Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400">
          <span>Already registered? </span>
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center space-x-2 text-[11px] text-gray-400">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Local Persistence & Profile Storage</span>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
