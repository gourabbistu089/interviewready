import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Award } from "lucide-react";
import RoleSelection from "../components/Interview/RoleSelection";
import InterviewSession from "../components/Interview/InterviewSession";

// Results component
const InterviewResults = ({ results, onNewInterview }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score) => {
    if (score >= 8) return "Excellent performance! 🎉";
    if (score >= 6) return "Good work! Keep practicing 👍";
    return "Keep learning and improving! 💪";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          <Award className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interview Complete!
          </h1>
          <p className="text-lg text-gray-600">
            {getScoreMessage(results.overallScore)}
          </p>
        </motion.div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Overall Score
              </h3>
              <div
                className={`text-4xl font-bold ${getScoreColor(
                  results.overallScore
                )}`}
              >
                {results.overallScore}/10
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Questions Answered
              </h3>
              <div className="text-4xl font-bold text-gray-900">
                {results.totalQuestions}
              </div>
            </div>
          </div>
        </div>

        {results.finalFeedback && (
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left whitespace-pre-line">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Final Feedback
            </h3>
            <p className="text-blue-800 leading-relaxed">
              {results.finalFeedback}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewInterview}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <Play className="h-5 w-5 mr-2" />
            New Interview
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main App component
const MockInterviewPage = () => {
  const [currentView, setCurrentView] = useState("roleSelection");
  const [selectedRole, setSelectedRole] = useState(null);
  const [interviewResults, setInterviewResults] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentView("interview");
  };

  const handleInterviewComplete = (results) => {
    setInterviewResults(results);
    setCurrentView("results");
  };

  const handleNewInterview = () => {
    setSelectedRole(null);
    setInterviewResults(null);
    setCurrentView("roleSelection");
  };

  const handleBackToRoleSelection = () => {
    setCurrentView("roleSelection");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {currentView === "roleSelection" && (
          <RoleSelection key="roleSelection" onRoleSelect={handleRoleSelect} />
        )}
        {currentView === "interview" && (
          <InterviewSession
            key="interview"
            role={selectedRole}
            onComplete={handleInterviewComplete}
            onBack={handleBackToRoleSelection}
          />
        )}
        {currentView === "results" && (
          <InterviewResults
            key="results"
            results={interviewResults}
            onNewInterview={handleNewInterview}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MockInterviewPage;
