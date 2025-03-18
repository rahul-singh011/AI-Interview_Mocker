"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon, Clock, Award, Calendar, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";
import { Progress } from "@/components/ui/progress";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  const [setupProgress, setSetupProgress] = useState(0);
  const [isSystemReady, setIsSystemReady] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
    simulateSystemCheck();
  }, []);
  
  const simulateSystemCheck = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setSetupProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        setIsSystemReady(true);
      }
    }, 500);
  };

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-black p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-extrabold text-5xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          🚀 Your Interview Session
        </h2>
        <p className="text-center text-gray-600 mb-10">Get ready to showcase your skills and expertise</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Interview Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Interview Details</h3>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Technical Round
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <h4 className="font-semibold">{interviewData?.jobPosition || 'Loading...'}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience Required</p>
                      <h4 className="font-semibold">{interviewData?.jobExperience} Years</h4>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <h4 className="font-semibold">30 Minutes</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Check className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tech Stack</p>
                      <h4 className="font-semibold">{interviewData?.jobDesc}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Check */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
              <h3 className="text-xl font-semibold mb-4">System Check</h3>
              <Progress value={setupProgress} className="mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Microphone', 'Camera', 'Internet', 'System'].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${setupProgress >= (index + 1) * 25 ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Webcam */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 h-full">
              <h3 className="text-xl font-semibold mb-6 text-center">Camera Preview</h3>
              <div className="flex flex-col items-center gap-6">
                {webCamEnabled ? (
                  <>
                    <div className="relative">
                      <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        height={300}
                        width={300}
                        mirrored={true}
                        style={{ 
                          borderRadius: '1rem',
                          border: '3px solid #4CAF50',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        Live Preview
                      </div>
                    </div>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-lg w-full"
                      onClick={() => setWebCamEnabled(false)}
                    >
                      🚫 Disable Camera
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="relative w-full aspect-square max-w-[300px]">
                      <WebcamIcon className="h-full w-full p-12 bg-gray-100 rounded-2xl border-2 border-dashed border-blue-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400">Camera Off</span>
                      </div>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-lg w-full"
                      onClick={() => setWebCamEnabled(true)}
                    >
                      🎥 Enable Camera
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50"
          >
            ⬅️ Back to Dashboard
          </Button>
          <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-xl"
              disabled={!isSystemReady}
            >
              {isSystemReady ? '✅ Start Interview' : '⏳ System Check in Progress...'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Interview;