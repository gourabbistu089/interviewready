'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, Brain, TrendingUp, Plus, Edit, Trash2, Eye,
  Award, Activity, Settings, Upload, Download,
} from 'lucide-react';
import Button from '@/components/ui/Button';

type TabId = 'overview' | 'questions' | 'users' | 'interviews' | 'content' | 'settings';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: string;
  questionsCompleted: number;
}

interface QuestionRow {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  author: string;
  date: string;
  status: string;
}

const tabs: { id: TabId; name: string; icon: React.ElementType }[] = [
  { id: 'overview',   name: 'Overview',        icon: TrendingUp },
  { id: 'questions',  name: 'Questions',        icon: BookOpen   },
  { id: 'users',      name: 'Users',            icon: Users      },
  { id: 'interviews', name: 'Mock Interviews',  icon: Brain      },
  { id: 'content',    name: 'Content',          icon: Edit       },
  { id: 'settings',   name: 'Settings',         icon: Settings   },
];

const stats: StatItem[] = [
  { title: 'Total Users',     value: '12,450', change: '+12%', icon: Users    },
  { title: 'Questions',       value: '2,847',  change: '+8%',  icon: BookOpen },
  { title: 'Mock Interviews', value: '8,920',  change: '+15%', icon: Brain    },
  { title: 'Success Rate',    value: '87%',    change: '+3%',  icon: Award    },
];

