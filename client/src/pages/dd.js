


import React, { useState } from 'react';
import { 
  Search, 
  Code, 
  Database, 
  FileText, 
  Filter,
  Star,
  CheckCircle,
  Clock,
  Play,
  Youtube,
  PenTool,
  ExternalLink,
  Bookmark,
  Building2,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Target,
  Award,
  Zap,
  Brain,
  Settings,
  BookOpen,
  List,
  TreePine,
  Network,
  Hash,
  Layers,
  GitBranch,
  Search as SearchIcon,
  ArrowRight,
  BarChart3,
  Trophy,
  Timer,
  Users,
  Lightbulb,
  Code2,
  Sparkles
} from 'lucide-react';

const PracticePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('dsa');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    'arrays': false,
    'strings': false,
    'linked-lists': false,
    'stacks-queues': false,
    'trees': false,
    'graphs': false,
    'dynamic-programming': false,
    'sorting-searching': false,
    'basic-queries': false,
    'joins': false,
    'aggregation': false,
    'window-functions': false,
    'java-basics': false,
    'python-basics': false,
    'cpp-basics': false,
    'system-design-basics': false
  });

  const categories = [
    { id: 'dsa', name: 'Data Structures & Algorithms', icon: Brain, count: 850, color: 'blue' },
    { id: 'sql', name: 'SQL Questions', icon: Database, count: 320, color: 'green' },
    { id: 'programming', name: 'Programming Questions', icon: Code, count: 450, color: 'purple' },
    { id: 'system-design', name: 'System Design', icon: Settings, count: 120, color: 'orange' }
  ];

  // Mock data for demonstration
  const practiceContent = {
    dsa: {
      title: 'Data Structures & Algorithms',
      description: 'Master coding interviews with comprehensive DSA practice',
      solved: 127,
      totalQuestions: 850,
      sections: {
        'arrays': {
          title: 'Arrays & Hashing',
          description: 'Fundamental array operations and hashing techniques',
          count: 85,
          solved: 24,
          icon: Hash,
          difficulty: { easy: 30, medium: 40, hard: 15 },
          questions: [
            {
              id: 'two-sum',
              title: 'Two Sum',
              difficulty: 'Easy',
              frequency: 'Very High',
              acceptance: '49.5%',
              status: 'solved',
              bookmarked: true,
              companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
              topics: ['Array', 'Hash Table'],
              resources: {
                youtube: 'https://youtube.com/watch?v=example',
                blog: 'https://blog.example.com',
                notes: true,
                leetcode: 'https://leetcode.com/problems/two-sum/'
              }
            },
            {
              id: 'valid-anagram',
              title: 'Valid Anagram',
              difficulty: 'Easy',
              frequency: 'High',
              acceptance: '62.1%',
              status: 'attempted',
              bookmarked: false,
              companies: ['Amazon', 'Microsoft', 'Apple'],
              topics: ['Hash Table', 'String', 'Sorting'],
              resources: {
                youtube: 'https://youtube.com/watch?v=example',
                leetcode: 'https://leetcode.com/problems/valid-anagram/'
              }
            }
          ]
        },
        'strings': {
          title: 'String Processing',
          description: 'String manipulation and pattern matching problems',
          count: 65,
          solved: 18,
          icon: FileText,
          difficulty: { easy: 25, medium: 30, hard: 10 },
          questions: []
        }
      }
    }
  };

  const currentContent = practiceContent[selectedCategory] || practiceContent['dsa'];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'attempted': return <Clock className="h-4 w-4 text-amber-500" />;
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200 shadow-sm';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200 shadow-sm';
      case 'Hard': return 'text-rose-700 bg-rose-50 border-rose-200 shadow-sm';
      default: return 'text-gray-700 bg-gray-50 border-gray-200 shadow-sm';
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'Very High': return 'text-rose-700 bg-rose-50 border-rose-200 shadow-sm';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200 shadow-sm';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200 shadow-sm';
      case 'Low': return 'text-emerald-700 bg-emerald-50 border-emerald-200 shadow-sm';
      default: return 'text-gray-700 bg-gray-50 border-gray-200 shadow-sm';
    }
  };

  const getCompanyColor = (company) => {
    const colors = {
      'Google': 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm',
      'Amazon': 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm',
      'Microsoft': 'bg-cyan-50 text-cyan-700 border-cyan-200 shadow-sm',
      'Facebook': 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm',
      'Apple': 'bg-gray-50 text-gray-700 border-gray-200 shadow-sm',
      'Netflix': 'bg-red-50 text-red-700 border-red-200 shadow-sm',
      'Uber': 'bg-gray-50 text-gray-700 border-gray-200 shadow-sm',
      'Oracle': 'bg-red-50 text-red-700 border-red-200 shadow-sm'
    };
    return colors[company] || 'bg-gray-50 text-gray-700 border-gray-200 shadow-sm';
  };

  const progressPercentage = (currentContent.solved / currentContent.totalQuestions) * 100;

  const getFilteredQuestions = () => {
    let allQuestions = [];
    Object.entries(currentContent.sections).forEach(([sectionId, section]) => {
      if (expandedSections[sectionId]) {
        section.questions.forEach(question => {
          const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               question.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
          const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
          const matchesCompany = selectedCompany === 'all' || question.companies.includes(selectedCompany);
          
          if (matchesSearch && matchesDifficulty && matchesCompany) {
            allQuestions.push({ ...question, sectionTitle: section.title });
          }
        });
      }
    });
    return allQuestions;
  };

  const filteredQuestions = getFilteredQuestions();

  const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'Oracle'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        {/* Left Sidebar - Categories */}
        <div className="w-80 bg-white/80 backdrop-blur-sm shadow-xl border-r border-slate-200 min-h-screen">
          <div className="p-6 border-b border-slate-200 bg-white/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Hub</h2>
            <p className="text-slate-600 text-sm">Master interview questions across all topics</p>
          </div>
          
          <div className="p-4">
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'bg-white/60 hover:bg-white/80 text-slate-700 hover:shadow-md border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected 
                          ? 'bg-white/20' 
                          : `bg-${category.color}-50`
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          isSelected 
                            ? 'text-white' 
                            : `text-${category.color}-600`
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{category.name}</p>
                        <p className={`text-xs ${
                          isSelected ? 'text-white/80' : 'text-slate-500'
                        }`}>
                          {category.count} questions
                        </p>
                      </div>
                      <TrendingUp className={`h-4 w-4 ${
                        isSelected ? 'text-white/60' : 'text-slate-400'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area - Enhanced */}
        <div className="flex-1 p-8 space-y-8">
          {/* Header Section - Enhanced */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">{currentContent.title}</h1>
                    <p className="text-slate-600 text-lg">{currentContent.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                    <Trophy className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Progress Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Your Progress</h3>
                        <p className="text-slate-600 text-sm">Keep up the great work!</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-slate-600">
                      {currentContent.solved} of {currentContent.totalQuestions} solved
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out relative"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-slate-600">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filters Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="h-5 w-5 text-slate-600" />
              <h3 className="font-semibold text-slate-800">Filter Questions</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search questions, topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  <option value="all">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Topics/Sections */}
          <div className="space-y-6">
            {Object.entries(currentContent.sections).map(([sectionId, section]) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections[sectionId];
              const sectionProgress = (section.solved / section.count) * 100;
              
              return (
                <div key={sectionId} className="group">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Enhanced Section Header */}
                    <button 
                      onClick={() => toggleSection(sectionId)}
                      className="w-full p-8 text-left hover:bg-white/80 transition-all duration-200 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-200">
                            <SectionIcon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">{section.title}</h3>
                            <p className="text-slate-600 mb-3">{section.description}</p>
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2">
                                <BarChart3 className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-600 font-medium">{section.count} questions</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm text-emerald-600 font-medium">{section.solved} solved</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-8">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800 mb-1">
                              {Math.round(sectionProgress)}%
                            </div>
                            <div className="w-32 bg-slate-200 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${sectionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-600">{section.difficulty.easy}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-amber-500 rounded-full shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-600">{section.difficulty.medium}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-rose-500 rounded-full shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-600">{section.difficulty.hard}</span>
                              </div>
                            </div>
                            
                            <div className="transition-transform duration-200">
                              {isExpanded ? (
                                <ChevronDown className="h-6 w-6 text-slate-400" />
                              ) : (
                                <ChevronRight className="h-6 w-6 text-slate-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Enhanced Section Content */}
                    {isExpanded && (
                      <div className="border-t border-slate-200/50 bg-white/40 backdrop-blur-sm">
                        <div className="p-8 space-y-6">
                          {section.questions.map((question, index) => (
                            <div
                              key={question.id}
                              className="group/question bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover/question:opacity-100 transition-opacity duration-300"></div>
                              
                              <div className="relative flex items-start justify-between">
                                <div className="flex items-start space-x-4 flex-1">
                                  <div className="mt-1 p-2 bg-white/60 rounded-xl border border-white/50">
                                    {getStatusIcon(question.status)}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-4">
                                      <h4 className="font-bold text-slate-800 hover:text-blue-600 cursor-pointer text-lg transition-colors">
                                        {question.title}
                                      </h4>
                                      {question.bookmarked && (
                                        <div className="p-1 bg-amber-50 rounded-lg border border-amber-200">
                                          <Bookmark className="h-4 w-4 text-amber-500 fill-current" />
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center space-x-3 mb-4">
                                      <span className={`px-3 py-1.5 text-sm font-medium rounded-xl border ${getDifficultyColor(question.difficulty)}`}>
                                        {question.difficulty}
                                      </span>
                                      <span className={`px-3 py-1.5 text-sm font-medium rounded-xl border ${getFrequencyColor(question.frequency)}`}>
                                        {question.frequency}
                                      </span>
                                      <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
                                        <BarChart3 className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm text-slate-600 font-medium">{question.acceptance} acceptance</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3 mb-4">
                                      <div className="flex items-center space-x-2">
                                        <Building2 className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm text-slate-600 font-medium">Companies:</span>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {question.companies.slice(0, 3).map((company) => (
                                          <span
                                            key={company}
                                            className={`px-3 py-1.5 text-sm font-medium rounded-xl border ${getCompanyColor(company)}`}
                                          >
                                            {company}
                                          </span>
                                        ))}
                                        {question.companies.length > 3 && (
                                          <span className="px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-xl border border-slate-200">
                                            +{question.companies.length - 3} more
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3 mb-6">
                                      <div className="flex items-center space-x-2">
                                        <Hash className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm text-slate-600 font-medium">Topics:</span>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {question.topics.map((topic) => (
                                          <span
                                            key={topic}
                                            className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                                          >
                                            {topic}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-6">
                                      {question.resources.youtube && (
                                        <a
                                          href={question.resources.youtube}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-800 transition-colors bg-red-50 px-3 py-2 rounded-xl border border-red-200 hover:bg-red-100"
                                        >
                                          <Youtube className="h-4 w-4" />
                                          <span className="font-medium">Watch Video</span>
                                        </a>
                                      )}
                                      {question.resources.blog && (
                                        <a
                                          href={question.resources.blog}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-2 rounded-xl border border-blue-200 hover:bg-blue-100"
                                        >
                                          <BookOpen className="h-4 w-4" />
                                          <span className="font-medium">Read Blog</span>
                                        </a>
                                      )}
                                      {question.resources.notes && (
                                        <button className="flex items-center space-x-2 text-sm text-emerald-600 hover:text-emerald-800 transition-colors bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100">
                                          <PenTool className="h-4 w-4" />
                                          <span className="font-medium">View Notes</span>
                                        </button>
                                      )}
                                      {question.resources.leetcode && (
                                        <a
                                          href={question.resources.leetcode}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center space-x-2 text-sm text-orange-600 hover:text-orange-800 transition-colors bg-orange-50 px-3 py-2 rounded-xl border border-orange-200 hover:bg-orange-100"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                          <span className="font-medium">LeetCode</span>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                                            <div className="flex items-center space-x-3">
                                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    <Play className="h-4 w-4" />
                                    <span className="font-medium">Start</span>
                                  </button>
                                  <button className="p-2 bg-white/60 text-slate-600 rounded-xl hover:bg-white/80 transition-all duration-200 border border-white/50">
                                    <Star className="h-4 w-4" />
                                  </button>
                                  <button className="p-2 bg-white/60 text-slate-600 rounded-xl hover:bg-white/80 transition-all duration-200 border border-white/50">
                                    <Bookmark className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;