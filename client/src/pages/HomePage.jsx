

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Target, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowRight,
  Check,
  Zap,
  Shield,
  Clock,
  Star,
  Sparkles,
  Globe,
  Lightbulb,
  Rocket
} from 'lucide-react';
import Footer from '../components/layout/Footer';

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 4 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-8, 8, -8] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Particle Component for Light Theme
const LightParticle = ({ index }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [-30, -120],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: Math.random() * 4 + 3,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
);

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    // window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Practice',
      description: 'Smart question recommendations tailored to your skill level and target role.',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      hoverColor: 'hover:border-amber-300'
    },
    {
      icon: Target,
      title: 'Mock Interviews',
      description: 'Realistic interview simulations with timer and comprehensive feedback.',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300'
    },
    {
      icon: BookOpen,
      title: 'Curated Content',
      description: 'Expertly organized questions by technology, role, and difficulty level.',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:border-emerald-300'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Detailed insights and analytics to track your improvement journey.',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:border-purple-300'
    }
  ];

  const stats = [
    { label: 'Questions Available', value: '5,000+', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Active Users', value: '50,000+', icon: Users, color: 'text-emerald-600' },
    { label: 'Success Rate', value: '92%', icon: Award, color: 'text-purple-600' },
    { label: 'Companies Covered', value: '500+', icon: Target, color: 'text-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      content: 'InterviewReady transformed my preparation strategy. The mock interviews felt incredibly realistic and helped me land my dream job!',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      company: 'Google'
    },
    {
      name: 'Mike Chen',
      role: 'Data Scientist at Microsoft',
      content: 'The progress tracking and personalized recommendations kept me motivated throughout my 3-month preparation journey.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      company: 'Microsoft'
    },
    {
      name: 'Emily Davis',
      role: 'Frontend Developer at Netflix',
      content: 'Comprehensive question bank with excellent explanations. The blog section provided invaluable industry insights.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      company: 'Netflix'
    }
  ];

  const benefits = [
    'Personalized learning paths',
    'Real-time performance analytics',
    'Industry-standard questions',
    'Expert-curated content',
    'Mobile-friendly platform',
    '24/7 access to resources'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"
            animate={{
              x: -mousePosition.x * 25,
              y: -mousePosition.y * 25,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <motion.div
            className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-pink-300/20 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 20,
              y: mousePosition.y * 20,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <LightParticle key={i} index={i} />
          ))}

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-full shadow-lg shadow-blue-100/50">
                <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-semibold">Trusted by 50,000+ professionals</span>
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text mb-8 leading-tight"
            >
              Master Your{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dream Interview
                </span>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.div>
              </span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Transform your career with our AI-powered interview preparation platform. 
              Practice with real questions, ace mock interviews, and land your dream job.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-12 py-5 rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
              >
                <Link to="/register" className="flex items-center relative z-10">
                  <Rocket className="mr-3 h-6 w-6" />
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-800 font-bold text-lg px-12 py-5 rounded-full shadow-xl shadow-gray-200/50 hover:shadow-gray-300/50 hover:bg-white transition-all duration-300"
              >
                <Link to="/questions" className="flex items-center">
                  <BookOpen className="mr-3 h-6 w-6 text-blue-600" />
                  Browse Questions
                </Link>
              </motion.button>
            </motion.div>

          
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-1/4 hidden lg:block">
          <FloatingElement delay={0} duration={5}>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-200/50">
              <Brain className="text-blue-600 text-3xl" />
            </div>
          </FloatingElement>
        </div>

        <div className="absolute top-1/3 right-1/4 hidden lg:block">
          <FloatingElement delay={1} duration={4}>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-emerald-100/50 border border-emerald-200/50">
              <Lightbulb className="text-emerald-600 text-3xl" />
            </div>
          </FloatingElement>
        </div>

        <div className="absolute bottom-1/4 left-1/3 hidden lg:block">
          <FloatingElement delay={2} duration={6}>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-purple-100/50 border border-purple-200/50">
              <Globe className="text-purple-600 text-3xl" />
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-gray-900 mb-6"
            >
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InterviewReady?
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Our platform combines cutting-edge technology with expert insights to give you the competitive edge
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className={`relative overflow-hidden bg-gradient-to-br ${feature.bgColor} border-2 ${feature.borderColor} ${feature.hoverColor} rounded-3xl p-8 h-full shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/30 transition-all duration-500`}>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl" />
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center text-white group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-black/20 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <Icon className="h-8 w-8 mx-auto mb-4 text-white/90 group-hover:text-white transition-colors" />
                    <div className="text-3xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-blue-100 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                Everything you need to{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  succeed
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-200/50">
                <div className="text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-lg shadow-emerald-200/50"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">92% Success Rate</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our users consistently outperform the market average in interview success rates.
                  </p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Rated 4.9/5 by 10,000+ users</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-gray-900 mb-6"
            >
              Success{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Stories
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Join thousands of professionals who transformed their careers with InterviewReady
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 h-full shadow-xl shadow-gray-200/50 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/30 transition-all duration-500 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover shadow-lg border-2 border-white"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-xs text-purple-600 font-semibold mt-1">{testimonial.company}</div>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
        <Footer />
    </div>
  );
};

export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { 
//   Brain, 
//   Target, 
//   BookOpen, 
//   Users, 
//   Award, 
//   TrendingUp, 
//   ArrowRight,
//   Check,
//   Zap,
//   Shield,
//   Clock,
//   Star,
//   Sparkles,
//   Globe,
//   Lightbulb,
//   Rocket,
//   PlayCircle,
//   ChevronDown,
//   MessageCircle,
//   BarChart3,
//   Briefcase,
//   Code,
//   Heart,
//   Verified,
//   Mail,
//   Phone,
//   MapPin
// } from 'lucide-react';

// // Enhanced Floating Animation Component
// const FloatingElement = ({ children, delay = 0, duration = 4, amplitude = 20 }) => (
//   <motion.div
//     initial={{ y: 0, rotate: 0 }}
//     animate={{ 
//       y: [-amplitude, amplitude, -amplitude],
//       rotate: [-2, 2, -2]
//     }}
//     transition={{
//       duration,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay,
//     }}
//   >
//     {children}
//   </motion.div>
// );

// // Enhanced Particle Component
// const EnhancedParticle = ({ index }) => {
//   const colors = [
//     'from-blue-400 to-purple-400',
//     'from-emerald-400 to-teal-400',
//     'from-pink-400 to-rose-400',
//     'from-orange-400 to-amber-400',
//     'from-indigo-400 to-violet-400'
//   ];
  
//   return (
//     <motion.div
//       className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${colors[index % colors.length]} opacity-60`}
//       style={{
//         left: `${Math.random() * 100}%`,
//         top: `${Math.random() * 100}%`,
//       }}
//       animate={{
//         y: [-50, -150],
//         x: [0, Math.random() * 40 - 20],
//         opacity: [0, 0.8, 0],
//         scale: [0.5, 1.2, 0.5],
//       }}
//       transition={{
//         duration: Math.random() * 6 + 4,
//         repeat: Infinity,
//         delay: Math.random() * 3,
//         ease: "easeOut"
//       }}
//     />
//   );
// };

// // Scroll Progress Indicator
// const ScrollProgress = () => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform-origin-0 z-50"
//       style={{ scaleX }}
//     />
//   );
// };

// // Enhanced Feature Card Component
// const FeatureCard = ({ feature, index }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const Icon = feature.icon;
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay: index * 0.1 }}
//       whileHover={{ y: -15, scale: 1.03 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="group relative"
//     >
//       <div className={`relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-700 ${feature.hoverColor}`}>
//         {/* Gradient Background */}
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
//           initial={{ scale: 0.8 }}
//           whileHover={{ scale: 1 }}
//         />
        
