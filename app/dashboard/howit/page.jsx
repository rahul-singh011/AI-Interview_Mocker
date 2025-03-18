"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, MessageSquare, PieChart, Award, BookOpen, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Video className="w-6 h-6 text-blue-500" />,
    title: "Video Recording",
    description: "Record your responses for better self-assessment"
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-green-500" />,
    title: "AI Feedback",
    description: "Get instant feedback from our advanced AI system"
  },
  {
    icon: <PieChart className="w-6 h-6 text-purple-500" />,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics"
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Master Your Interview Skills
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Practice with our AI-powered mock interviews and improve your chances of landing your dream job
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-medium">
              Start Practicing Now
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-xl overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Prepare for the Interview</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50">
                <div className="space-y-4">
                  <p className="text-gray-700">Select from various interview types:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Technical Interviews</li>
                    <li>Behavioral Interviews</li>
                    <li>Leadership Interviews</li>
                    <li>Domain-Specific Questions</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-xl overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">2. Practice with AI</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50">
                <div className="space-y-4">
                  <p className="text-gray-700">Experience a realistic interview environment:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Real-time AI feedback on your responses</li>
                    <li>Video recording for self-review</li>
                    <li>Adaptive questioning based on your responses</li>
                    <li>Time management tools</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-xl overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold">3. Get Comprehensive Feedback</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50">
                <div className="space-y-4">
                  <p className="text-gray-700">Receive detailed analysis and recommendations:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Detailed performance metrics</li>
                    <li>Improvement suggestions</li>
                    <li>Compare with industry standards</li>
                    <li>Progress tracking over time</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful candidates who improved their interview skills with our platform
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-medium">
              Create Your First Interview
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;