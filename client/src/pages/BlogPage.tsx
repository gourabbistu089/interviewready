import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  BookOpen,
  TrendingUp,
  Star,
  Eye,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', count: 245 },
    { id: 'interview-tips', name: 'Interview Tips', count: 68 },
    { id: 'technical', name: 'Technical', count: 89 },
    { id: 'career', name: 'Career Advice', count: 45 },
    { id: 'industry', name: 'Industry Insights', count: 43 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'The Complete Guide to System Design Interviews in 2024',
      excerpt: 'Master system design interviews with this comprehensive guide covering scalability, databases, and real-world examples.',
      author: 'Sarah Chen',
      authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-15',
      readTime: '12 min read',
      category: 'technical',
      tags: ['System Design', 'Scalability', 'Architecture'],
      views: 15420,
      likes: 892,
      comments: 156,
      featured: true,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'How to Negotiate Your Salary: A Data-Driven Approach',
      excerpt: 'Learn proven strategies to negotiate better compensation packages using market data and psychological techniques.',
      author: 'Michael Rodriguez',
      authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-12',
      readTime: '8 min read',
      category: 'career',
      tags: ['Salary', 'Negotiation', 'Career Growth'],
      views: 12350,
      likes: 743,
      comments: 89,
      featured: true,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const articles = [
    {
      id: 3,
      title: 'React Interview Questions: From Basics to Advanced',
      excerpt: 'Comprehensive collection of React interview questions with detailed explanations and code examples.',
      author: 'Emily Davis',
      authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-10',
      readTime: '15 min read',
      category: 'technical',
      tags: ['React', 'JavaScript', 'Frontend'],
      views: 8920,
      likes: 567,
      comments: 78,
      featured: false
    },
    {
      id: 4,
      title: 'Body Language Tips for Virtual Interviews',
      excerpt: 'Master the art of non-verbal communication in remote interviews to make a lasting impression.',
      author: 'David Kim',
      authorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-08',
      readTime: '6 min read',
      category: 'interview-tips',
      tags: ['Virtual Interviews', 'Body Language', 'Communication'],
      views: 6780,
      likes: 423,
      comments: 45,
      featured: false
    },
    {
      id: 5,
      title: 'Database Design Patterns Every Developer Should Know',
      excerpt: 'Explore essential database design patterns and when to use them in your applications.',
      author: 'Lisa Wang',
      authorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-05',
      readTime: '10 min read',
      category: 'technical',
      tags: ['Database', 'Design Patterns', 'Backend'],
      views: 5640,
      likes: 334,
      comments: 67,
      featured: false
    },
    {
      id: 6,
      title: 'The Rise of AI in Tech Interviews: What to Expect',
      excerpt: 'How artificial intelligence is changing the interview landscape and what candidates need to know.',
      author: 'Alex Thompson',
      authorAvatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-03',
      readTime: '7 min read',
      category: 'industry',
      tags: ['AI', 'Future of Work', 'Technology Trends'],
      views: 4520,
      likes: 289,
      comments: 34,
      featured: false
    },
    {
      id: 7,
      title: 'Building a Strong Technical Portfolio',
      excerpt: 'Step-by-step guide to creating a portfolio that showcases your skills and attracts employers.',
      author: 'Rachel Green',
      authorAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-01',
      readTime: '9 min read',
      category: 'career',
      tags: ['Portfolio', 'Career Development', 'Projects'],
      views: 7890,
      likes: 456,
      comments: 92,
      featured: false
    }
  ];

  const allArticles = [...featuredArticles, ...articles];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-700';
      case 'interview-tips': return 'bg-green-100 text-green-700';
      case 'career': return 'bg-purple-100 text-purple-700';
      case 'industry': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Insights Blog</h1>
          <p className="text-xl text-gray-600">
            Expert advice, industry insights, and career guidance from top professionals
          </p>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-500" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden group">
                    <div className="relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={article.authorAvatar} 
                            alt={article.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{article.author}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-indigo-500" />
              {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
            </h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{filteredArticles.length} articles found</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.filter(article => !article.featured || selectedCategory !== 'all').map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                          +{article.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={article.authorAvatar} 
                          alt={article.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{article.comments}</span>
                        </div>
                      </div>
                      <Button size="small" variant="ghost">
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or browse different categories.
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;