//         {/* Animated Border */}
//         <motion.div
//           className="absolute inset-0 rounded-3xl"
//           style={{
//             background: `conic-gradient(from 0deg, ${feature.color.replace('from-', '').replace('to-', ', ')})`,
//             padding: '2px',
//           }}
//           animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
//           transition={{ duration: 3, ease: "linear" }}
//         >
//           <div className="w-full h-full bg-white rounded-3xl" />
//         </motion.div>
        
//         {/* Icon with Enhanced Animation */}
//         <div className="relative z-10 mb-6">
//           <motion.div
//             className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:shadow-xl`}
//             whileHover={{ 
//               scale: 1.15, 
//               rotate: [0, -10, 10, -10, 0],
//               boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
//             }}
//             transition={{ duration: 0.6 }}
//           >
//             <Icon className="h-8 w-8 text-white" />
//           </motion.div>
//         </div>
        
//         {/* Content */}
//         <div className="relative z-10">
//           <motion.h3 
//             className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors"
//             whileHover={{ scale: 1.05 }}
//           >
//             {feature.title}
//           </motion.h3>
//           <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
//             {feature.description}
//           </p>
//         </div>

//         {/* Hover Effect Particles */}
//         {isHovered && (
//           <div className="absolute inset-0 pointer-events-none">
//             {[...Array(5)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   scale: [0, 1, 0],
//                   opacity: [0, 1, 0],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   delay: i * 0.2,
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// const HomePage = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const { scrollYProgress } = useScroll();
  
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: e.clientX / window.innerWidth,
//         y: e.clientY / window.innerHeight,
//       });
//     };

