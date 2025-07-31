import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Brain,
  ArrowRight,
  Clock,
  Target,
  Sparkles,
  Play,
  CheckCircle2,
  Trophy,
  Zap,
  Star,
  Users,
  Award,
} from "lucide-react";

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "frontend",
      name: "Frontend Developer",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      description: "React, TypeScript, Modern CSS",
      challenge: "Build beautiful, responsive user interfaces",
      difficulty: "Intermediate",
      difficultyColor: "bg-amber-100 text-amber-800 border-amber-300",
      topics: ["React Hooks", "State Management", "CSS Grid", "Performance"],
      duration: "20",
      questions: 5,
      popularity: 95,
      students: "12.3k",
    },
    {
      id: "backend",
      name: "Backend Developer",
      icon: Database,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      description: "Node.js, APIs, System Design",
      challenge: "Design scalable server architectures",
      difficulty: "Advanced",
      difficultyColor: "bg-red-100 text-red-800 border-red-300",
      topics: [
        "RESTful APIs",
        "Database Design",
        "Authentication",
        "Microservices",
      ],
      duration: "25",
      questions: 6,
      popularity: 88,
      students: "8.7k",
    },
    {
      id: "fullstack",
      name: "Full Stack Developer",
      icon: Layers,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      description: "End-to-end Development",
      challenge: "Master the complete development stack",
      difficulty: "Expert",
      difficultyColor: "bg-rose-100 text-rose-800 border-rose-300",
      topics: ["System Architecture", "DevOps", "Testing", "Performance"],
      duration: "30",
      questions: 8,
      popularity: 92,
      students: "15.1k",
    },
    {
      id: "dsa",
      name: "Data Structures & Algorithms",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      description: "Problem Solving Excellence",
      challenge: "Master algorithmic thinking & coding interviews",
      difficulty: "Expert",
      difficultyColor: "bg-rose-100 text-rose-800 border-rose-300",
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs"],
      duration: "35",
      questions: 4,
      popularity: 97,
      students: "20.5k",
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setTimeout(() => onRoleSelect(roleId), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          {/* <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-sm border border-gray-200/50"
            >
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-gray-700 font-medium text-sm">
                AI-Powered Interview Practice
              </span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight"
            >
              Choose Your 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Interview Track
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Practice with AI-powered questions and get personalized feedback
              to ace your next interview
            </motion.p>
          </div> */}
          <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                  >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Mock Interviews</h1>
                    <p className="text-xl text-gray-600">
                      Practice with realistic interview scenarios and get instant feedback
                    </p>
                  </motion.div>

          {/* Stats Bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div className="flex items-center gap-8 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-200/50">
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">50k+</span>
                <span className="text-sm">Students</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="h-5 w-5 text-emerald-500" />
                <span className="font-semibold">95%</span>
                <span className="text-sm">Success Rate</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-700">
                <Target className="h-5 w-5 text-purple-500" />
                <span className="font-semibold">1M+</span>
                <span className="text-sm">Questions</span>
              </div>
            </div>
          </motion.div> */}

          {/* Role Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="relative">
                  {/* Card */}
                  <motion.div
                    className={`
                      relative bg-white/80 backdrop-blur-sm rounded-3xl border-2 ${
                        role.borderColor
                      } p-8  
                      transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl
                      ${
                        selectedRole === role.id
                          ? "ring-4 ring-blue-500/30 border-blue-400"
                          : ""
                      }
                    `}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background Pattern */}
                    <div
                      className={`absolute inset-0 ${role.bgColor} opacity-40 rounded-3xl transition-opacity duration-300 `}
                    />

                    {/* Floating Icon Background */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <role.icon className="h-24 w-24 text-gray-400" />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`
                              relative p-4 rounded-2xl bg-gradient-to-r ${role.color} shadow-lg
                            `}
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <role.icon className="h-8 w-8 text-white" />
                          </motion.div>
                          <div>
                            <h3
                              className={`text-2xl font-bold ${role.textColor} mb-1`}
                            >
                              {role.name}
                            </h3>
                            <p className="text-gray-600 font-medium">
                              {role.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${role.difficultyColor}`}
                          >
                            {role.difficulty}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold text-gray-700">
                              {role.popularity}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Challenge */}
                      <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6">
                        {role.challenge}
                      </p>

                      {/* Topics */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {role.topics.map((topic, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + idx * 0.05 }}
                              className="px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:shadow-md hover:bg-white transition-all"
                            >
                              {topic}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Target className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {role.questions} Questions
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {role.duration} mins
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {role.students}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          className={`flex items-center gap-2 font-semibold ${role.textColor}/90 bg-gradient-to-br ${role.color} px-3 py-2 rounded-lg shadow-2xl cursor-pointer`}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleRoleSelect(role.id)}
                        >
                          <Play className="h-4 w-4" />
                          <span className="text-sm">Start Practice</span>
                          {/* <ArrowRight className="h-4 w-4" /> */}
                        </motion.div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {selectedRole === role.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="bg-white text-emerald-600 p-4 rounded-full shadow-xl"
                          >
                            <CheckCircle2 className="h-8 w-8" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-6 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-200/50">
              <div className="flex items-center gap-2 text-gray-700">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-medium">AI-Powered</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-700">
                <Target className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Real-time Feedback</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-700">
                <Trophy className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Personalized Coaching</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
