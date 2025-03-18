"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, Volume2, VolumeX, Brain, Clock, HelpCircle, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const QuestionSection = ({ mockInterviewQuestion = [], activeQuestionIndex = 0 }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add useEffect for voice loading
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.cancel(); // Stop any ongoing speech when unmounting
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
      setIsLoading(false);
    }
  }, [mockInterviewQuestion]);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a female English voice for better clarity
      const preferredVoice = voices.find(
        voice => 
          voice.name.includes('Female') && 
          voice.lang.startsWith('en')
      ) || voices.find(
        voice => voice.lang.startsWith('en-US')
      ) || voices[0];

      // Improved speech settings
      utterance.voice = preferredVoice;
      utterance.rate = 0.8;     // Slower speed (0.1 to 10)
      utterance.pitch = 1.1;    // Slightly higher pitch for clarity
      utterance.volume = isMuted ? 0 : 0.8; // Slightly lower volume
      utterance.lang = 'en-US'; // Force English language

      // Add pauses for better comprehension
      const textWithPauses = text.replace(/([.!?])\s*/g, '$1. ');
      utterance.text = textWithPauses;

      setSpeechUtterance(utterance);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (speechUtterance) {
      window.speechSynthesis.cancel(); // Stop current speech
      if (!isMuted) { // If currently unmuted (about to be muted)
        window.speechSynthesis.cancel();
      } else { // If currently muted (about to be unmuted)
        // Restart speech with new volume
        textToSpeech(mockInterviewQuestion[activeQuestionIndex].question);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading interview questions...</p>
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion || !mockInterviewQuestion[activeQuestionIndex]) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Question Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4">
        {mockInterviewQuestion?.map((_, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
              ${activeQuestionIndex === index 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : index < activeQuestionIndex
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 text-gray-400'
              }`}
          >
            {index < activeQuestionIndex ? '✓' : index + 1}
          </div>
        ))}
      </div>

      {/* Current Question */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Question {activeQuestionIndex + 1}
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>5:00 min</span>
          </div>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          {mockInterviewQuestion?.[activeQuestionIndex]?.question || "Loading question..."}
        </p>
      </div>

      {/* Tips Section */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Interview Tips</h4>
            <ul className="space-y-2 text-amber-800">
              <li>• Take a moment to structure your thoughts before answering</li>
              <li>• Use specific examples to support your points</li>
              <li>• Maintain good eye contact with the camera</li>
              <li>• Speak clearly and at a moderate pace</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        {isMuted ? (
          <VolumeX
            className="cursor-pointer hover:text-blue-600 w-6 h-6"
            onClick={toggleMute}
            title="Unmute"
          />
        ) : (
          <Volume2
            className="cursor-pointer hover:text-blue-600 w-6 h-6"
            onClick={toggleMute}
            title="Mute"
          />
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex].question)}
          className="flex items-center gap-2 px-0"
        >
          Listen to Question
        </Button>
      </div>
      <div className="border rounded-lg p-5 bg-blue-100 mt-18 md:block hidden">
        <h2 className="flex gap-2 items-center text-blue-800">
          <Lightbulb />
          <strong className="gap-2">Note:</strong>
        </h2>
        <p className="text-sm text-blue-600 leading-relaxed">
          Click on record answer when you want to answer the question. At the
          end of interview we will give you the feedback along with correct
          answer for each of question and your answer to compare it.
        </p>
        <h2 className="text-sm text-blue-600 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
