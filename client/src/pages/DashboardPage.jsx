import React from "react";
import {
  Target,
  BookOpen,
  Brain,
  TrendingUp,
  Calendar,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Trophy,
  Star,
  Activity,
  FileText,
  PlayCircle,
  User,
  BarChart3,
  Code,
  Users,
  Lightbulb,
  Mic,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  // const user = dummyUser;
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      title: "Questions Solved",
      value: user?.stats?.questionsCompleted,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      gradient: "from-emerald-500 to-green-500",
      description: "Coding problems solved",
    },
    {
      title: "Modules Completed",
      value: user?.stats?.modulesCompleted,
      icon: Award,
      color: "text-orange-600",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-100",
      description: "Learning modules finished",
    },
    {
      title: "Mock Interviews",
      value: user?.stats?.mockInterviews,
      icon: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradient: "from-blue-500 to-indigo-500",
      description: "Practice sessions completed",
    },
    
    {
      title: "Blogs Written",
      value: user?.stats?.blogsWritten,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradient: "from-purple-500 to-pink-500",
      description: "Articles published",
    },
  ];

  const recentActivity = [
    {
      type: "question",
      title: user?.activity?.latestQuestion?.title,
      topic: user?.activity?.latestQuestion?.tags[0],
      status: "completed",
      difficulty: user?.activity?.latestQuestion?.difficulty,
      icon: Code,
    },
       {
      type: "module",
      title: user?.activity?.latestSubtopic?.title,
      topic: user?.activity?.latestSubtopic?.tags[0],
      time: "2 days ago",
      status: "completed",
      difficulty: user?.activity?.latestSubtopic?.difficulty,
      score: null,
      icon: PlayCircle,
    },
    {
      type: "mock",
      title: "Mock Interview",
      topic: user?.activity?.latestInterviewSession?.role,
      time: user?.activity?.latestInterviewSession?.endTime,
      status: "completed",
      difficulty: "medium",
      // score: 88,
      icon: Users,
    },

    {
      type: "blog",
      title: user?.activity?.latestBlog?.title,
      topic: user?.activity?.latestBlog?.category,
      status: "published",
      difficulty: "intermediate",
      icon: FileText,
    },
  ];

  const quickActions = [
    {
      title: "Practice Questions",
      description: "Solve curated coding problems",
      icon: Code,
      href: "/questions",
      gradient: "from-blue-500 to-indigo-600",
      stats: "2,500+ questions",
      color: "blue",
    },
    {
      title: "Mock Interview",
      description: "AI-powered interview practice",
      icon: Brain,
      href: "/mock-interview",
      gradient: "from-purple-500 to-pink-600",
      stats: "Real-time feedback",
      color: "purple",
    },
    {
      title: "Write Blog",
      description: "Share your knowledge",
      icon: FileText,
      href: "/create-blog",
      gradient: "from-emerald-500 to-green-600",
      stats: "Build your portfolio",
      color: "emerald",
    },
    {
      title: "Learning Modules",
      description: "Structured learning paths",
      icon: PlayCircle,
      href: "/modules",
      gradient: "from-orange-500 to-red-600",
      stats: "50+ modules",
      color: "orange",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "published":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
      case "beginner":
        return "bg-green-100 text-green-700";
      case "medium":
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  console.log("Recent Activity:", recentActivity);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Welcome back, {user?.fullName}! 👋
              </h1>
              <p className="text-gray-600 mt-3 text-xl">
                Ready to continue your coding journey and share your knowledge?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Member since
                    </p>
                    <p className="font-bold text-gray-900 text-lg">
                      {new Date(user?.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {stat.title}
                      </p>
                      <p className="text-4xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        {stat.description}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-8">
          {/* Enhanced Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-2"
          >
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-yellow-500" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => (window.location.href = action.href)}
                      className="block group w-full text-left"
                    >
                      <div className="p-5 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <div className="flex items-center mb-3">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} mr-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {action.description}
                        </p>
                        <p className="text-xs text-indigo-600 font-semibold">
                          {action.stats}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-3"
          >
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-blue-500" />
                  Recent Activity
                </h2>
                {/* <Link
                  to="/activity"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-semibold hover:underline"
                >
                  View all →
                </Link> */}
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto overflow-x-hidden 
               [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:bg-[#dcdcdc6d] 
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-track]:bg-gray-200 
              ">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    (activity.title || activity.topic) &&
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-102"
                    >
                      <div className="flex items-center flex-1">
                        <Icon className="h-5 w-5 text-gray-500 mr-4" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {activity.topic} 
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                                activity.difficulty
                              )}`}
                            >
                              {activity.difficulty}
                            </span>
                            {activity.score && (
                              <span className="text-xs text-gray-500 font-medium">
                                Score: {activity.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Static Tips Section - Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mt-16 px-6 py-10 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              🚀 Get the Most Out of InterviewReady
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <Lightbulb className="text-yellow-500 w-7 h-7 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-1">
                  Smart Learning Paths
                </h4>
                <p className="text-sm text-gray-600">
                  Follow structured roadmaps tailored for DSA, System Design,
                  and Core CS subjects.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <Rocket className="text-purple-500 w-7 h-7 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-1">
                  Daily Practice Booster
                </h4>
                <p className="text-sm text-gray-600">
                  Strengthen your skills with daily curated problems and flash
                  quizzes.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <Mic className="text-red-500 w-7 h-7 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-1">
                  Mock Interview Arena
                </h4>
                <p className="text-sm text-gray-600">
                  Practice with AI-powered or peer mock interviews and get
                  actionable feedback.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <footer className="mt-8 py-8 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700">InterviewReady</span>.
          Designed with passion to empower future engineers.
        </p>
      </footer>
    </div>
  );
};

export default DashboardPage;
