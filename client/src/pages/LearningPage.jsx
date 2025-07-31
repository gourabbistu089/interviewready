import React, { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";

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

import LearningResourceTable from "../components/LearningResourceTable";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

function LearningPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedSubtopics, setCompletedSubtopics] = useState([]);

  // Get topics from Redux store
  const topicsData = useSelector((state) => state.topics.topics);

  // Memoize filtered topics to avoid unnecessary recalculations
  const topics = useMemo(() => {
    if (!topicsData || topicsData.length === 0) return [];

    return topicsData.filter((topic) => topic.practiceTopics !== true);
  }, [topicsData]);

  // Set initial selected topic when topics are loaded
  useEffect(() => {
    if (topics.length > 0 && !selectedTopic) {
      setSelectedTopic(topics[0]);
    }
  }, [topics, selectedTopic]);

  // Memoize subtopics to avoid recalculation
  const subtopics = useMemo(() => {
    return selectedTopic?.subTopics || [];
  }, [selectedTopic]);

  // Memoize filtered resources based on search term
  const filteredResources = useMemo(() => {
    if (!searchTerm.trim()) {
      return subtopics;
    }

    return subtopics.filter((resource) =>
      resource.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subtopics, searchTerm]);

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSearchTerm(""); // Clear search when switching topics
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get the Progress data
  const getProgressData = async () => {
    try {
      const res = await axios.get(`${API_URL}/progress/${selectedTopic._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const progressData = res.data.data;
        console.log("progressData 1", progressData);
        setCompletedSubtopics(progressData[0]?.completedSubtopics || []);
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };
  const updateProgress = async (id, type) => {
    try {
      const res = await axios.post(
        `${API_URL}/progress/`,
        {
          topicId: selectedTopic._id,
          subtopicId: id,
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

  useEffect(() => {
    if (selectedTopic) {
      getProgressData();
    }
  }, [selectedTopic]);

  // console.log("topicsData from redux", topicsData);
  // console.log("filtered topics", topics);
  console.log("completedSubtopics", completedSubtopics);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar - Topics */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Learning Topics
            </h2>
            <p className="text-gray-600 text-sm">
              Choose a topic to start learning
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {topics.map((topic) => {
                const Icon = ICON_MAP[topic.icon] || BookOpen;

                return (
                  <button
                    key={topic._id}
                    onClick={() => handleTopicSelect(topic)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedTopic?._id === topic._id
                        ? "bg-blue-50 border-2 border-blue-200 text-blue-700"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <p className="font-medium">{topic?.title}</p>
                        <p className="text-xs text-gray-500">
                          {topic?.subTopics?.length || 0} resources
                        </p>
                      </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedTopic?.title || "Select a Topic"}
            </h1>
            <p className="text-gray-600 mb-4">
              {selectedTopic?.description ||
                "Choose a topic from the sidebar to get started"}
            </p>
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (completedSubtopics.length /
                      selectedTopic?.subTopics?.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                {completedSubtopics.length} of{" "}
                {selectedTopic?.subTopics?.length} completed
              </span>
              <span>
                {Math.round((completedSubtopics.length /
                  selectedTopic?.subTopics?.length) *
                  100)}
                % progress
              </span>
            </div>
          </div>

          {/* Search Bar */}
          {selectedTopic && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Content */}
          {selectedTopic && (
            <>
              {filteredResources.length > 0 ? (
                <LearningResourceTable
                  filteredResources={filteredResources}
                  completedSubtopics={completedSubtopics}
                  setCompletedSubtopics={setCompletedSubtopics}
                  updateProgress={updateProgress}
                />
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm
                      ? "No resources found"
                      : "No resources available"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "Try adjusting your search or select a different topic."
                      : "This topic doesn't have any resources yet."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
