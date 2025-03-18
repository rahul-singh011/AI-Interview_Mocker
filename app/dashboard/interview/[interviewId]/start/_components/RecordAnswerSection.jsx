"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic, Timer, MicOff, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Progress } from "@/components/ui/progress";

const RecordAnswerSection = ({
  mockInterviewQuestion = [],
  activeQuestionIndex = 0,
  onNavigate, // Add this prop for navigation
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [speechUtterance, setSpeechUtterance] = useState(null);
  const [timer, setTimer] = useState(300); // 5 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    // Load voices when component mounts
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    
    // Some browsers need this event
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  useEffect(() => {
    let interval;
    if (isRecording && timer > 0) {
      setIsTimerRunning(true);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      setIsTimerRunning(false);
    };
  }, [isRecording, timer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(audioBlob);
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Convert audio blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        analyzeConfidence(transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      
      // Generate feedback using AI
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
        Question: ${mockInterviewQuestion[activeQuestionIndex].question}
        Correct Answer: ${mockInterviewQuestion[activeQuestionIndex].answer}
        User Answer: ${userAnswer}
        
        Please provide:
        1. A rating out of 10
        2. Detailed feedback on the answer
        Format: JSON with 'rating' and 'feedback' keys
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonFeedbackResp = JSON.parse(response.text());

      // Save to database
      const resp = await db.insert(UserAnswer).values({
        mockId: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex].question,
        correctAns: mockInterviewQuestion[activeQuestionIndex].answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD")
      });

      if (resp) {
        toast.success("Answer recorded successfully");
      }
      setUserAnswer("");
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer");
    } finally {
      setLoading(false);
    }
  };

  const saveRecording = async () => {
    if (!recordedBlob) return;
    
    try {
      // Convert blob to base64 or handle storage as needed
      const reader = new FileReader();
      reader.readAsDataURL(recordedBlob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        // Save to your database or storage here
        console.log("Recording saved:", base64data);
      };
    } catch (error) {
      console.error("Error saving recording:", error);
    }
  };

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate confidence analysis
  const analyzeConfidence = (text) => {
    // This is a mock analysis - replace with actual AI analysis
    const words = text.split(' ').length;
    const score = Math.min(Math.floor((words / 50) * 100), 100);
    setConfidenceScore(score);
  };

  // Update progress calculation
  const calculateProgress = () => {
    if (!Array.isArray(mockInterviewQuestion) || mockInterviewQuestion.length === 0) {
      return 0;
    }
    return Math.round(((activeQuestionIndex + 1) * 100) / mockInterviewQuestion.length);
  };

  return (
    <div className="flex flex-col space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header with Timer and Progress */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Timer className={`w-6 h-6 ${isTimerRunning ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
            <div>
              <p className="text-sm text-gray-500">Time Remaining</p>
              <span className="text-2xl font-bold text-gray-800">{formatTime(timer)}</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Question Progress</p>
          <div className="space-y-2">
            <Progress 
              value={calculateProgress()} 
              className="h-2"
            />
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}</span>
              <span>{calculateProgress()}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Webcam Section */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900 border-4 border-gray-100">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <Image 
                src="/camera.jpg" 
                width={100} 
                height={100} 
                alt="Camera" 
                className="mx-auto mb-4 rounded-full border-4 border-gray-700"
              />
              <p className="text-gray-400">Camera is disabled</p>
            </div>
          </div>
        )}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/70 px-4 py-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm font-medium">Recording in Progress</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => onNavigate(activeQuestionIndex - 1)}
          disabled={activeQuestionIndex === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="flex space-x-2">
          {mockInterviewQuestion.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === activeQuestionIndex
                  ? 'bg-blue-600'
                  : index < activeQuestionIndex
                  ? 'bg-blue-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => setWebCamEnabled((prev) => !prev)}
          variant="outline"
          className="w-full py-6 text-lg font-medium border-2 hover:bg-gray-50"
        >
          {webCamEnabled ? (
            <>
              <Image src="/camera-off.svg" width={24} height={24} alt="Camera Off" className="mr-2" />
              Disable Camera
            </>
          ) : (
            <>
              <Image src="/camera-on.svg" width={24} height={24} alt="Camera On" className="mr-2" />
              Enable Camera
            </>
          )}
        </Button>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
          className={`w-full py-6 text-lg font-medium ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isRecording ? (
            <>
              <MicOff className="mr-2 h-5 w-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" />
              Start Recording
            </>
          )}
        </Button>
      </div>

      {/* Analysis Section */}
      {userAnswer && (
        <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Speech Analysis</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Confidence Score</span>
                <span className="font-bold text-blue-600">{confidenceScore}%</span>
              </div>
              <Progress 
                value={confidenceScore} 
                className="h-3 bg-gray-200"
              />
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Transcribed Answer</h4>
              <div className="max-h-48 overflow-y-auto">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {userAnswer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;
