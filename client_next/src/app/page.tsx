'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain, Target, BookOpen, Users, Award, TrendingUp, ArrowRight,
  Check, Zap, Clock, Star, Sparkles, Globe, Lightbulb, Rocket,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

const FloatingElement = ({ children, delay = 0, duration = 4 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ y: 0 }} animate={{ y: [-8, 8, -8] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    {children}
  </motion.div>
);

const features = [
  { icon: Zap,        title: 'AI-Powered Practice',  description: 'Smart question recommendations tailored to your skill level and target role.' },
  { icon: Target,     title: 'Mock Interviews',       description: 'Realistic interview simulations with timer and comprehensive feedback.' },
  { icon: BookOpen,   title: 'Curated Content',       description: 'Expertly organized questions by technology, role, and difficulty level.' },
  { icon: TrendingUp, title: 'Progress Analytics',    description: 'Detailed insights and analytics to track your improvement journey.' },
];

const stats = [
  { label: 'Questions Available', value: '5,000+',  icon: BookOpen },
  { label: 'Active Users',        value: '50,000+', icon: Users },
  { label: 'Success Rate',        value: '92%',     icon: Award },
  { label: 'Companies Covered',   value: '500+',    icon: Target },
];

const testimonials = [
  { name: 'Suraj',          role: 'Java Developer',     content: 'InterviewReady transformed my preparation strategy. The mock interviews felt incredibly realistic and helped me land my dream job!', avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFgVxdZZEa5FA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726981250295?e=1765411200&v=beta&t=GZsWlTAMXP3J8qO_dNmyFndp2DxpOvjmVijCqxppyVs', rating: 5, company: 'EPAM' },
  { name: 'Aryan Tanwar',   role: 'Software Engineer',  content: 'The progress tracking and personalized recommendations kept me motivated throughout my 3-month preparation journey.',              avatar: 'https://media.licdn.com/dms/image/v2/C5603AQHbvOHZE73WIA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1650973625475?e=1765411200&v=beta&t=L7Ta2CTS1xSh6AyloOATNHlgIhiRNLOM7nC8_De5Joc', rating: 5, company: 'Tummie' },
  { name: 'Shubham Jatav',  role: 'Software Developer', content: 'Comprehensive question bank with excellent explanations. The blog section provided invaluable industry insights.',                   avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQEOYa6iEjj6cg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693025423606?e=1765411200&v=beta&t=yqxaOTIYzP9tc962U4lwCZTOY1ns5d5tEdrALlSvvFU', rating: 5, company: 'Itellect Design Arena' },
];

const benefits = [
  'Personalized learning paths', 'Real-time performance analytics',
  'Industry-standard questions', 'Expert-curated content',
  'Mobile-friendly platform', '24/7 access to resources',
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm"
                style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)', color: 'var(--text-secondary)' }}
              >
                <Sparkles className="h-4 w-4 mr-2" style={{ color: 'var(--accent)' }} />
                Trusted by 50,000+ professionals
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
              style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}
            >
              Master Your{' '}
              <span style={{ color: 'var(--accent)' }}>Dream Interview</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Transform your career with our AI-powered interview preparation platform. Practice with real questions, ace mock interviews, and land your dream job.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-opacity duration-150 hover:opacity-90"
                  style={{ background: 'var(--accent)', color: '#080808' }}
                >
                  <Rocket className="h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/practice"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-colors duration-150"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '0.5px solid var(--border)' }}
                >
                  <BookOpen className="h-5 w-5" />
                  Browse Questions
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-20 left-1/4 hidden lg:block">
          <FloatingElement delay={0} duration={5}>
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
              <Brain className="h-6 w-6" style={{ color: 'var(--accent)' }} />
            </div>
          </FloatingElement>
        </div>
        <div className="absolute top-1/3 right-1/4 hidden lg:block">
          <FloatingElement delay={1} duration={4}>
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
              <Lightbulb className="h-6 w-6" style={{ color: 'var(--warning)' }} />
            </div>
          </FloatingElement>
        </div>
        <div className="absolute bottom-1/4 left-1/3 hidden lg:block">
          <FloatingElement delay={2} duration={6}>
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
              <Globe className="h-6 w-6" style={{ color: 'var(--text-secondary)' }} />
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: 'var(--bg-surface)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}
            >
              Why Choose InterviewReady?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Our platform combines cutting-edge technology with expert insights to give you the competitive edge
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl transition-colors duration-150"
                  style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
                >
                  <div className="mb-4 p-2 inline-flex rounded-lg" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                    <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: 'var(--bg-elevated)', borderBottom: '0.5px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="text-center p-6 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
                >
                  <Icon className="h-5 w-5 mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
                  <div className="text-3xl font-black mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-black mb-8" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
                Everything you need to succeed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                      <Check className="h-3 w-3" style={{ color: 'var(--accent)' }} />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="p-8 rounded-xl text-center" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                  style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
                >
                  <Award className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>92% Success Rate</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Our users consistently outperform the market average in interview success rates.</p>
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Rated 4.9/5 by 10,000+ users</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: 'var(--bg-surface)', borderTop: '0.5px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black"
              style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}
            >
              Success Stories
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl"
                style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
              >
                <div className="flex items-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-3 object-cover" style={{ border: '0.5px solid var(--border)' }} />
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.role}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{t.company}</div>
                  </div>
                </div>
                <div className="flex mb-3 gap-0.5">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4" style={{ color: '#fbbf24', fill: '#fbbf24' }} />)}
                </div>
                <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>&ldquo;{t.content}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
