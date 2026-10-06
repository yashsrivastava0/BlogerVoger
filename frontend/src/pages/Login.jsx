import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Login() {
  const { login } = useAuth();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password, role);
      toast.success(data.message || "Signed in successfully!", { duration: 3000 });
      navigateTo("/");
    } catch (error) {
      toast.error(
        (error.response?.data?.message) || error.message || "Failed to sign in. Please verify credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword("password123");
    setRole(demoRole);
    setLoading(true);
    try {
      const data = await login(demoEmail, "password123", demoRole);
      toast.success(data.message || "Signed in successfully!", { duration: 3000 });
      navigateTo("/");
    } catch (error) {
      toast.error(error.message || "Demo sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 dark:border-gray-800 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-extrabold text-3xl tracking-tight text-gray-900 dark:text-white">
            BLOGer<span className="text-blue-600">Voger</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
            Welcome back. Sign in to your creator studio or reader account.
          </p>
        </div>

        {/* Demo Credentials Quick-Selector */}
        <div className="mb-6 bg-slate-50 dark:bg-gray-800/60 p-3 rounded-2xl border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1">
            <Sparkles size={14} className="text-amber-500" />
            <span>Instant Demo Sign-in:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin("yashsrivastavaclass11@gmail.com", "admin")}
              className="text-xs py-2 px-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded-xl border border-blue-200/60 dark:border-blue-800/60 transition text-center"
            >
              Admin (Yash)
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin("akhil@example.com", "admin")}
              className="text-xs py-2 px-2.5 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold rounded-xl border border-purple-200/60 dark:border-purple-800/60 transition text-center"
            >
              Creator (Akhil)
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Account Role
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
                Admin (Creator)
              </button>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating Securely...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <span>New to BLOGerVoger? </span>
          <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Create an Account
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center space-x-2 text-[11px] text-gray-400">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Encrypted Session & Local Persistence</span>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
