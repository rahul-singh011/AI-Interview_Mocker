"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Clock, Shield, HelpCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const plans = [
  {
    name: "Basic",
    price: "0",
    duration: "month",
    popular: false,
    features: [
      "5 Mock Interviews per month",
      "Basic AI feedback",
      "Email support",
      "Help center access",
      "24-hour response time"
    ],
    limitations: [
      "Limited question bank",
      "Basic analytics only",
      "No custom scenarios"
    ],
    link: "/api/checkout/basic",
    color: "blue"
  },
  {
    name: "Pro",
    price: "29",
    duration: "month",
    popular: true,
    features: [
      "Unlimited Mock Interviews",
      "Advanced AI feedback",
      "Priority support",
      "Custom interview scenarios",
      "Detailed analytics",
      "Interview recording storage",
      "Performance tracking",
      "1-hour response time"
    ],
    link: "/api/checkout/pro",
    color: "purple"
  }
];

const Upgrade = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          Upgrade Your Interview Experience
        </motion.h1>
        <p className="text-xl text-gray-600">
          Choose the perfect plan to accelerate your interview preparation
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative rounded-2xl ${
              plan.popular ? 'border-2 border-purple-500 shadow-xl' : 'border border-gray-200'
            } bg-white p-8`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <div className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-purple-100 text-purple-600">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold text-${plan.color}-600 mb-2`}>
                {plan.name}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-gray-500 ml-2">/{plan.duration}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className={`w-5 h-5 flex-shrink-0 text-${plan.color}-500`} />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
              {plan.limitations && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  {plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500">
                      <HelpCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </div>
              )}
            </ul>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`${plan.link}?email=${user?.primaryEmailAddress?.emailAddress}`}
              className={`block w-full py-4 px-6 rounded-xl text-center font-semibold ${
                plan.popular
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
            >
              Get Started with {plan.name}
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Premium Plan?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Advanced AI Feedback",
              description: "Get detailed insights and personalized recommendations"
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Unlimited Access",
              description: "Practice as much as you need, anytime"
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Priority Support",
              description: "Get help when you need it most"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;