//     const handleScroll = () => setScrollY(window.scrollY);

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const features = [
//     {
//       icon: Zap,
//       title: 'AI-Powered Practice',
//       description: 'Advanced algorithms analyze your performance and recommend personalized practice questions tailored to your skill level.',
//       color: 'from-amber-400 to-orange-500',
//       bgColor: 'from-amber-50 to-orange-50',
//       borderColor: 'border-amber-200',
//       hoverColor: 'hover:border-amber-300'
//     },
//     {
//       icon: Target,
//       title: 'Mock Interviews',
//       description: 'Experience realistic interview scenarios with real-time feedback, timer management, and comprehensive performance analysis.',
//       color: 'from-blue-400 to-indigo-500',
//       bgColor: 'from-blue-50 to-indigo-50',
//       borderColor: 'border-blue-200',
//       hoverColor: 'hover:border-blue-300'
//     },
//     {
//       icon: BookOpen,
//       title: 'Curated Content',
//       description: 'Access thousands of expertly crafted questions organized by technology stack, role type, and difficulty level.',
//       color: 'from-emerald-400 to-teal-500',
//       bgColor: 'from-emerald-50 to-teal-50',
//       borderColor: 'border-emerald-200',
//       hoverColor: 'hover:border-emerald-300'
//     },
//     {
//       icon: BarChart3,
//       title: 'Progress Analytics',
//       description: 'Deep insights into your learning journey with detailed analytics, performance trends, and improvement recommendations.',
//       color: 'from-purple-400 to-pink-500',
//       bgColor: 'from-purple-50 to-pink-50',
//       borderColor: 'border-purple-200',
//       hoverColor: 'hover:border-purple-300'
//     }
//   ];

//   const stats = [
//     { label: 'Questions Available', value: '5,000+', icon: BookOpen, color: 'text-blue-600', description: 'Expertly curated' },
//     { label: 'Active Users', value: '50,000+', icon: Users, color: 'text-emerald-600', description: 'Worldwide community' },
//     { label: 'Success Rate', value: '92%', icon: Award, color: 'text-purple-600', description: 'Interview success' },
//     { label: 'Companies Covered', value: '500+', icon: Briefcase, color: 'text-orange-600', description: 'Top employers' }
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Software Engineer',
//       company: 'Google',
//       content: 'InterviewReady completely transformed my interview preparation. The AI-powered recommendations were spot-on, and the mock interviews felt incredibly realistic. I landed my dream job within 6 weeks!',
//       avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
//       rating: 5,
//       verified: true
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Data Scientist',
//       company: 'Microsoft',
//       content: 'The progress tracking and detailed analytics kept me motivated throughout my preparation. The personalized learning path helped me focus on my weak areas effectively.',
//       avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
//       rating: 5,
//       verified: true
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Frontend Developer',
//       company: 'Netflix',
//       content: 'Outstanding platform with comprehensive question bank and excellent explanations. The blog section provided invaluable industry insights that gave me a competitive edge.',
//       avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
//       rating: 5,
//       verified: true
//     }
//   ];

//   const benefits = [
//     { text: 'Personalized AI-powered learning paths', icon: Brain },
//     { text: 'Real-time performance analytics', icon: TrendingUp },
//     { text: 'Industry-standard questions from FAANG', icon: Target },
//     { text: 'Expert-curated content library', icon: BookOpen },
//     { text: 'Mobile-responsive design', icon: Globe },
//     { text: '24/7 unlimited access', icon: Clock }
//   ];

//   const companies = [
//     { name: 'Google', logo: '🔍' },
//     { name: 'Microsoft', logo: '🪟' },
//     { name: 'Amazon', logo: '📦' },
//     { name: 'Apple', logo: '🍎' },
//     { name: 'Meta', logo: '👥' },
//     { name: 'Netflix', logo: '📺' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
//       <ScrollProgress />
      
//       {/* Hero Section */}
//       <motion.section 
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//         style={{ opacity: heroOpacity, scale: heroScale }}
//       >
//         {/* Enhanced Background Elements */}
//         <div className="absolute inset-0">
//           {/* Dynamic Gradient Orbs */}
//           <motion.div
//             className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
//             animate={{
//               x: mousePosition.x * 50,
//               y: mousePosition.y * 50,
//               scale: [1, 1.2, 1],
//             }}
//             transition={{ 
//               type: "spring", 
//               stiffness: 50, 
//               damping: 20,
//               scale: { duration: 4, repeat: Infinity }
//             }}
//           />
//           <motion.div
//             className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl"
//             animate={{
//               x: -mousePosition.x * 30,
//               y: -mousePosition.y * 30,
//               scale: [1, 1.1, 1],
//             }}
//             transition={{ 
//               type: "spring", 
//               stiffness: 50, 
//               damping: 20,
//               scale: { duration: 3, repeat: Infinity }
//             }}
//           />
//           <motion.div
//             className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-full blur-3xl"
//             animate={{
//               x: mousePosition.x * 40,
//               y: mousePosition.y * 40,
//               scale: [1, 1.3, 1],
//             }}
//             transition={{ 
//               type: "spring", 
//               stiffness: 50, 
//               damping: 20,
//               scale: { duration: 5, repeat: Infinity }
//             }}
//           />

//           {/* Enhanced Floating Particles */}
//           {[...Array(20)].map((_, i) => (
//             <EnhancedParticle key={i} index={i} />
//           ))}

//           {/* Animated Grid Pattern */}
//           <motion.div
//             className="absolute inset-0 opacity-20"
//             animate={{ 
//               backgroundPosition: [`0px 0px`, `60px 60px`],
//             }}
//             transition={{ 
//               duration: 10, 
//               repeat: Infinity, 
//               ease: "linear" 
//             }}
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
//               `,
//               backgroundSize: "60px 60px",
//             }}
//           />
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center">
//             {/* Enhanced Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="mb-8"
//             >
//               <motion.div 
//                 className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-full shadow-xl shadow-blue-100/50 hover:shadow-2xl transition-all duration-300"
//                 whileHover={{ scale: 1.05, y: -2 }}
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                 >
//                   <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
//                 </motion.div>
//                 <span className="text-blue-700 font-semibold">Trusted by 50,000+ professionals worldwide</span>
//                 <Verified className="h-4 w-4 text-green-500 ml-2" />
//               </motion.div>
//             </motion.div>
            
//             {/* Enhanced Main Heading */}
//             <motion.h1 
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.1 }}
//               className="text-6xl md:text-8xl font-black mb-8 leading-tight"
//             >
//               <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text">
//                 Master Your
//               </span>
//               <br />
//               <span className="relative inline-block">
//                 <motion.span 
//                   className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
//                   animate={{ 
//                     backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
//                   }}
//                   transition={{ 
//                     duration: 3, 
//                     repeat: Infinity,
//                     ease: "linear"
//                   }}
//                   style={{ backgroundSize: '200% 200%' }}
//                 >
//                   Dream Interview
//                 </motion.span>
//                 <motion.div
//                   className="absolute -top-4 -right-4"
//                   animate={{ 
//                     rotate: [0, 360],
//                     scale: [1, 1.2, 1]
//                   }}
//                   transition={{ 
//                     rotate: { duration: 10, repeat: Infinity, ease: "linear" },
//                     scale: { duration: 2, repeat: Infinity }
//                   }}
//                 >
//                   <Sparkles className="h-8 w-8 text-yellow-400" />
//                 </motion.div>
//               </span>
//             </motion.h1>
            
