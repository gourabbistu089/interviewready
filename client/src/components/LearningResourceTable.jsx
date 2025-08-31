
import React, { useState } from 'react';
import { 
  Youtube, 
  FileText, 
  PenTool, 
  Bookmark, 
  Play, 
  Clock, 
  CheckCircle,
  Circle,
  Star,
  ExternalLink,
  BookOpen,
  X
} from 'lucide-react';
import QuizComponent from '../pages/AiQuizPage';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const LearningResourceTable = ({filteredResources,completedSubtopics, setCompletedSubtopics,updateProgress,selectedTopic}) => {
  console.log("selectedTopic in ResourcesTable", selectedTopic);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [completedItems, setCompletedItems] = useState(new Set());
  console.log("completedSubtopics in ResourcesTable", completedSubtopics);
  console.log("completedItems in ResourcesTable", completedItems);
  console.log("filteredResources in ResourcesTable", filteredResources);
  const [quizeResource, setQuizeResource] = useState(null);
  const [quizData, setQuizData] = useState(null);
  
useEffect(() => {
  if (completedSubtopics?.length) {
    const ids = new Set(completedSubtopics.map(sub => sub._id));
    setCompletedItems(ids);
  }
}, [completedSubtopics]);
  
  // console.log("quizData in ResourcesTable", quizData);
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'hard':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const toggleBookmark = (id) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };


  const toggleComplete = (id) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(id)) {
        setCompletedSubtopics(prev => [...prev, { _id: id }]);
        newSet.add(id);
        // update data on database
        updateProgress(id, 'subtopic');
      }
      return newSet;
    });
  };

  const handleResourceClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-h-screen overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 p-0 ">
      <div className="max-w-7xl mx-auto">
        {/* Main Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100/80 to-blue-100/80 border-b border-slate-200/70">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700 w-12">Status</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Topic</th>
                  <th className=" p-4 font-semibold text-slate-700 w-24 text-center">
                    YouTube
                  </th>
                  <th className=" p-4 font-semibold text-slate-700 w-24 text-center">
                    Notes
                  </th>
                  <th className=" p-4 font-semibold text-slate-700 w-24 text-center">
                    PDFs
                  </th>
                  <th className=" p-4 font-semibold text-slate-700 w-24 text-center">Time</th>
                  <th className=" p-4 font-semibold text-slate-700 w-32 text-center">Test</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResources.map((resource) => {
                  const isBookmarked = bookmarkedItems.has(resource._id);
                  const isCompleted = completedItems.has(resource._id);
                  
                  return (
                    <tr key={resource._id} className="hover:bg-slate-50/70 transition-all duration-200 group ">
                      {/* Status Column */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleComplete(resource._id)}
                          className="text-slate-400 hover:text-emerald-500 transition-colors duration-200"
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <Circle className="h-6 w-6" />
                          )}
                        </button>
                      </td>

                      {/* Topic Column */}
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-5 mb-2">
                                <h3 className="font-semibold text-slate-800 text-base">{resource.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                                  {resource.difficulty}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleBookmark(resource._id)}
                              className={`ml-3 p-2 rounded-xl transition-all duration-200 shadow-sm ${
                                isBookmarked
                                  ? 'bg-amber-100 text-amber-600 shadow-md'
                                  : 'bg-slate-100 text-slate-400 hover:bg-amber-100 hover:text-amber-600'
                              }`}
                            >
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* YouTube Column */}
                      <td className="p-4">
                        <div className="flex justify-center">
                          {resource.content.youtubeLinks?.url ? (
                            <button
                              onClick={() => handleResourceClick(resource.content.youtubeLinks.url)}
                              className="p-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-xl border border-red-200/50 transition-all duration-200 group-hover:scale-105 transform shadow-sm"
                            >
                              <Youtube className="h-5 w-5 text-red-600" />
                            </button>
                          ) : (
                            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/50">
                              <Youtube className="h-5 w-5 text-slate-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Notes Column */}
                      <td className="p-4">
                        <div className="flex justify-center">
                          {resource.content.notesLinks?.url ? (
                            <button
                              onClick={() => handleResourceClick(resource.content.notesLinks.url)}
                              className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200/50 transition-all duration-200 group-hover:scale-105 transform shadow-sm"
                            >
                              <FileText className="h-5 w-5 text-blue-600" />
                            </button>
                          ) : (
                            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/50">
                              <FileText className="h-5 w-5 text-slate-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* PDFs Column */}
                      <td className="p-4">
                        <div className="flex justify-center">
                          {resource.content.handwrittenPDFs?.url ? (
                            <button
                              onClick={() => handleResourceClick(resource.content.handwrittenPDFs.url)}
                              className="p-2 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border border-green-200/50 transition-all duration-200 group-hover:scale-105 transform shadow-sm"
                            >
                              <PenTool className="h-5 w-5 text-green-600" />
                            </button>
                          ) : (
                            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/50">
                              <PenTool className="h-5 w-5 text-slate-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Time Column */}
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600 font-medium">{resource.estimatedTime}</span>
                        </div>
                      </td>

                      {/* Start Test Column */}
                      <td className="p-4">
                        <div className="flex justify-center">
                          <NavLink
                           to={'/ai-quiz/' + selectedTopic + '/' + resource.title}
                            className={`px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-xl border border-purple-200/50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center space-x-2
                              disabled:opacity-50 disabled:cursor-not-allowed
                              `}
                          >
                            <Play className="h-4 w-4" />
                            <span className="text-sm font-medium">Start</span>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningResourceTable;