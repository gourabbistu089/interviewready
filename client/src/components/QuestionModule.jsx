import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  Code,
  Clock,
  CheckCircle,
  Circle,
  Users,
  Target,
  BookMarked,
  ExternalLink,
  Trophy,
  Zap,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";
const QuestionModule = ({
  topicIndex,
  topicId,
  topic,
  expandedTopics,
  setExpandedTopics,
}) => {
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({
    //   ...prev,  // this will update the entire object, which is not what we want
      [topicId]: !prev[topicId],
    }));
  };
  const updateProgress = async (questionId, type) => {
    try {
      const res = await axios.post(
        `${API_URL}/progress/`,
        {
          subtopicId: topicId,
          questionId,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Progress updated:", res);
      if (res.data.success) {
        toast.success("Marked as completed");
      }
    } catch (error) {
      toast.error("Failed to update progress");
      console.error("Error updating progress:", error);
    }
  };
  const addToMarked = (questionId) => {
    if (completedQuestions.includes(questionId)) return;
    setCompletedQuestions((prev) => 
        [...prev, questionId]
    );
    // api call to update progress
    updateProgress(questionId, "question");
  };

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return {
          color:
            "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border-emerald-300",
          icon: Target,
          shadow: "shadow-emerald-100",
        };
      case "medium":
        return {
          color:
            "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-300",
          icon: Zap,
          shadow: "shadow-amber-100",
        };
      case "hard":
        return {
          color:
            "bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-red-300",
          icon: Trophy,
          shadow: "shadow-red-100",
        };
      default:
        return {
          color:
            "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border-gray-300",
          icon: Target,
          shadow: "shadow-gray-100",
        };
    }
  };

  const getCompanyColor = (company, compIndex) => {
    const colors = [
      {
        bg: "bg-gradient-to-r from-cyan-500 to-sky-300",
        text: "text-cyan-50",
        border: "border-cyan-300",
        shadow: "shadow-cyan-100",
      },
      {
        bg: "bg-gradient-to-r from-blue-500 to-indigo-300",
        text: "text-blue-50",
        border: "border-blue-100",
        shadow: "shadow-blue-100",
      },
      {
        bg: "bg-gradient-to-r from-purple-500 to-violet-300",
        text: "text-purple-50",
        border: "border-purple-300",
        shadow: "shadow-purple-100",
      },
      {
        bg: "bg-gradient-to-r from-teal-500 to-green-300",
        text: "text-teal-50",
        border: "border-teal-300",
        shadow: "shadow-teal-100",
      },
      {
        bg: "bg-gradient-to-r from-pink-400 to-rose-300",
        text: "text-pink-50",
        border: "border-pink-300",
        shadow: "shadow-pink-100",
      },
      {
        bg: "bg-gradient-to-r from-indigo-100 to-blue-100",
        text: "text-indigo-50",
        border: "border-indigo-300",
        shadow: "shadow-indigo-100",
      },
    ];
    const colorConfig = colors[compIndex % colors.length];
    const colorIndex =
      Math.floor(Math.random() * colors.length) % colors.length;
    return `${colorConfig.bg} ${colorConfig.text} ${colorConfig.border} ${colorConfig.shadow}`;
  };

    const getProgressData = async () => {
    try {
      const res = await axios.get(`${API_URL}/progress/${topicId}/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     
      console.log("Response:", res);
      if (res.data.success) {
      setCompletedQuestions(res?.data?.data[0]?.completedQuestions || []);
      console.log(
        "questionProgress in PracticePage",
        res.data.data.completedQuestions
      );
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  useEffect(() => {
    getProgressData();
  },[])
  console.log("Completed Questions: at ", topicIndex, completedQuestions);
  return (
    <motion.div
      key={topic._id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: topicIndex * 0.1 }}
      className="bg-white"
    >
      {/* Topic Header - Clickable */}
      <motion.div
        onClick={() => toggleTopic(topic._id)}
        className="p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 cursor-pointer select-none border-l-4 border-blue-400 hover:border-blue-500"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5 flex-1">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4 mb-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {topic.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                    {topic.questions.length} problems
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 ml-4">
            {/* Progress Section */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {
                    completedQuestions.length
                  }
                  /{topic.questions.length}
                </div>
                <div className="w-40 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                    style={{
                      width: `${
                        (completedQuestions.length /
                          topic.questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(
                    (completedQuestions.length /
                      topic.questions.length) *
                      100
                  )}
                  %
                </div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            </div>

            {/* Expand Arrow */}
            <motion.div
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200 border border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: expandedTopics[topic._id] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Questions Table */}
      <AnimatePresence>
        {expandedTopics[topic._id] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-t border-gray-100"
          >
            <div className="p-5">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 mb-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                <div className="col-span-1 text-center">
                  <span className="text-sm font-bold text-gray-800">
                    Status
                  </span>
                </div>
                <div className="col-span-4">
                  <span className="text-sm font-bold text-gray-800">
                    Problem Details
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-sm font-bold text-gray-800">
                    Practice
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-sm font-bold text-gray-800">Video</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-sm font-bold text-gray-800">Notes</span>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-sm font-bold text-gray-800">Level</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {topic.questions.map((question, questionIndex) => (
                
                  <motion.div
                    key={question._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: questionIndex * 0.1 }}
                    className="grid grid-cols-12 gap-4 items-center px-5 py-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100"
                  >
                    {/* <p>{typeof question._id}</p> */}
                    {/* Status Column */}
                    <div className="col-span-1 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToMarked(question._id)}
                        className="flex-shrink-0"
                      >
                        {completedQuestions.includes(question._id) ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                        )}
                      </motion.button>
                    </div>

                    {/* Problem Column */}
                    <div className="col-span-4">
                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-gray-900 leading-tight">
                          {question.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {question.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="px-2 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-800 text-xs rounded-full font-semibold border border-purple-200 shadow-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {question.company.map((comp, compIndex) => (
                            <span
                              key={compIndex}
                              className={`inline-flex items-center px-2.5 py-1 text-sm rounded-lg font-semibold border shadow-sm ${getCompanyColor(
                                comp,
                                compIndex
                              )}`}
                            >
                              {/* <Users className="w-3.5 h-3.5 mr-1.5" /> */}
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Practice Column */}
                    <div className="col-span-2 flex justify-center">
                      {question.content.practiceLinks?.url ? (
                        <motion.a
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={question.content.practiceLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-200 border border-emerald-300 shadow-sm hover:shadow-emerald-200 font-semibold"
                        >
                          <Code className="w-4 h-4 mr-2" />
                          Practice
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </motion.a>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">
                          Not Available
                        </span>
                      )}
                    </div>

                    {/* Video Column */}
                    <div className="col-span-2 flex justify-center">
                      {question.content.youtubeLinks?.url ? (
                        <motion.a
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={question.content.youtubeLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-800 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all duration-200 border border-red-300 shadow-sm hover:shadow-red-200 font-semibold"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Video
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </motion.a>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">
                          Not Available
                        </span>
                      )}
                    </div>

                    {/* Notes Column */}
                    <div className="col-span-2 flex justify-center">
                      {question.content.notesLinks?.url ? (
                        <motion.a
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={question.content.notesLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-300 shadow-sm hover:shadow-blue-200 font-semibold"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Notes
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </motion.a>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">
                          Not Available
                        </span>
                      )}
                    </div>

                    {/* Difficulty Column */}
                    <div className="col-span-1 flex justify-center">
                      {(() => {
                        const diffConfig = getDifficultyConfig(
                          question.difficulty
                        );
                        const DiffIcon = diffConfig.icon;
                        return (
                          <span
                            className={`inline-flex items-center px-3 py-2 text-sm rounded-xl font-bold border shadow-sm ${diffConfig.color} ${diffConfig.shadow}`}
                          >
                            <DiffIcon className="w-4 h-4 mr-1.5" />
                            {question.difficulty.charAt(0).toUpperCase() +
                              question.difficulty.slice(1)}
                          </span>
                        );
                      })()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionModule;