//             {/* Enhanced Subheading */}
//             <motion.p 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
//             >
//               Transform your career with our{' '}
//               <span className="font-bold text-blue-600">AI-powered</span> interview preparation platform. 
//               Practice with real questions, ace mock interviews, and land your dream job at{' '}
//               <span className="font-bold text-purple-600">top companies</span>.
//             </motion.p>
            
//             {/* Enhanced CTA Buttons */}
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-12 py-6 rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300"
//               >
//                 <span className="flex items-center relative z-10">
//                   <Rocket className="mr-3 h-6 w-6" />
//                   Start Free Trial
//                   <motion.div
//                     className="ml-3"
//                     animate={{ x: [0, 5, 0] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   >
//                     <ArrowRight className="h-6 w-6" />
//                   </motion.div>
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "0%" }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-gray-800 font-bold text-lg px-12 py-6 rounded-full shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:bg-white hover:border-gray-300 transition-all duration-300"
//               >
//                 <span className="flex items-center">
//                   <PlayCircle className="mr-3 h-6 w-6 text-blue-600" />
//                   Watch Demo
//                 </span>
//               </motion.button>
//             </motion.div>

//             {/* Company Logos */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="mb-8"
//             >
//               <p className="text-sm text-gray-600 mb-4">Trusted by professionals at</p>
//               <div className="flex justify-center items-center space-x-8 opacity-70">
//                 {companies.map((company, index) => (
//                   <motion.div
//                     key={company.name}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.1 }}
//                     className="text-2xl"
//                   >
//                     {company.logo}
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Demo Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-6 py-3 inline-block shadow-lg border border-gray-200/50"
//             >
//               <p>Demo accounts: user@demo.com | admin@demo.com (any password)</p>
//             </motion.div>
//           </div>
//         </div>

