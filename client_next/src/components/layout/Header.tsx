'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain, Menu, X, User, LogOut, BookOpen, BarChart3,
  Code2, ScrollText, FileText,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/features/authSlice';

const navigation = [
  { name: 'Dashboard',      href: '/dashboard',      icon: BarChart3  },
  { name: 'Learning',       href: '/learning',        icon: BookOpen   },
  { name: 'Practice',       href: '/practice',        icon: Code2      },
  { name: 'Mock Interview', href: '/mock-interview',  icon: Brain      },
  { name: 'Blog',           href: '/blog',            icon: ScrollText },
  { name: 'Cheatsheet',     href: '/cheatsheet',      icon: FileText   },
];

export default function Header() {
  const [isMenuOpen,     setIsMenuOpen]     = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAppSelector((s) => s.auth);
  const pathname  = usePathname();
  const dispatch  = useAppDispatch();

  return (
    <header style={{ background: 'var(--bg-surface)', borderBottom: '0.5px solid var(--border)' }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div style={{ border: '0.5px solid var(--border)', background: 'var(--bg-elevated)' }} className="p-2 rounded-lg">
              <Brain className="h-5 w-5" style={{ color: 'var(--accent)' }} />
            </div>
            <span className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              InterviewReady
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                style={{
                  color: pathname === href ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: pathname === href ? 'var(--accent-dim)' : 'transparent',
                  border: pathname === href ? '0.5px solid var(--accent-border)' : '0.5px solid transparent',
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </Link>
            ))}
          </nav>

          {/* User area */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-150"
                  style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  {user.profilePicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profilePicture}
                      alt={user.firstName}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  )}
                  <span className="text-sm font-medium hidden sm:block">
                    {user.firstName} {user.lastName}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl py-2 z-50" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                    <div className="px-4 py-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{user.firstName} {user.lastName}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 text-xs rounded" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}>
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-150"
                      style={{ color: 'var(--danger)' }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-150"
                  style={{ background: 'var(--accent)', color: '#080808' }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-150"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden py-3" style={{ borderTop: '0.5px solid var(--border)' }}>
            <nav className="flex flex-col space-y-1">
              {navigation.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{
                    color: pathname === href ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: pathname === href ? 'var(--accent-dim)' : 'transparent',
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
