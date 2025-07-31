import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Clock, Target, Building, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";

const QuestionCard = ({ question, onEdit }) => {
  const { deleteQuestion, topics, subtopics } = useApp();

      // Add this state to your component
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

// Updated handleDelete function
const handleDelete = () => {
  console.log("Question:", question);
  setShowDeleteConfirm(true);
};

// Add these helper functions
const confirmDelete = () => {
  deleteQuestion(question._id);
  setShowDeleteConfirm(false);
};

const cancelDelete = () => {
  setShowDeleteConfirm(false);
};
  const parentTopic = topics.find(
    (topic) => topic._id === question.topicId?._id
  );
  const parentSubtopic = subtopics.find(
    (subtopic) => subtopic._id === question.subtopicId?._id
  );

  const typeColors = {
    "multiple-choice": "bg-blue-100 text-blue-800",
    "true-false": "bg-green-100 text-green-800",
    "short-answer": "bg-purple-100 text-purple-800",
    coding: "bg-indigo-100 text-indigo-800",
    essay: "bg-pink-100 text-pink-800",
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  const formatType = (type) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {question.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {parentTopic && <span>{parentTopic.title}</span>}
                {parentSubtopic && (
                  <>
                    <span>•</span>
                    <span>{parentSubtopic.title}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex space-x-1 ml-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(question)}
                className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Question Preview */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {question.question}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                typeColors[question.type]
              }`}
            >
              {formatType(question.type)}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                difficultyColors[question.difficulty]
              }`}
            >
              {question.difficulty}
            </span>
          </div>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {question.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                >
                  {tag}
                </span>
              ))}
              {question.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                  +{question.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Companies */}
          {question.company && question.company.length > 0 && (
            <div className="flex items-center space-x-1 mb-4 text-xs text-gray-600">
              <Building className="w-3 h-3" />
              <span>Asked by: {question.company.slice(0, 2).join(", ")}</span>
              {question.company.length > 2 && (
                <span>+{question.company.length - 2} more</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{question.timeLimit} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span>{question.points} pts</span>
              </div>
            </div>
            <div className="text-xs">Frequency: {question.frequency}</div>
          </div>
        </div>
      </motion.div>

      {/* // Add this JSX to your render/return section */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this question? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionCard;