//         {/* Enhanced Floating Elements */}
//         <div className="absolute top-20 left-1/4 hidden lg:block">
//           <FloatingElement delay={0} duration={6} amplitude={25}>
//             <motion.div 
//               className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-blue-200/50 border border-blue-200/50"
//               whileHover={{ scale: 1.1, rotate: 5 }}
//             >
//               <Brain className="text-blue-600 text-4xl" />
//             </motion.div>
//           </FloatingElement>
//         </div>

//         <div className="absolute top-1/3 right-1/4 hidden lg:block">
//           <FloatingElement delay={1} duration={5} amplitude={20}>
//             <motion.div 
//               className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-emerald-200/50 border border-emerald-200/50"
//               whileHover={{ scale: 1.1, rotate: -5 }}
//             >
//               <Code className="text-emerald-600 text-4xl" />
//             </motion.div>
//           </FloatingElement>
//         </div>

//         <div className="absolute bottom-1/4 left-1/3 hidden lg:block">
//           <FloatingElement delay={2} duration={7} amplitude={30}>
//             <motion.div 
//               className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-purple-200/50 border border-purple-200/50"
//               whileHover={{ scale: 1.1, rotate: 10 }}
//             >
//               <Target className="text-purple-600 text-4xl" />
//             </motion.div>
//           </FloatingElement>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <div className="flex flex-col items-center text-gray-600">
//             <span className="text-sm mb-2">Scroll to explore</span>
//             <ChevronDown className="h-6 w-6" />
//           </div>
//         </motion.div>
//       </motion.section>

//       {/* Enhanced Features Section */}
//       <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30" />
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-20">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="mb-6"
//             >
//               <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
//                 FEATURES
//               </span>
//             </motion.div>
            
