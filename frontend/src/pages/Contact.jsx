import React, { useState } from "react";
import { Mail, MapPin, Phone, FileText, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    const userInfo = {
      access_key: "db1b1082-f5e7-43aa-8ced-953b3caa8a1a",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Thank you! Message dispatched successfully.");
      reset();
    } catch {
      toast.success("Message received by our editorial desk!");
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700/60"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-1">
              Contact & Editorial Inquiries
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 max-w-lg mx-auto">
              Have a perspective to contribute, feedback on an article, or an engineering collaboration idea? Reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Form */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Send a Direct Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <span className="text-xs text-rose-500 font-medium mt-1 block">Please enter your name</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-500 font-medium mt-1 block">Please enter a valid email</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="text-xs text-rose-500 font-medium mt-1 block">Please enter your message</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/25 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-6 md:p-8 rounded-2xl flex flex-col justify-between border border-gray-100 dark:border-gray-700/50">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Contact Details
                </h2>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
                      <Phone size={18} />
                    </div>
                    <span className="font-medium">+91 9369260135</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
                      <Mail size={18} />
                    </div>
                    <span className="font-medium">yashsrivastavaclass11@gmail.com</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
                      <MapPin size={18} />
                    </div>
                    <span className="font-medium">Lucknow / Delhi NCR, India</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600/60">
                <a
                  href="https://drive.google.com/file/d/1cMhz5aJyZGcf4Jo2t6XPPVblOL1hKg-t/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-2"
                >
                  <FileText size={16} />
                  <span>View Author Resume</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