const recentUsers: UserRow[] = [
  { id: 1, name: 'John Smith',    email: 'john@example.com',  joinDate: '2024-01-15', status: 'active',   questionsCompleted: 45 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', joinDate: '2024-01-14', status: 'active',   questionsCompleted: 32 },
  { id: 3, name: 'Mike Chen',     email: 'mike@example.com',  joinDate: '2024-01-13', status: 'inactive', questionsCompleted: 18 },
  { id: 4, name: 'Emily Davis',   email: 'emily@example.com', joinDate: '2024-01-12', status: 'active',   questionsCompleted: 67 },
  { id: 5, name: 'Alex Wilson',   email: 'alex@example.com',  joinDate: '2024-01-11', status: 'active',   questionsCompleted: 23 },
];

const recentQuestions: QuestionRow[] = [
  { id: 1, title: 'Two Sum Problem',          category: 'Algorithms',      difficulty: 'Easy',   author: 'Admin',       date: '2024-01-15', status: 'published' },
  { id: 2, title: 'React Hooks Explained',    category: 'Frontend',        difficulty: 'Medium', author: 'Sarah Admin', date: '2024-01-14', status: 'published' },
  { id: 3, title: 'System Design: Chat App',  category: 'System Design',   difficulty: 'Hard',   author: 'Admin',       date: '2024-01-13', status: 'draft'     },
  { id: 4, title: 'Binary Tree Traversal',    category: 'Data Structures', difficulty: 'Medium', author: 'Mike Admin',  date: '2024-01-12', status: 'published' },
  { id: 5, title: 'Database Optimization',    category: 'Backend',         difficulty: 'Hard',   author: 'Admin',       date: '2024-01-11', status: 'review'    },
];

function difficultyStyle(d: string): React.CSSProperties {
  switch (d.toLowerCase()) {
    case 'easy':   return { background: 'rgba(74,222,158,0.08)',   color: 'var(--success)', border: '0.5px solid rgba(74,222,158,0.2)' };
    case 'medium': return { background: 'rgba(251,191,36,0.08)',   color: 'var(--warning)', border: '0.5px solid rgba(251,191,36,0.2)' };
    case 'hard':   return { background: 'rgba(248,113,113,0.08)',  color: 'var(--danger)',  border: '0.5px solid rgba(248,113,113,0.2)' };
    default:       return { background: 'var(--bg-elevated)',      color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
  }
}

function statusStyle(s: string): React.CSSProperties {
  switch (s.toLowerCase()) {
    case 'active':
    case 'published': return { background: 'rgba(74,222,158,0.08)',  color: 'var(--success)', border: '0.5px solid rgba(74,222,158,0.2)' };
    case 'inactive':
    case 'draft':     return { background: 'var(--bg-elevated)',     color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
    case 'review':    return { background: 'rgba(251,191,36,0.08)',  color: 'var(--warning)', border: '0.5px solid rgba(251,191,36,0.2)' };
    default:          return { background: 'var(--bg-elevated)',     color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
  }
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <div
                className="p-5 rounded-xl"
                style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.title}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{stat.value}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--success)' }}>{stat.change} from last month</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                    <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="rounded-xl p-5" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
              <Users className="h-4 w-4" style={{ color: 'var(--accent)' }} />Recent Users
            </h3>
            <Button size="small" variant="secondary">View All</Button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Joined {new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-xs font-medium" style={statusStyle(user.status)}>{user.status}</span>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{user.questionsCompleted} questions</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Questions */}
        <div className="rounded-xl p-5" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
              <BookOpen className="h-4 w-4" style={{ color: 'var(--accent)' }} />Recent Questions
            </h3>
            <Button size="small" variant="secondary">View All</Button>
          </div>
          <div className="space-y-3">
            {recentQuestions.map((q) => (
              <div key={q.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{q.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{q.category} • {q.author}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{new Date(q.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right space-y-1">
                  <span className="block px-2 py-0.5 rounded text-xs font-medium" style={difficultyStyle(q.difficulty)}>{q.difficulty}</span>
                  <span className="block px-2 py-0.5 rounded text-xs font-medium" style={statusStyle(q.status)}>{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionsTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Question Management</h3>
        <div className="flex gap-3">
          <Button variant="secondary"><Upload className="h-4 w-4 mr-2" />Import</Button>
          <Button><Plus className="h-4 w-4 mr-2" />Add Question</Button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: '0.5px solid var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: 'var(--bg-elevated)', borderBottom: '0.5px solid var(--border)' }}>
              <tr>
                {['Question','Category','Difficulty','Status','Date','Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: 'var(--bg-surface)' }}>
              {recentQuestions.map((q) => (
                <tr key={q.id} style={{ borderBottom: '0.5px solid var(--border)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{q.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>By {q.author}</p>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{q.category}</td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-xs font-medium" style={difficultyStyle(q.difficulty)}>{q.difficulty}</span></td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-xs font-medium" style={statusStyle(q.status)}>{q.status}</span></td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{new Date(q.date).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded transition-opacity hover:opacity-70" style={{ color: 'var(--accent)' }}><Eye className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded transition-opacity hover:opacity-70" style={{ color: 'var(--success)' }}><Edit className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded transition-opacity hover:opacity-70" style={{ color: 'var(--danger)' }}><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>User Management</h3>
        <div className="flex gap-3">
          <Button variant="secondary"><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button><Plus className="h-4 w-4 mr-2" />Add User</Button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: '0.5px solid var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: 'var(--bg-elevated)', borderBottom: '0.5px solid var(--border)' }}>
              <tr>
                {['User','Email','Join Date','Questions','Status','Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: 'var(--bg-surface)' }}>
              {recentUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '0.5px solid var(--border)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--accent)', color: '#080808' }}>
                        {user.name.charAt(0)}
                      </div>
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{user.questionsCompleted}</td>
                  <td className="px-5 py-4"><span className="px-2 py-0.5 rounded text-xs font-medium" style={statusStyle(user.status)}>{user.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded transition-opacity hover:opacity-70" style={{ color: 'var(--accent)' }}><Eye className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded transition-opacity hover:opacity-70" style={{ color: 'var(--success)' }}><Edit className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded transition-opacity hover:opacity-70" style={{ color: 'var(--danger)' }}><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ name }: { name: string }) {
  return (
    <div className="text-center py-12">
      <Activity className="h-10 w-10 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{name} Management</h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>This section is under development. More features coming soon!</p>
    </div>
  );
}

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':  return <OverviewTab />;
      case 'questions': return <QuestionsTab />;
      case 'users':     return <UsersTab />;
      default:          return <PlaceholderTab name={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Admin Panel</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Manage users, questions, and platform content</p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
          <div className="flex flex-wrap gap-2 p-2 rounded-xl" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                  style={isActive
                    ? { background: 'var(--accent)', color: '#080808' }
                    : { background: 'transparent', color: 'var(--text-secondary)' }
                  }
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
