
import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, HelpCircle, ShieldQuestionIcon, TrendingUp, Users, Clock, Plus, Search, Filter, Calendar, Target, Award, Zap, BlocksIcon, ShieldQuestion } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../context/AppContext';
import { formatDate, topicStats } from '../utils/constant';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  // const [isLoading, setIsLoading] = useState(true);
  const { topics, subtopics, questions, loading } = useApp();
  console.log("Topics:", topics);
  // console.log("Subtopics:", subtopics);
  // console.log("Questions:", questions);
  useEffect(() => {
  }, []);

  const stats = [
    {
      title: 'Total Topics',
      value: topics.length,
      icon: BookOpen,
      gradient: 'from-blue-500 to-blue-600',
      description: 'Active learning topics'
    },
    {
      title: 'Total Subtopics',
      value: subtopics.length,
      icon: FileText,
      gradient: 'from-emerald-500 to-emerald-600',
      description: 'Detailed content areas'
    },
    {
      title: 'Total Questions',
      value: questions.length,
      icon: HelpCircle,
      gradient: 'from-amber-500 to-amber-600',
      description: 'Practice questions available'
    },
    {
      title: 'Active Users',
      value: 1247,
      icon: Users,
      gradient: 'from-purple-500 to-purple-600',
      trend: '+5%',
      description: 'Engaged learners this week'
    }
  ];

   const topic_stats = topicStats(topics).slice(0, 5);
  const subtopic_stats = topicStats(subtopics).slice(0, 5);
  const question_stats = topicStats(questions).slice(0, 5);

  const chartData_Array = [topic_stats, subtopic_stats, question_stats];
  console.log("chartData_Array ", chartData_Array);

  const categoryData = [
    { name: 'Frontend', value: 35, color: '#3B82F6', questions: 312 },
    { name: 'Backend', value: 28, color: '#10B981', questions: 245 },
    { name: 'Data Science', value: 22, color: '#F59E0B', questions: 198 },
    { name: 'DevOps', value: 15, color: '#8B5CF6', questions: 137 }
  ];

  const recentActivities = [
    { type: 'topic', title: topics[0]?.title, time: formatDate(topics[0]?.createdAt), status: topics[0]?.difficulty},
     { type: 'subtopic', title: subtopics[0]?.title, time: formatDate(subtopics[0]?.createdAt), status: subtopics[0]?.difficulty},
    { type: 'question', title: questions[0]?.title, time: formatDate(questions[0]?.createdAt), status: questions[0]?.difficulty },
    { type: 'user', title: 'New user registered', time: '6 hours ago', status: 'active' },
  ];

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const StatsCard = ({ title, value, icon: Icon, gradient , description }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            {loading ? <LoadingSkeleton /> : (
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</h3>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ icon: Icon, title, description, onClick, color = "blue" }) => (
    <button
      onClick={onClick}
      className={`group w-full text-left p-4 rounded-xl border border-gray-200 hover:border-${color}-200 bg-white hover:bg-${color}-50 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100 text-${color}-600 group-hover:bg-${color}-200 transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Welcome back! Here's your learning analytics overview
            </p>
          </div>
         
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-0">
           <CleanAreaChart rawData={chartData_Array}/>
            
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{category.value}%</div>
                    <div className="text-xs text-gray-500">{category.questions} questions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <QuickAction
                icon={Plus}
                title="Create Topic"
                description="Add a new learning topic"
                onClick={() => navigate('/topics')}
                color="blue"
              />
              <QuickAction
                icon={FileText}
                title="Add Subtopic"
                description="Define learning objectives"
                onClick={() => navigate('/subtopics')}
                color="purple"
              />
              <QuickAction
                icon={ShieldQuestion}
                title="Add Questions"
                description="Import practice questions"
                onClick={() => navigate('/questions')}
                color="green"
              />
              
              
              <QuickAction
                icon={Award}
                title="View Reports"
                description="Analyze learning progress"
                onClick={() => navigate('/')}
                color="amber"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Recent Activity
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'topic' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'question' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'topic' ? <BookOpen className="w-4 h-4" /> :
                     activity.type === 'question' ? <HelpCircle className="w-4 h-4" /> :
                     <BlocksIcon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'beginner' ? 'bg-green-100 text-green-800' :
                    activity.status === 'hard' ? 'bg-red-100 text-red-800' :
                    activity.status === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



const CleanAreaChart = ({rawData}) => {

  // Transform data for area chart
  const transformDataForComparison = () => {
    const dates = [...new Set(rawData.flat().map(item => item.date))].sort((a, b) => new Date(a) - new Date(b));
    
    return dates.map(date => {
      const dataPoint = { date };
      rawData.forEach((category, index) => {
        const categoryNames = ['Topic', 'Subtopic', 'Questions'];
        const item = category.find(item => item.date === date);
        dataPoint[categoryNames[index]] = item ? item.count : 0;
      });
      return dataPoint;
    });
  };

  const chartData = transformDataForComparison();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-700">
                {entry.dataKey}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    const icons = { 'Topic': '🔵', 'Subtopic': '🟢', 'Questions': '🟡' };
    return (
      <div className="flex justify-center items-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-lg">{icons[entry.value]}</span>
            <span className="text-sm font-medium text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Learning Progress</h2>
            <p className="text-gray-600">Activity tracking across topics, subtopics, and questions</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart 
                data={chartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <defs>
                  <linearGradient id="topicGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="subtopicGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="questionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.7} />
                <XAxis 
                  dataKey="date" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Area 
                  type="monotone" 
                  dataKey="Topic" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="url(#topicGradient)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="Subtopic" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="url(#subtopicGradient)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="Questions" 
                  stackId="1" 
                  stroke="#f59e0b" 
                  fill="url(#questionsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

