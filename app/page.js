import React from 'react'
import { Button } from '@/components/ui/button'
import Head from 'next/head'
import { FaGithub, FaCode, FaUserTie, FaChartBar } from "react-icons/fa"

const page = () => {
  return (
    <div className="bg-[#0F172A]">
      <Head>
        <title>AI Interview Mocker</title>
        <meta name="description" content="Master interviews with AI-powered practice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Navbar */}
        <nav className="fixed w-full bg-[#1E293B]/90 backdrop-blur-sm z-50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">AI Interview Mocker</h1>
            <div className="flex items-center gap-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#process" className="text-gray-300 hover:text-white transition-colors">Process</a>
              <a href="https://github.com/rahul-singh011" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Practice Interviews With
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> AI Assistant</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Enhance your interview skills with real-time AI feedback and comprehensive performance analysis
            </p>
            <div className="flex gap-6 justify-center">
              <a href="/dashboard" 
                 className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </a>
              <a href="#services" 
                 className="border border-gray-700 text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-[#1E293B]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-16">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0F172A] p-8 rounded-xl border border-gray-800">
                <FaCode className="w-12 h-12 text-blue-500 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">Technical Interview</h3>
                <p className="text-gray-400">Master coding challenges and system design questions</p>
              </div>
              <div className="bg-[#0F172A] p-8 rounded-xl border border-gray-800">
                <FaUserTie className="w-12 h-12 text-purple-500 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">Behavioral Interview</h3>
                <p className="text-gray-400">Perfect your soft skills and communication</p>
              </div>
              <div className="bg-[#0F172A] p-8 rounded-xl border border-gray-800">
                <FaChartBar className="w-12 h-12 text-green-500 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">Performance Analytics</h3>
                <p className="text-gray-400">Get detailed insights and improvement tips</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 bg-[#0F172A]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="relative">
                  <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    {step}
                  </div>
                  <div className="pl-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {step === 1 ? "Select Interview Type" : 
                       step === 2 ? "Practice with AI" : "Get Feedback"}
                    </h3>
                    <p className="text-gray-400">
                      {step === 1 ? "Choose from various interview formats" :
                       step === 2 ? "Experience realistic interview scenarios" :
                       "Receive detailed performance analysis"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#0F172A] text-gray-400 py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} AI Interview. Created by Rahul Singh</p>
        </div>
      </footer>
    </div>
  )
}

export default page