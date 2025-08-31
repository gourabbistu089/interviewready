import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Clock,
  User,
  Award,
  TrendingUp,
  History,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Target,
  BookOpen,
  Brain,
} from "lucide-react";
import { API_URL } from "../../constants";
import axios from "axios";

const apiService = {
  startInterview: async (role, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/interview/start`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error in startInterview:", error);
    }
  },

  submitAnswer: async (sessionId, answer, token) => {
    const response = await axios.post(
      `${API_URL}/interview/answer`,
      { sessionId, answer },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  completeInterview: async (sessionId, token) => {
    const response = await axios.post(
      `${API_URL}/interview/complete`,
      { sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

// Interview session component
const InterviewSession = ({ role, onComplete, onBack }) => {
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isStarting, setIsStarting] = useState(true);

  // Mock token - replace with actual authentication
  const token = localStorage.getItem("token");

  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    setLoading(true);
    try {
      const response = await apiService.startInterview(role, token);
      setSessionId(response.sessionId);
      setCurrentQuestion(response.question);
      setQuestionNumber(response.questionNumber);
      setTotalQuestions(response.totalQuestions);
      setIsStarting(false);
    } catch (error) {
      console.error("Error starting interview:", error);
      // Handle error appropriately
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;

    setLoading(true);
    try {
      const response = await apiService.submitAnswer(
        sessionId,
        userAnswer,
        token
      );
      setFeedback(response);
      setScore(response.score);
      setShowFeedback(true);

      if (response.isComplete) {
        setIsComplete(true);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      // Handle error appropriately
    }
    setLoading(false);
  };

  const nextQuestion = () => {
    if (feedback && feedback.nextQuestion) {
      setCurrentQuestion(feedback.nextQuestion);
      setQuestionNumber(feedback.questionNumber);
      setUserAnswer("");
      setFeedback(null);
      setShowFeedback(false);
    }
  };

  const completeInterview = async () => {
    setLoading(true);
    try {
      const response = await apiService.completeInterview(sessionId, token);
      onComplete(response);
    } catch (error) {
      console.error("Error completing interview:", error);
      // Handle error appropriately
    }
    setLoading(false);
  };
//3
if (loading && isStarting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Role Selection
            </button>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Question {questionNumber} of {totalQuestions}
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Progress</span>
              <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Question {questionNumber}
            </h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text">
            {currentQuestion}
          </p>
        </motion.div>

        {/* Answer input */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <label className=" text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Your Answer
          </label>
          <div className="relative">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400 shadow-inner"
              disabled={loading || showFeedback}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/70 px-2 py-1 rounded-md">
              {userAnswer.length} chars
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
              {userAnswer.length} characters
            </div>
            {!showFeedback && (
              <button
                onClick={submitAnswer}
                disabled={loading || !userAnswer.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  />
                ) : null}
                Submit Answer
              </button>
            )}
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3"></div>
                  Feedback
                </h3>
                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl shadow-lg">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="text-lg font-bold">{score}/10</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    AI Feedback
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
                </div>

                {feedback.positives && (
                  <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Strengths
                    </h4>
                    <p className="text-green-700 leading-relaxed">{feedback.positives}</p>
                  </div>
                )}

                {feedback.tip && (
                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Improvement Tip
                    </h4>
                    <p className="text-blue-700 leading-relaxed">{feedback.tip}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-8">
                {isComplete ? (
                  <button
                    onClick={completeInterview}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 flex items-center font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                      />
                    ) : null}
                    Complete Interview
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 flex items-center font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Next Question
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewSession;