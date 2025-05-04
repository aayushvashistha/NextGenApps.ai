import React from "react";
import heroImage from "./images/hero-image.jpg";
import teamImage from "./images/team-image.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-blue-50 text-gray-800 font-sans overflow-x-hidden">
      <header className="bg-gradient-to-r from-indigo-800 to-purple-600 text-white px-8 py-6 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.h1 className="text-4xl font-extrabold tracking-tight mb-4 md:mb-0" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            NextGenApps
          </motion.h1>
          <nav className="space-x-8 text-lg">
            <a href="#about" className="hover:underline hover:text-yellow-300 transition">About</a>
            <a href="#features" className="hover:underline hover:text-yellow-300 transition">Features</a>
            <Link to="/contact" className="hover:underline hover:text-yellow-300 transition">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-20">
          <motion.img
            src={heroImage}
            alt="AI Empowerment"
            className="w-full h-[500px] object-cover rounded-3xl mb-10 shadow-2xl border-4 border-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.h2 className="text-5xl sm:text-6xl font-extrabold text-indigo-800 mb-6 leading-tight" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            Simplifying Life with AI
          </motion.h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We build smart, intuitive, and beautiful AI-powered tools that empower businesses and individuals to work faster, smarter, and better.
          </p>
        </section>

        <section id="features" className="mb-24">
          <h3 className="text-4xl font-bold text-center text-purple-700 mb-12">What We Offer</h3>
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI Content Assistant",
                desc: "Write blogs, emails, and social media posts faster with intelligent suggestions."
              },
              {
                title: "Finance Analyzer",
                desc: "Upload bank statements and receive visual summaries and actionable insights."
              },
              {
                title: "Task Automator",
                desc: "Create workflows that automate repetitive tasks and improve productivity."
              },
              {
                title: "PDF Summarizer",
                desc: "Summarize long documents into concise overviews instantly."
              },
              {
                title: "AI Chat Widgets",
                desc: "Add smart chatbots to your site that assist visitors in real-time."
              },
              {
                title: "Image/Video Enhancer",
                desc: "Improve visuals with AI-powered resolution enhancement tools."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border hover:border-blue-500 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-xl font-semibold mb-3 text-indigo-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="mb-24 flex flex-col lg:flex-row items-center gap-12">
          <motion.img
            src={teamImage}
            alt="Our Team"
            className="w-full lg:w-1/2 rounded-3xl shadow-xl border"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="text-center lg:text-left">
            <h3 className="text-4xl font-bold mb-4 text-purple-700">About Us</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              At NextGenApps.ai, we are passionate developers and designers committed to shaping the future with AI. From solopreneurs to enterprises, our solutions help everyone harness the power of intelligent automation to work smarter.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center p-8 mt-24 rounded-t-3xl">
        <p className="text-sm">&copy; {new Date().getFullYear()} NextGenApps.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
