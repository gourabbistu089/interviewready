import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, HelpCircle, TrendingUp, Users, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import QuickActions from '../components/Dashboard/QuickActions';

const Dashboard = () => {
  const { topics, subtopics, questions } = useApp();
  console.log("Topics:", topics);
  console.log("Subtopics:", subtopics);
  console.log("Questions:", questions);

  const stats = [
    {
      title: 'Total Topics',
      value: topics.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Total Subtopics',
      value: subtopics.length,
      icon: FileText,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Total Questions',
      value: questions.length,
      icon: HelpCircle,
      color: 'bg-yellow-500',
      trend: '+15%'
    },
    {
      title: 'Active Users',
      value: 1247,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+5%'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your educational content.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <QuickActions />
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RecentActivity />
        </motion.div>
      </div>

      {/* Content Distribution Chart */}
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Content Distribution</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Frontend', 'Backend', 'Data Science'].map((category, index) => (
              <div key={category} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{category}</span>
                  <span className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.floor(Math.random() * 70) + 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;