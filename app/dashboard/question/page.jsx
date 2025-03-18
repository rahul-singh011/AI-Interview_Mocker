"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";
import { motion } from "framer-motion";
import { BookOpen, Target, Zap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const features = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    title: "Curated Questions",
    description: "Access our extensive library of interview questions"
  },
  {
    icon: <Target className="w-6 h-6 text-green-500" />,
    title: "Domain Specific",
    description: "Questions tailored to your industry and role"
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    title: "AI-Powered",
    description: "Get intelligent suggestions and feedback"
  }
];

const Questions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="p-10 border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Master Your Interviews
              </motion.h1>
              <p className="text-gray-600 mt-2">
                Comprehensive Question Preparation with AI
              </p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search questions..." 
              className="pl-10 pr-4 py-3 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Add Questions Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <AddQuestions />
          </div>

          {/* Question List Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <QuestionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;