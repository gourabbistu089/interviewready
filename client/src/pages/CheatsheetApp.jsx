import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Heart,
  Download,
  ChevronRight,
  ChevronDown,
  Target,
  Zap,
  Brain,
  Code2,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { API_URL } from "../constants.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheatsheetApp = () => {
  const [cheatsheets, setCheatsheets] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [currentCheatsheet, setCurrentCheatsheet] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Language configuration with proper icons and modern colors
  const languages = [
    {
      id: "javascript",
      name: "JavaScript",
      icon: "🟨",
      color: "bg-yellow-400",
      accent: "border-yellow-400",
      bgGradient: "from-yellow-50 to-yellow-100",
      hoverBg: "hover:bg-yellow-50",
    },
    {
      id: "typescript",
      name: "TypeScript",
      icon: "🔷",
      color: "bg-blue-500",
      accent: "border-blue-500",
      bgGradient: "from-blue-50 to-blue-100",
      hoverBg: "hover:bg-blue-50",
    },
    {
      id: "python",
      name: "Python",
      icon: "🐍",
      color: "bg-green-500",
      accent: "border-green-500",
      bgGradient: "from-green-50 to-green-100",
      hoverBg: "hover:bg-green-50",
    },
    {
      id: "java",
      name: "Java",
      icon: "☕",
      color: "bg-orange-500",
      accent: "border-orange-500",
      bgGradient: "from-orange-50 to-orange-100",
      hoverBg: "hover:bg-orange-50",
    },
    {
      id: "cpp",
      name: "C++",
      icon: "⚡",
      color: "bg-purple-500",
      accent: "border-purple-500",
      bgGradient: "from-purple-50 to-purple-100",
      hoverBg: "hover:bg-purple-50",
    },
    {
      id: "c",
      name: "C",
      icon: "🔧",
      color: "bg-gray-600",
      accent: "border-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      hoverBg: "hover:bg-gray-50",
    },
    {
      id: "php",
      name: "PHP",
      icon: "🐘",
      color: "bg-indigo-500",
      accent: "border-indigo-500",
      bgGradient: "from-indigo-50 to-indigo-100",
      hoverBg: "hover:bg-indigo-50",
    },
    {
      id: "pandas",
      name: "Pandas",
      icon: "🐼",
      color: "bg-teal-500",
      accent: "border-teal-500",
      bgGradient: "from-teal-50 to-teal-100",
      hoverBg: "hover:bg-teal-50",
    },
    { id: "numpy",
      name: "NumPy",
      icon: "🔢",
      color: "bg-cyan-500",
      accent: "border-cyan-500",
      bgGradient: "from-cyan-50 to-cyan-100",
      hoverBg: "hover:bg-cyan-50",
    },
  ];

  // Fetch cheatsheet data
  const fetchCheatsheet = async (language) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(`${API_URL}/cheatsheets/${language}`);
      console.log("data", data);

      if (!data) {
        throw new Error("Failed to fetch cheatsheet");
      }
      setCurrentCheatsheet(data);

      // Auto-expand all sections by default
      const firstSectionId = data.sections?.[0]?._id;
      setExpandedSections(new Set([firstSectionId]));
      // const allSectionIds = data.sections?.map((_, index) => index) || [];
      // setExpandedSections(new Set(allSectionIds));
    } catch (err) {
      setError(err.message);
      setCurrentCheatsheet(null);
    } finally {
      setLoading(false);
    }
  };
  console.log("expandedSections", expandedSections);

  // Copy to clipboard functionality
  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  // Toggle favorite
  const toggleFavorite = (conceptId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(conceptId)) {
      newFavorites.delete(conceptId);
    } else {
      newFavorites.add(conceptId);
    }
    setFavorites(newFavorites);
  };

  // Toggle section expansion
  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.clear();
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };
  // Difficulty badge component
  const DifficultyBadge = ({ difficulty }) => {
    const badgeStyles = {
      beginner: "bg-green-100 text-green-700 border-green-200",
      intermediate: "bg-amber-100 text-amber-700 border-amber-200",
      advanced: "bg-red-100 text-red-700 border-red-200",
    };

    const icons = {
      beginner: <Target className="w-3 h-3" />,
      intermediate: <Zap className="w-3 h-3" />,
      advanced: <Brain className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
          badgeStyles[difficulty] || badgeStyles.beginner
        }`}
      >
        {icons[difficulty]}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  // Initialize
  useEffect(() => {
    fetchCheatsheet(selectedLanguage);
  }, [selectedLanguage]);

  const currentLang = languages.find((lang) => lang.id === selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-screen mx-auto flex gap-0 min-h-[calc(100vh-120px)]">
        {/* Language Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white  border border-gray-200 shadow-lg overflow-hidden sticky top-8">
            <div className="p-6 ">
              <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                <Code2 className="w-6 h-6" />
                Cheatsheets
              </h2>
              <p className="text-indigo-900 text-sm mt-1">
                Choose your interview focus
              </p>
            </div>

            <div className="p-4 space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                    selectedLanguage === lang.id
                      ? `bg-gradient-to-r ${lang.bgGradient} border-2 ${lang.accent} shadow-md`
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${lang.color} text-white shadow-sm`}
                    >
                      <span className="text-lg font-bold">
                        {lang.id === "javascript" && "JS"}
                        {lang.id === "typescript" && "TS"}
                        {lang.id === "python" && "PY"}
                        {lang.id === "java" && "JV"}
                        {lang.id === "cpp" && "C++"}
                        {lang.id === "c" && "C"}
                        {lang.id === "php" && "PHP"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        {lang.name}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {selectedLanguage === lang.id
                          ? "Currently viewing"
                          : "Click to switch"}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform ${
                      selectedLanguage === lang.id ? "text-gray-600" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white  border border-gray-200 shadow-lg overflow-hidden min-h-full">
            {/* Content Header */}
            <div className="p-8  text-black">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 ${currentLang?.color} rounded-xl shadow-lg`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {currentLang?.id === "javascript" && "JS"}
                      {currentLang?.id === "typescript" && "TS"}
                      {currentLang?.id === "python" && "PY"}
                      {currentLang?.id === "java" && "JV"}
                      {currentLang?.id === "cpp" && "C++"}
                      {currentLang?.id === "c" && "C"}
                      {currentLang?.id === "php" && "PHP"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {currentCheatsheet?.title ||
                        `${currentLang?.name} Interview Guide`}
                    </h2>
                    <p className="text-indigo-900 mt-2 text-lg">
                      {currentCheatsheet?.description ||
                        `Master ${currentLang?.name} for your next technical interview`}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() =>
                      navigate(
                        `/ai-quiz/${currentCheatsheet.title}/${currentCheatsheet?.description}/?questions=50`
                      )
                    }
                    className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer focus:ring-opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <PlayCircle size={20} />
                      <span className="text-sm font-medium">
                        Start Mock Interview
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-xl font-semibold text-gray-700">
                      Loading your cheatsheet...
                    </p>
                    <p className="text-gray-500 mt-2">
                      Preparing the best interview content for you
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-24">
                  <div className="text-6xl mb-6">😕</div>
                  <div className="text-red-600 text-xl font-semibold mb-2">
                    Oops! Something went wrong
                  </div>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={() => fetchCheatsheet(selectedLanguage)}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-medium shadow-lg"
                  >
                    Try Again
                  </button>
                </div>
              ) : !currentCheatsheet?.sections?.length ? (
                <div className="text-center py-24">
                  <Code2 className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                  <p className="text-gray-500 text-xl">
                    No content available yet
                  </p>
                  <p className="text-gray-400 mt-2">
                    Check back soon for interview materials!
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {currentCheatsheet.sections.map((section, sectionIdx) => (
                    <div
                      key={sectionIdx}
                      className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section?._id)}
                        className="w-full px-8 py-6 bg-white hover:bg-gray-50 border-b border-gray-200 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 ${currentLang?.color} rounded-lg`}
                          >
                            <span className="text-white font-bold text-lg">
                              {String(sectionIdx + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                              {section.title}
                            </h3>
                            <p className="text-gray-500 mt-1">
                              {section.items.length} concept
                              {section.items.length !== 1 ? "s" : ""} to master
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right text-sm text-gray-500">
                            {expandedSections.has(section?._id)
                              ? "Click to collapse"
                              : "Click to expand"}
                          </div>
                          {expandedSections.has(section?._id) ? (
                            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          ) : (
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          )}
                        </div>
                      </button>

                      {/* Section Content */}
                      {expandedSections.has(section?._id) && (
                        <div className="p-8 space-y-8">
                          {section.items.map((item, itemIdx) => {
                            const conceptId = `${sectionIdx}-${itemIdx}`;
                            const isFavorite = favorites.has(conceptId);

                            return (
                              <div
                                key={itemIdx}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                              >
                                {/* Concept Header */}
                                <div className="px-6 py-5 border-b border-gray-100">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-4 mb-3">
                                        <h4 className="font-bold text-gray-900 text-xl">
                                          {item.concept}
                                        </h4>
                                        <DifficultyBadge
                                          difficulty={item.difficulty}
                                        />
                                      </div>
                                      <p className="text-gray-600 leading-relaxed">
                                        {item.explanation}
                                      </p>

                                      {/* Tags */}
                                      {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                          {item.tags.map((tag, tagIdx) => (
                                            <span
                                              key={tagIdx}
                                              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium border border-indigo-200"
                                            >
                                              #{tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    <button
                                      onClick={() => toggleFavorite(conceptId)}
                                      className={`p-3 rounded-xl transition-all duration-300 ${
                                        isFavorite
                                          ? "bg-red-100 text-red-600 hover:bg-red-200 shadow-md"
                                          : "bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                      }`}
                                      title={
                                        isFavorite
                                          ? "Remove from favorites"
                                          : "Add to favorites"
                                      }
                                    >
                                      <Heart
                                        className={`w-5 h-5 ${
                                          isFavorite ? "fill-current" : ""
                                        }`}
                                      />
                                    </button>
                                  </div>
                                </div>

                                {/* Code Block */}
                                <div className="relative">
                                  <div className="absolute top-4 right-4 z-10">
                                    <button
                                      onClick={() =>
                                        copyToClipboard(item.code, conceptId)
                                      }
                                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-all duration-300 shadow-lg backdrop-blur-sm"
                                      title="Copy code to clipboard"
                                    >
                                      {copiedCode === conceptId ? (
                                        <Check className="w-5 h-5 text-green-400" />
                                      ) : (
                                        <Copy className="w-5 h-5" />
                                      )}
                                    </button>
                                  </div>

                                  <div className="bg-gray-900 p-6">
                                    <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed font-mono">
                                      <code>{item.code}</code>
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheatsheetApp;
