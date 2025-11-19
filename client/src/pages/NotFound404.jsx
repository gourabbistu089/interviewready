import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  const [pageType, setPageType] = useState('notfound');
  
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('construction') || path.includes('coming-soon') || path.includes('maintenance')) {
      setPageType('construction');
    }
  }, []);

  const content = {
    notfound: {
      image: '/404_not_found.png',
      title: 'Page Not Found',
      subtitle: 'Oops! You seem to have taken a wrong turn',
      description: "The page you're looking for doesn't exist or has been moved to another universe.",
      accent: 'from-violet-500 to-purple-600',
      lightAccent: 'from-violet-400 to-purple-500',
    },
    construction: {
      image: '/404_page_under_construction.png',
      title: 'Under Construction',
      subtitle: 'Something amazing is being built!',
      description: 'Our team is crafting an incredible experience just for you. Check back soon!',
      accent: 'from-amber-500 to-orange-600',
      lightAccent: 'from-amber-400 to-orange-500',
    }
  };

  const current = content[pageType];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated light orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/40 to-cyan-300/40 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-violet-300/30 to-purple-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 6)}%`,
            top: `${15 + (i * 5)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i * 0.3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" fill="currentColor" />
        </motion.div>
      ))}

      <motion.div
        className="max-w-7xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Image section - Side by side on desktop */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-full lg:w-[45%] max-w-xl"
          >
            <div className={`absolute -inset-1 bg-gradient-to-r ${current.lightAccent} opacity-30 blur-2xl rounded-3xl`} />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full aspect-video bg-gradient-to-br ${current.accent} flex items-center justify-center rounded-3xl">
                      <div class="text-white text-8xl font-black">${pageType === 'notfound' ? '404' : '🚧'}</div>
                    </div>
                  `;
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent`} />
            </div>
          </motion.div>

          {/* Text content - Side by side on desktop */}
          <motion.div
            variants={itemVariants}
            className="relative w-full lg:w-1/2 max-w-xl"
          >
            {/* Content card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 lg:p-10 lg:min-h-[450px]">
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-3 text-center lg:text-left">
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${current.accent} bg-clip-text text-transparent`}>
                    {current.title}
                  </h1>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    {current.subtitle}
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {current.description}
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                >
                  <motion.button
                    onClick={() => window.location.href = '/'}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative px-6 py-3 bg-gradient-to-r ${current.accent} text-white rounded-xl font-bold text-base overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <Home className="w-5 h-5" />
                      Back to Home
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => window.history.back()}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white text-gray-800 rounded-xl font-bold text-base border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ArrowLeft className="w-5 h-5" />
                      Go Back
                    </span>
                  </motion.button>
                </motion.div>

                {/* Error badge */}
                {pageType === 'notfound' && (
                  <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${current.lightAccent} text-white rounded-full font-semibold text-sm shadow-lg`}>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Error Code: 404
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative text */}
       
      </motion.div>

      {/* Decorative floating shapes */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 border-4 border-purple-400/30 rounded-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-16 h-16 border-4 border-blue-400/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}