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

import ResourcesTable from "../components/Rightsection";
import { useSelector } from "react-redux";

function LearningPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [subtopic, setSubtopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const topicsData = useSelector((state) => state.topics.topics);
  console.log("topicsData from redux", topicsData);
  useEffect(() => {
    if (topicsData && topicsData.length > 0) {
      const nonPracticeTopics = topicsData.filter(
        (topic) => topic.practiceTopics !== true
      );
      console.log("nonPracticeTopics", nonPracticeTopics);
      setTopics(nonPracticeTopics); // Set only practice topics
      setSelectedTopic(nonPracticeTopics[0]); // Set the first topic as selected by default
      setSubtopics(nonPracticeTopics[0].subTopics || []); // Set subtopics of the first topic by default
      setFilteredResources(nonPracticeTopics[0].subTopics || []); // Set resources of the first topic by default
    }
  }, [topicsData]);

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
            {/* <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}

            <div className="space-y-2">
              {topics.map((topic) => {
                const Icon = ICON_MAP[topic.icon] || BookOpen; // fallback to BookOpen

                return (
                  <button
                    key={topic._id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setFilteredResources(topic.subTopics || []); // Set resources of the selected topic
                      setSubtopic(topic.subTopics);
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedTopic._id === topic._id
                        ? "bg-blue-50 border-2 border-blue-200 text-blue-700"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <p className="font-medium">{topic?.title}</p>
                        <p className="text-xs text-gray-500">
                          {topic?.subTopics?.length} resources
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rightn Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedTopic?.title}
            </h1>
            <p className="text-gray-600 mb-4">{selectedTopic?.description}</p>

            {/* Progress Bar */}
            {/* <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentContent.completed} of {currentContent.totalItems} completed</span>
              <span>{Math.round(progressPercentage)}% progress</span>
            </div> */}
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value === "") {
                    setFilteredResources(subtopic);
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
          {filteredResources?.length > 0 && (
            <>
              {/* Search */}

              <ResourcesTable filteredResources={filteredResources} />
            </>
          )}
          {/* Resources Table */}
          {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Topic</th>
                    <th className="text-left p-4 font-medium text-gray-900">Type</th>
                    <th className="text-left p-4 font-medium text-gray-900">Resources</th>
                    <th className="text-left p-4 font-medium text-gray-900">Time</th>
                    <th className="text-left p-4 font-medium text-gray-900">Difficulty</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource, index) => (
                    <tr key={resource.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        {getStatusIcon(resource.status)}
                      </td>
                      <td className="p-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {resource.topics.map((topic, topicIndex) => (
                              <span
                                key={topicIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="YouTube">
                            <Youtube className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="Blog Post">
                            <FileText className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Handwritten Notes">
                            <PenTool className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-600">{resource.estimatedTime}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            className={`p-1 rounded transition-colors ${
                              resource.bookmarked
                                ? 'text-yellow-600 bg-yellow-50'
                                : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                            }`}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1">
                            <Play className="h-3 w-3" />
                            <span>Start</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}

          {filteredResources?.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or select a different topic.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
