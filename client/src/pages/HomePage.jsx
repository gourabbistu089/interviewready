

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
      name: 'Suraj',
      role: 'Java Developer',
      content: 'InterviewReady transformed my preparation strategy. The mock interviews felt incredibly realistic and helped me land my dream job!',
      avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFgVxdZZEa5FA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726981250295?e=1765411200&v=beta&t=GZsWlTAMXP3J8qO_dNmyFndp2DxpOvjmVijCqxppyVs',
      rating: 5,
      company: 'EPAM'
    },
    {
      name: 'Aryan Tanwar',
      role: 'Software Engineer',
      content: 'The progress tracking and personalized recommendations kept me motivated throughout my 3-month preparation journey.',
      avatar: 'https://media.licdn.com/dms/image/v2/C5603AQHbvOHZE73WIA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1650973625475?e=1765411200&v=beta&t=L7Ta2CTS1xSh6AyloOATNHlgIhiRNLOM7nC8_De5Joc',
      rating: 5,
      company: 'Tummie'
    },
    {
      name: 'Shubham Jatav',
      role: 'Software Developer',
      content: 'Comprehensive question bank with excellent explanations. The blog section provided invaluable industry insights.',
      avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQEOYa6iEjj6cg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693025423606?e=1765411200&v=beta&t=yqxaOTIYzP9tc962U4lwCZTOY1ns5d5tEdrALlSvvFU',
      rating: 5,
      company: 'Software Engineer at Itellect Design Areana'
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
