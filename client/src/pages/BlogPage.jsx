import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
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
  Bookmark,
  Loader2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlog } from "../redux/features/blogSlice";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/blogs?page=${page}&limit=9`);
      if (res.data.success) {
        const newArticles = res.data.blogs;
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newArticles.length > 0);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  console.log("has more", hasMore);

  // 👀 Set up the Intersection Observer to detect when to load more
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // ✅ If loader is in view and not already fetching
        if (entry.isIntersecting && !loading && hasMore) {
          fetchArticles();
        }
      },
      {
        threshold: 1.0, // Trigger only when the loader is fully visible
      }
    );

    if (loader.current) observer.observe(loader.current); // Start watching the loader div

    // 🧼 Cleanup observer on unmount
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [fetchArticles, loading, hasMore]);

  console.log("articles", articles);

  const categoryCounts = {};

  articles.forEach((article) => {
    const category = article.category;
    const id = category;

    if (categoryCounts[id]) {
      categoryCounts[id].count += 1;
    } else {
      categoryCounts[id] = {
        id: id,
        name: category,
        count: 1,
      };
    }
  });

  const categories = [
    { id: "all", name: "All Articles", count: articles.length },
    ...Object.values(categoryCounts),
  ];

  console.log(categories);
  console.log("selectedCategory", selectedCategory);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "Technology":
        return "bg-blue-100 text-blue-700";
      case "Interview Tips":
        return "bg-green-100 text-green-700";
      case "Programming":
        return "bg-purple-100 text-purple-700";
      case "Web Development":
        return "bg-orange-100 text-orange-700";
      case "Data Science":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const token = localStorage.getItem("token");
  console.log("tokein fuck you", token);
  const dispatch = useDispatch();
  const handleReadMore = async (article) => {
    dispatch(setBlog(article));
    navigate(`/blog/${article._id}`);
    // update views via api call
    const res = await axios.put(`${API_URL}/blogs/${article._id}/views`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("response in blog page", res);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Insights Blog
          </h1>
          <p className="text-xl text-gray-600">
            Expert advice, industry insights, and career guidance from top
            professionals
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* All Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-indigo-500" />
              {selectedCategory === "all"
                ? "Latest Articles"
                : `${
                    categories.find((c) => c.id === selectedCategory)?.name
                  } Articles`}
            </h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {filteredArticles.length} articles found
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles
              .filter(
                (article) => !article.featured || selectedCategory !== "all"
              )
              .map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full group">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            article?.category
                          )}`}
                        >
                          {
                            categories.find((c) => c.id === article.category)
                              ?.name
                          }
                        </span>
                        <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

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
                            src={article?.author?.profilePicture}
                            alt={article?.author?.fullName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {article.author?.fullName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime} min read</span>
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
                            <span>{article?.comments?.length}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleReadMore(article)}
                          size="small"
                          variant="ghost"
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* Improved Loader */}
          {hasMore && (
            <motion.div
              ref={loader}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center space-y-6"
                >
                  {/* Animated loader container */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>

                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-200 animate-ping"></div>
                    <div
                      className="absolute inset-0 rounded-full border-2 border-purple-200 animate-ping"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>

                  {/* Loading text with gradient */}
                  <div className="text-center">
                    <motion.h3
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      Loading more articles...
                    </motion.h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Discovering fresh content for you
                    </p>
                  </div>

                  {/* Animated dots */}
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-indigo-500 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center space-y-4 cursor-pointer group"
                  onClick={fetchArticles}
                >
                  <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:border-indigo-300 transition-all duration-300">
                    <ChevronDown className="h-8 w-8 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 animate-bounce" />
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                      Load more articles
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click or scroll to continue exploring
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* End of content message */}
          {/* {!hasMore && !loading && articles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  You've reached the end!
                </h3>
                <p className="text-gray-600 mb-4">
                  That's all the articles we have for now. Check back later for more content.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-indigo-600">
                  <BookOpen className="h-4 w-4" />
                  <span>Great job exploring our blog!</span>
                </div>
              </div>
            </motion.div>
          )} */}

          {!loading && filteredArticles.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or browse different
                categories.
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
