"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const StartInterview = ({ params }) => {
  const router = useRouter();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!params.interviewId) {
          throw new Error("Interview ID is required");
        }

        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (!result || result.length === 0) {
          throw new Error("Interview not found");
        }

        const interview = result[0];
        
        console.log('Raw jsonMockResp:', interview.jsonMockResp);

        if (!interview.jsonMockResp) {
          throw new Error("No questions available for this interview");
        }

        let questions;
        try {
          const jsonString = typeof interview.jsonMockResp === 'string' 
            ? interview.jsonMockResp 
            : JSON.stringify(interview.jsonMockResp);

          const parsedData = JSON.parse(jsonString);
          
          // Extract questions array from the parsed data
          questions = parsedData.questions || [];
          
          console.log('Extracted questions:', questions);

          if (!Array.isArray(questions)) {
            throw new Error("Questions must be an array");
          }

          if (questions.length === 0) {
            throw new Error("No questions found in the interview");
          }

          // Validate question format
          const validQuestions = questions.every(q => 
            q && 
            typeof q === 'object' && 
            'question' in q
          );

          if (!validQuestions) {
            throw new Error("Invalid question format detected");
          }

          setMockInterviewQuestion(questions);
          setInterviewData(interview);
          toast.success("Interview loaded successfully");
        } catch (e) {
          console.error("JSON Parse error details:", e);
          throw new Error(`Failed to parse interview questions: ${e.message}`);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviewData();
  }, [params.interviewId]);

  const handleNavigate = (newIndex) => {
    if (newIndex >= 0 && newIndex < mockInterviewQuestion.length) {
      setActiveQuestionIndex(newIndex);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading interview session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          question={mockInterviewQuestion[activeQuestionIndex]}
          onAnswer={(answer) => setAnswers({ ...answers, [activeQuestionIndex]: answer })}
          currentAnswer={answers[activeQuestionIndex]}
          onNavigate={handleNavigate}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-between mt-8">
        <Link href={`/dashboard/interview/${params.interviewId}`}>
          <Button variant="outline">⬅️ Back</Button>
        </Link>
        {activeQuestionIndex === mockInterviewQuestion.length - 1 ? (
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push(`/dashboard/interview/${params.interviewId}/feedback`)}
          >
            Complete Interview
          </Button>
        ) : (
          <Button
            onClick={() => setActiveQuestionIndex(prev => prev + 1)}
          >
            Next Question →
          </Button>
  
        )}
      </div>
    </div>
  );
};

export default StartInterview;
