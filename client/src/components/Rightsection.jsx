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
  BookOpen
} from 'lucide-react';

const ResourcesTable = ({filteredResources}) => {
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [completedItems, setCompletedItems] = useState(new Set());

//   const filteredResources = [
//     {
//       content: {
//         youtubeLinks: [
//           {
//             title: "OOP Principles Explained",
//             url: "https://www.youtube.com/watch?v=oJGcGz7gFHI",
//             duration: "18:10",
//             _id: "686e89f5500480fe401aefe7"
//           }
//         ],
//         notesLinks: [
//           {
//             title: "OOP Principles Notes",
//             url: "https://example.com/oop-principles",
//             type: "external",
//             _id: "686e89f5500480fe401aefe8"
//           }
//         ],
//         handwrittenPDFs: [
//           {
//             title: "OOP Principles - Handwritten",
//             driveUrl: "https://drive.google.com/file/d/xyz456/view",
//             fileName: "oop_principles_notes.pdf",
//             _id: "686e89f5500480fe401aefe9"
//           }
//         ]
//       },
//       _id: "686e89f5500480fe401aefe6",
//       title: "Classes and Objects Fundamentals",
//       description: "Understanding the core concepts of object-oriented programming",
//       tags: ["Classes", "Objects", "Constructors"],
//       difficulty: "Easy",
//       estimatedTime: "45 min",
//       order: 1,
//       isActive: true
//     },
//     {
//       content: {
//         youtubeLinks: [
//           {
//             title: "Inheritance in Java",
//             url: "https://www.youtube.com/watch?v=example1",
//             duration: "25:30",
//             _id: "686e89f5500480fe401aefe10"
//           }
//         ],
//         notesLinks: [
//           {
//             title: "Inheritance Notes",
//             url: "https://example.com/inheritance",
//             type: "external",
//             _id: "686e89f5500480fe401aefe11"
//           }
//         ],
//         handwrittenPDFs: []
//       },
//       _id: "686e89f5500480fe401aefe14",
//       title: "Inheritance and Polymorphism",
//       description: "Learn about inheritance hierarchy and polymorphic behavior",
//       tags: ["Inheritance", "Polymorphism", "Method Overriding"],
//       difficulty: "Medium",
//       estimatedTime: "60 min",
//       order: 2,
//       isActive: true
//     },
//     {
//       content: {
//         youtubeLinks: [
//           {
//             title: "Encapsulation Tutorial",
//             url: "https://www.youtube.com/watch?v=example2",
//             duration: "20:45",
//             _id: "686e89f5500480fe401aefe15"
//           }
//         ],
//         notesLinks: [
//           {
//             title: "Encapsulation Best Practices",
//             url: "https://example.com/encapsulation",
//             type: "external",
//             _id: "686e89f5500480fe401aefe16"
//           }
//         ],
//         handwrittenPDFs: [
//           {
//             title: "Encapsulation Diagrams",
//             driveUrl: "https://drive.google.com/file/d/example/view",
//             fileName: "encapsulation_notes.pdf",
//             _id: "686e89f5500480fe401aefe17"
//           }
//         ]
//       },
//       _id: "686e89f5500480fe401aefe18",
//       title: "Encapsulation and Abstraction",
//       description: "Master data hiding and abstraction techniques",
//       tags: ["Encapsulation", "Abstraction", "Access Modifiers"],
//       difficulty: "Medium",
//       estimatedTime: "50 min",
//       order: 3,
//       isActive: true
//     },
//     {
//       content: {
//         youtubeLinks: [
//           {
//             title: "Design Patterns Overview",
//             url: "https://www.youtube.com/watch?v=example3",
//             duration: "45:20",
//             _id: "686e89f5500480fe401aefe19"
//           }
//         ],
//         notesLinks: [
//           {
//             title: "Design Patterns Guide",
//             url: "https://example.com/patterns",
//             type: "external",
//             _id: "686e89f5500480fe401aefe20"
//           }
//         ],
//         handwrittenPDFs: []
//       },
//       _id: "686e89f5500480fe401aefe22",
//       title: "Design Patterns Introduction",
//       description: "Common design patterns and their practical applications",
//       tags: ["Singleton", "Factory", "Observer"],
//       difficulty: "Hard",
//       estimatedTime: "90 min",
//       order: 4,
//       isActive: false
//     },
//     {
//       content: {
//         youtubeLinks: [
//           {
//             title: "SOLID Principles Explained",
//             url: "https://www.youtube.com/watch?v=example4",
//             duration: "35:15",
//             _id: "686e89f5500480fe401aefe23"
//           }
//         ],
//         notesLinks: [
//           {
//             title: "SOLID Principles Guide",
//             url: "https://example.com/solid",
//             type: "external",
//             _id: "686e89f5500480fe401aefe24"
//           }
//         ],
//         handwrittenPDFs: [
//           {
//             title: "SOLID Principles Notes",
//             driveUrl: "https://drive.google.com/file/d/solid123/view",
//             fileName: "solid_principles.pdf",
//             _id: "686e89f5500480fe401aefe25"
//           }
//         ]
//       },
//       _id: "686e89f5500480fe401aefe27",
//       title: "SOLID Principles",
//       description: "Five essential design principles for maintainable software",
//       tags: ["Single Responsibility", "Open/Closed", "Liskov Substitution"],
//       difficulty: "Hard",
//       estimatedTime: "75 min",
//       order: 5,
//       isActive: false
//     }
//   ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
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
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleResourceClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen  p-0">
      <div className="max-w-6xl mx-auto">
    
        {/* Main Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50/30 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left p-6 font-semibold text-slate-700 w-12">Status</th>
                  <th className="text-left p-6 font-semibold text-slate-700">Topic</th>
                  <th className="text-left p-6 font-semibold text-slate-700 w-24">
                    <div className="flex items-center justify-center">
                      <Youtube className="h-5 w-5 text-red-500" />
                    </div>
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 w-24">
                    <div className="flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 w-24">
                    <div className="flex items-center justify-center">
                      <PenTool className="h-5 w-5 text-green-500" />
                    </div>
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 w-24">Time</th>
                  <th className="text-left p-6 font-semibold text-slate-700 w-28">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResources.map((resource) => {
                  const isBookmarked = bookmarkedItems.has(resource._id);
                  const isCompleted = completedItems.has(resource._id);
                  
                  return (
                    <tr key={resource._id} className="hover:bg-slate-50 px-4  transition-all duration-200">
                      {/* Status Column */}
                      <td className="p-6">
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
                      <td className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 text-lg mb-1">{resource.title}</h3>
                              {/* <p className="text-slate-600 text-sm mb-3">{resource.description}</p> */}
                            </div>
                            <button
                              onClick={() => toggleBookmark(resource._id)}
                              className={`ml-4 p-2 rounded-lg transition-all duration-200 ${
                                isBookmarked
                                  ? 'bg-amber-100 text-amber-600 shadow-md'
                                  : 'bg-slate-100 text-slate-400 hover:bg-amber-100 hover:text-amber-600'
                              }`}
                            >
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {resource.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* YouTube Column */}
                      <td className="p-6">
                        <div className="flex justify-center">
                          {resource.content.youtubeLinks && resource.content.youtubeLinks.length > 0 ? (
                            <button
                              onClick={() => handleResourceClick(resource.content.youtubeLinks[0].url)}
                              className="p-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-lg border border-red-200 transition-all duration-200 group"
                            >
                              <Youtube className="h-6 w-6 text-red-600 group-hover:text-red-700" />
                            </button>
                          ) : (
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <Youtube className="h-6 w-6 text-slate-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Blogs Column */}
                      <td className="p-6">
                        <div className="flex justify-center">
                          {resource.content.notesLinks && resource.content.notesLinks.length > 0 ? (
                            <button
                              onClick={() => handleResourceClick(resource.content.notesLinks[0].url)}
                              className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border border-blue-200 transition-all duration-200 group"
                            >
                              <FileText className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                            </button>
                          ) : (
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <FileText className="h-6 w-6 text-slate-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* PDFs Column */}
                      <td className="p-6">
                        <div className="flex justify-center">
                          {resource.content.handwrittenPDFs && resource.content.handwrittenPDFs.length > 0 ? (
                            <button
                              onClick={() => handleResourceClick(resource.content.handwrittenPDFs[0].driveUrl)}
                              className="p-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg border border-green-200 transition-all duration-200 group"
                            >
                              <PenTool className="h-6 w-6 text-green-600 group-hover:text-green-700" />
                            </button>
                          ) : (
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <PenTool className="h-6 w-6 text-slate-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Time Column */}
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600 font-medium">{resource.estimatedTime}</span>
                        </div>
                      </td>

                      {/* Difficulty Column */}
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
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

export default ResourcesTable;