//             <motion.h2 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="text-5xl md:text-6xl font-black text-gray-900 mb-6"
//             >
//               Why Choose{' '}
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 InterviewReady?
//               </span>
//             </motion.h2>
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
//             >
//               Our platform combines cutting-edge technology with expert insights to give you the{' '}
//               <span className="font-semibold text-blue-600">competitive edge</span> you need
//             </motion.p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <FeatureCard key={index} feature={feature} index={index} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Stats Section */}
//       <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
//         {/* Animated Background Pattern */}
//         <div className="absolute inset-0 opacity-20">
//           <motion.div
//             className="w-full h-full"
//             animate={{
//               backgroundPosition: ['0% 0%', '100% 100%'],
//             }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             style={{
//               backgroundImage: `
//                 radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 2px, transparent 2px),
//                 radial-gradient(circle at 75% 75%, rgba(255,255,255,0.4) 2px, transparent 2px)
//               `,
//               backgroundSize: "80px 80px",
//             }}
//           />
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.8, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.1 }}
//                   className="text-center"
//                 >
//                   <motion.div
//                     className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
//                     whileHover={{ y: -5, scale: 1.05 }}
//                   >
//                     <Icon className="h-12 w-12 text-white mx-auto mb-4" />
//                     <motion.div
//                       className="text-4xl md:text-5xl font-black text-white mb-2"
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ duration: 1, delay: index * 0.1 }}
//                     >
//                       {stat.value}
//                     </motion.div>
//                     <p className="text-lg font-semibold text-white/90 mb-1">{stat.label}</p>
//                     <p className="text-sm text-white/70">{stat.description}</p>
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
//                 Everything You Need to{' '}
//                 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Succeed
//                 </span>
//               </h2>
//               <div className="space-y-6">
//                 {benefits.map((benefit, index) => {
//                   const Icon = benefit.icon;
//                   return (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.6, delay: index * 0.1 }}
//                       className="flex items-center space-x-4"
//                     >
//                       <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                         <Icon className="h-6 w-6 text-white" />
//                       </div>
//                       <p className="text-lg text-gray-700 font-medium">{benefit.text}</p>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-blue-100">
//                 <div className="space-y-6">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-4 h-4 bg-green-500 rounded-full"></div>
//                     <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
//                     <div className="w-4 h-4 bg-red-500 rounded-full"></div>
//                   </div>
//                   <div className="bg-white rounded-xl p-6 shadow-lg">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Mock Interview Progress</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Technical Skills</span>
//                         <span className="text-blue-600 font-semibold">92%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <motion.div
//                           className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
//                           initial={{ width: 0 }}
//                           whileInView={{ width: "92%" }}
//                           transition={{ duration: 1.5, delay: 0.5 }}
//                         />
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Communication</span>
//                         <span className="text-emerald-600 font-semibold">88%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <motion.div
//                           className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 rounded-full"
//                           initial={{ width: 0 }}
//                           whileInView={{ width: "88%" }}
//                           transition={{ duration: 1.5, delay: 0.7 }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
//             >
//               Success Stories from{' '}
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Our Users
//               </span>
//             </motion.h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Join thousands of professionals who've transformed their careers with InterviewReady
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//                 className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
//               >
//                 <div className="flex items-center mb-6">
//                   <img
//                     src={testimonial.avatar}
//                     alt={testimonial.name}
//                     className="w-16 h-16 rounded-full mr-4 object-cover"
//                   />
//                   <div>
//                     <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
//                     <p className="text-gray-600">{testimonial.role}</p>
//                     <div className="flex items-center mt-1">
//                       <span className="text-blue-600 font-semibold">{testimonial.company}</span>
//                       {testimonial.verified && (
//                         <Verified className="h-4 w-4 text-green-500 ml-1" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
                
//                 <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
//         <div className="absolute inset-0">
//           {[...Array(10)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 bg-white rounded-full opacity-30"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [-20, -40, -20],
//                 opacity: [0.3, 0.8, 0.3],
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: Math.random() * 3 + 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </div>
        
//         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-6xl font-black text-white mb-8"
//           >
//             Ready to Land Your{' '}
//             <span className="text-yellow-400">Dream Job?</span>
//           </motion.h2>
          
//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
//           >
//             Join thousands of professionals who've successfully transformed their careers with our platform
//           </motion.p>
          
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex flex-col sm:flex-row gap-6 justify-center"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-blue-600 font-bold text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
//             >
//               <span className="flex items-center">
//                 <Rocket className="mr-3 h-6 w-6" />
//                 Start Your Journey
//                 <ArrowRight className="ml-3 h-6 w-6" />
//               </span>
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-transparent border-2 border-white text-white font-bold text-lg px-12 py-6 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
//             >
//               <span className="flex items-center">
//                 <MessageCircle className="mr-3 h-6 w-6" />
//                 Contact Sales
//               </span>
//             </motion.button>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="mt-8 text-white/70 text-sm"
//           >
//             <p>No credit card required • 14-day free trial • Cancel anytime</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 InterviewReady
//               </h3>
//               <p className="text-gray-300 mb-6">
//                 Empowering professionals to achieve their career goals through AI-powered interview preparation.
//               </p>
//               <div className="flex space-x-4">
//                 <Heart className="h-6 w-6 text-red-500 fill-current" />
//                 <span className="text-gray-300">Made with love</span>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-gray-300">
//                 <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">API</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-300">
//                 <li><a href="#" className="hover:text-white transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Connect</h4>
//               <ul className="space-y-2 text-gray-300">
//                 <li className="flex items-center">
//                   <Mail className="h-4 w-4 mr-2" />
//                   <span>hello@interviewready.com</span>
//                 </li>
//                 <li className="flex items-center">
//                   <Phone className="h-4 w-4 mr-2" />
//                   <span>+1 (555) 123-4567</span>
//                 </li>
//                 <li className="flex items-center">
//                   <MapPin className="h-4 w-4 mr-2" />
//                   <span>San Francisco, CA</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 InterviewReady. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;