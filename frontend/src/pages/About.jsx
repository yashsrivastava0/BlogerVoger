import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Code, Award, Sparkles, BookOpen, Layers } from "lucide-react";
import { motion } from "framer-motion";

function About() {
  const { profile } = useAuth();
  const authorName = profile?.user?.name || profile?.name || "Yash Srivastava";

  const skills = [
    "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS",
    "JavaScript ES6+", "Python", "RESTful APIs", "JWT Auth", "Git & GitHub"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700/60 space-y-10"
        >
          {/* Header */}
          <div className="border-b border-gray-100 dark:border-gray-700/60 pb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Platform Philosophy & Architect
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              About BLOGerVoger
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-base leading-relaxed">
              Crafted by <strong className="text-blue-600 dark:text-blue-400">{authorName}</strong>, BLOGerVoger began as an ambitious 2024 engineering project and has evolved into a full-featured digital publication platform. The platform blends editorial elegance with high-performance responsive web architecture.
            </p>
          </div>

          {/* Technical Expertise */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-blue-600 dark:text-blue-400">
              <Code size={22} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Technical Architecture & Stack</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Specialized across the modern full-stack ecosystem with a focus on component modularity, reactive state management, asynchronous REST APIs, and responsive design systems.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Highlights */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-blue-600 dark:text-blue-400">
              <Award size={22} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Professional & Academic Highlights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>Research & Development</span>
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  Collaborated on IoT monitoring systems at IIT Mandi, deploying Node.js servers, Firestore, and predictive temperature analytics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/50">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                  <Layers size={16} className="text-blue-500" />
                  <span>Full-Stack Engineering</span>
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  Developed end-to-end web applications with custom JWT authentication, Tailwind styling, and resilient client-side storage architectures.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <BookOpen size={20} />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Vision & Core Objective</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              BLOGerVoger is dedicated to fostering knowledge exchange, creative writing, and technical storytelling. Every article is designed to be easily discoverable, engaging to read, and effortless to publish.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
