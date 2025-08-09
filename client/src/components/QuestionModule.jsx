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
  Smile,
  Meh,
  Frown,
  Code2,
  PlayCircle,
  FileText,
  Star,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
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
    setCompletedQuestions((prev) => [...prev, questionId]);
    // api call to update progress
    updateProgress(questionId, "question");
  };

  const toggleRevisionAPI = async (questionId) => {
    try {
      const res = await axios.post(
        `${API_URL}/users/revision/${questionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Revision status updated");
      }
    } catch (error) {
      toast.error("Failed to add to revision list");
      console.error("Error adding to revision list:", error);
    }
  };  

  

  // Function to get difficulty indicator
  const getDifficultyIndicator = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "border-r-4 border-r-green-400";
      case "medium":
        return "border-r-4 border-r-yellow-400";
      case "hard":
        return "border-r-4 border-r-red-400";
      default:
        return "border-r-4 border-r-gray-300";
    }
  };
  const {user} = useSelector((state) => state.auth);

  const [revisionQuestions, setRevisionQuestions] = useState([]);
  useEffect(() => {
    setRevisionQuestions(user?.revisionQuestions || []);
  },[])

  const toggleRevision = (questionId) => {
    setRevisionQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
    toggleRevisionAPI(questionId);
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
  }, []);
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
                  {completedQuestions.length}/{topic.questions.length}
                </div>
                <div className="w-40 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                    style={{
                      width: `${
                        (completedQuestions.length / topic.questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(
                    (completedQuestions.length / topic.questions.length) * 100
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
                  <span className="text-sm font-bold text-gray-800">
                    Revision
                  </span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-4">
                {topic.questions.map((question, questionIndex) => (
                  <motion.div
                    key={question._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: questionIndex * 0.1 }}
                    className={`grid grid-cols-12 gap-6 items-center px-6 py-5 bg-white rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 ${getDifficultyIndicator(
                      question.difficulty
                    )}`}
                  >
                    {/* Status Column */}
                    <div className="col-span-1 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToMarked(question._id)}
                        className="relative group"
                      >
                        {completedQuestions.includes(question._id) ? (
                          <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-50 transition-all duration-200">
                            <Circle className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                          </div>
                        )}
                      </motion.button>
                    </div>

                    {/* Problem Column */}
                    <div className="col-span-4">
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold text-gray-800 leading-tight hover:text-gray-900 transition-colors">
                          {question.title}
                        </h4>

                        {/* Companies */}
                        <div className="flex flex-wrap gap-2">
                          {question.company
                            .slice(0, 3)
                            .map((comp, compIndex) => (
                              <span
                                key={compIndex}
                                className={`inline-flex items-center px-2.5 py-1.5 text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all ${getCompanyColor(
                                  comp,
                                  compIndex
                                )}`}
                              >
                                {comp}
                              </span>
                            ))}
                          {question.company.length > 3 && (
                            <span
                              className={`inline-flex items-center px-3 py-1.5 text-sm font-semibold rounded-lg transition-all `}
                            >
                              +{question.company.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Practice Column */}
                    <div className="col-span-2 flex justify-center">
                      {question.content.practiceLinks?.url ? (
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={question.content.practiceLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-emerald-200">
                            <Code2 className="w-6 h-6 text-white" />
                          </div>
                          {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div> */}
                        </motion.a>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                          <Code2 className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Video Column */}
                    <div className="col-span-2 flex justify-center">
                      {question.content.youtubeLinks?.url ? (
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={question.content.youtubeLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-red-400 via-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-red-200">
                            <PlayCircle className="w-6 h-6 text-white" />
                          </div>
                          {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div> */}
                        </motion.a>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                          <PlayCircle className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Notes Column */}
                    <div className="col-span-2 flex justify-center">
                      {question.content.notesLinks?.url ? (
                        <motion.a
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          href={question.content.notesLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-blue-200">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div> */}
                        </motion.a>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                          <FileText className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Star Column for Revision */}
                    <div className="col-span-1 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleRevision(question._id)}
                        className="group relative"
                      >
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            revisionQuestions.includes(question._id)
                              ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-200"
                              : "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Star
                            className={`w-7 h-7 transition-all duration-200 ${
                              revisionQuestions.includes(question._id)
                                ? "text-white fill-white"
                                : "text-gray-400 group-hover:text-yellow-500"
                            }`}
                          />
                        </div>
                        {revisionQuestions.includes(question._id) && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              ★
                            </span>
                          </div>
                        )}
                      </motion.button>
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
