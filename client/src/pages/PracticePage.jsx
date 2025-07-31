import React, { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  Bookmark,
  Play,
  Youtube,
  FileText,
  PenTool,
  ExternalLink,
  Monitor,
  Layers,
  Server,
  Shield,
  Cpu,
  Network,
  GitBranch,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useSelector } from "react-redux";
import PracticeResourceTable from "../components/PracticeResourceTable";
import axios from "axios";
import { API_URL } from "../constants";
const ICON_MAP = {
  Search,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  Bookmark,
  Play,
  Youtube,
  FileText,
  PenTool,
  ExternalLink,
  Monitor,
  Layers,
  Server,
  Shield,
  Cpu,
  Network,
  GitBranch,
  Zap,
};

function PracticePage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionProgress, setQuestionProgress] = useState([]);

  const topicsData = useSelector((state) => state.topics.topics);
  // console.log("topicsData from redux", topicsData);
  useEffect(() => {
    if (topicsData && topicsData.length > 0) {
      const practiceTopics = topicsData.filter(
        (topic) => topic.practiceTopics === true
      );
      // console.log("nonPracticeTopics", practiceTopics);
      setTopics(practiceTopics); // Set only practice topics
      setSelectedTopic(practiceTopics[0]); // Set the first topic as selected by default
      setSubtopics(practiceTopics[0].subTopics || []); // Set subtopics of the first topic by default
      setFilteredResources(practiceTopics[0].subTopics || []); // Set resources of the first topic by default
      setQuestions(practiceTopics[0].subTopics[0].questions || []); // Set questions of the first topic by default
    }
  }, [topicsData]);

  // console.log("topics", topics);
  // console.log("selectedTopic", selectedTopic);
  // console.log("subtopics", subtopics);
  // console.log("filteredResources", filteredResources);
  // console.log("questions", questions);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Left Sidebar - Categories */}
        <div className="w-80 bg-white/80 backdrop-blur-sm shadow-xl border-r border-slate-200 min-h-screen">
          <div className="p-6 border-b border-slate-200 bg-white/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Practice Hub
            </h2>
            <p className="text-slate-600 text-sm">
              Master interview questions across all topics
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {topics.map((topic) => {
                const Icon = ICON_MAP[topic.icon] || BookOpen; // fallback to BookOpen
                const isSelected = selectedTopic === topic;
                return (
                  <button
                    key={topic._id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setFilteredResources(topic.subTopics || []); // Set resources of the selected topic
                      setSubtopics(topic.subTopics);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 group ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "bg-white/60 hover:bg-white/80 text-slate-700 hover:shadow-md border border-slate-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? "bg-white/20" : `bg-${topic.color}-50`
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isSelected
                              ? "text-white"
                              : `text-${topic.color}-600`
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{topic.title}</p>
                        <p
                          className={`text-xs ${
                            isSelected ? "text-white/80" : "text-slate-500"
                          }`}
                        >
                          {topic?.count} questions
                        </p>
                      </div>
                      <TrendingUp
                        className={`h-4 w-4 ${
                          isSelected ? "text-white/60" : "text-slate-400"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                {/* <Target className="h-6 w-6 text-white" /> */}
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {selectedTopic?.title}
                </h1>
                <p className="text-slate-600">{selectedTopic?.description}</p>
              </div>
            </div>

            {/* Progress Section */}
            {/*             
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-800">Progress</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {currentContent.solved} of {currentContent.totalQuestions} solved
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {Math.round(progressPercentage)}% Complete
                </div>
              </div>
              <div className="bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div> */}
          </div>

          {/* Search */}

          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value === "") {
                    setFilteredResources(subtopics);
                    return;
                  }
                  const filtered = filteredResources.filter((resource) =>
                    resource.title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setFilteredResources(filtered);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          {filteredResources.length > 0 ? (
            <>
              <PracticeResourceTable
                filteredResources={filteredResources}
              />
            </>
          ) : (
            <>
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or select a different topic.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PracticePage;
