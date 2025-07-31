
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Clock,
  Calendar,
  User,
  Tag,
  Send,
  ThumbsUp,
  Bookmark,
  ArrowLeft,
  Coffee,
  Sparkles,
  TrendingUp,
  Star,
  BookOpen,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { API_URL } from "../constants";
import axios from "axios";

function Blog() {
  const currentUser = useSelector((state) => state.auth.user);
  const blog = useSelector((state) => state.blogs.blog);
  const [liked, setLiked] = useState(blog?.likes?.some((like) => like.user === currentUser?._id) || false);
  const [likeCount, setLikeCount] = useState(blog?.likes?.length || 0);
  const [comments, setComments] = useState(blog?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(false);



  const handleLike = async() => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
    try {
      const res = axios.post(`${API_URL}/blogs/${blog._id}/toggle-like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    } catch (error) {
      
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        _id: Date.now().toString(),
        author: currentUser,
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      setComments([...comments, comment]);
      setNewComment("");

      try {
        const res = axios.post(`${API_URL}/blogs/${blog._id}/add-comment`, {
          content: newComment,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const containers = document.querySelectorAll(".ql-code-block-container");

    containers.forEach((container) => {
      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className = "copy-btn";
      // Add click event listener
      button.addEventListener("click", () => {
        const codeLines = Array.from(
          container.querySelectorAll(".ql-code-block")
        ).map((div) => div.innerText);

        const code = codeLines.join("\n");

        if (code.trim()) {
          navigator.clipboard.writeText(code);
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 2000);
        }
      });

      // Ensure container is positioned for absolute button placement
      container.style.position = "relative";
      container.appendChild(button);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-blue-500/80 border-r-indigo-500/85 rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-rose-500/85 border-l-emerald-500/80 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
        </div>
        <div className="ml-6 hidden md:block">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Loading Article
          </h2>
          <p className="text-gray-600">Preparing your reading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-rose-400 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          {/* Category and Reading Stats */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 text-sm font-medium rounded-full border border-blue-200/50 backdrop-blur-sm shadow-lg flex items-center">
                <Sparkles className="w-4 h-4 inline mr-2" />
                {blog.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>{blog.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>
            </div>

            <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-blue-200/50 rounded-full backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-1">
                <Coffee className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-medium text-gray-700">
                  Perfect for coffee break
                </span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ textShadow: "0 0 40px rgba(0,0,0,0.1)" }}
            variants={itemVariants}
          >
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl"
            variants={itemVariants}
          >
            {blog.excerpt}
          </motion.p>

          {/* Author and Date */}
          <motion.div
            className="flex items-center justify-between mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={blog.author.profilePicture}
                    alt={blog.author.firstName}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">
                  {blog.author.firstName} {blog.author.lastName}
                </div>
                <div className="text-sm flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blog.publishedAt)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
            variants={itemVariants}
          >
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-80 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

            {/* Action Buttons on Image */}
            <div className="absolute top-6 right-6 flex gap-3">
              <motion.button
                onClick={handleBookmark}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    isBookmarked ? "text-blue-500 fill-current" : "text-white"
                  }`}
                />
              </motion.button>
              <motion.button
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Article Content */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="relative">
              <div
                className="prose prose-lg max-w-none text-gray-800 blog-content light-theme leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
              <Tag className="w-6 h-6 text-indigo-500" />
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => {
                const tagColors = [
                  "from-blue-500/20 to-indigo-500/10 border-blue-300/50 text-blue-700",
                  "from-rose-500/20 to-pink-500/10 border-rose-300/50 text-rose-700",
                  "from-emerald-500/20 to-green-500/10 border-emerald-300/50 text-emerald-700",
                  "from-amber-500/20 to-yellow-500/10 border-amber-300/50 text-amber-700",
                ];
                const colorClass = tagColors[index % tagColors.length];

                return (
                  <motion.span
                    key={index}
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colorClass} border rounded-full text-sm font-medium backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                    {tag}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Engagement Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-medium border ${
                    liked
                      ? "bg-gradient-to-r from-rose-500/20 to-pink-500/10 border-rose-300/50 text-rose-600"
                      : "bg-white/80 border-gray-200/50 text-gray-600 hover:text-rose-600 hover:border-rose-300/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                  <span>{likeCount}</span>
                </motion.button>

                <motion.button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 border border-gray-200/50 text-gray-600 hover:text-blue-600 hover:border-blue-300/50 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length}</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 border border-gray-200/50 text-gray-600 hover:text-indigo-600 hover:border-indigo-300/50 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              className="relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, height: 0, y: 30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                <MessageCircle className="w-7 h-7 text-blue-500" />
                Discussion ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative bg-white/80 border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={currentUser.profilePicture}
                        alt={currentUser.firstName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Join the conversation..."
                          className="w-full bg-transparent border-none outline-none resize-none text-base leading-relaxed text-gray-700 placeholder-gray-400"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200/50 bg-gradient-to-r from-transparent to-gray-50/50">
                    <span className="text-sm text-gray-500">
                      {newComment.length}/500
                    </span>
                    <motion.button
                      onClick={handleComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-blue-500/25"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-4 h-4" />
                      Post Comment
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                ) : (
                  comments
                    .slice(0, showMoreComments ? comments.length : 3)
                    .map((comment, index) => (
                      <motion.div
                        key={comment._id}
                        className="bg-white/80 border border-gray-200/30 rounded-2xl p-6 shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={comment.author.profilePicture}
                            alt={comment.author.firstName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="font-semibold text-gray-900">
                                {comment.author.firstName}{" "}
                                {comment.author.lastName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatTime(comment.createdAt)}
                              </span>
                            </div>

                            <p className="leading-relaxed mb-4 text-gray-700">
                              {comment.content}
                            </p>

                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{comment.likes}</span>
                              </button>
                              <button className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </div>

              {/* Load More Comments */}
              {comments.length > 3 && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={() => setShowMoreComments(!showMoreComments)}
                    className="flex items-center gap-2 mx-auto px-8 py-3 bg-white/80 border border-gray-200/50 text-gray-600 hover:text-blue-600 hover:border-blue-300/50 rounded-2xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showMoreComments ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Load More Comments ({comments.length - 3})
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Blog;
