import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  Menu, 
  X, 
  User, 
  LogOut, 
  BookOpen, 
  Target, 
  FileText, 
  Settings,
  Bookmark,
  BarChart3,
  Code,
  Code2,
  Terminal,
  CodeSquare,
  Codepen,
  CodepenIcon,
  Newspaper ,
  ScrollText,
  Library

} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/authSlice';

const Header= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Learning', href: '/learning', icon: BookOpen },
    { name: 'Practice', href: '/practice', icon : Code2 },
    { name: 'Mock Interview', href: '/mock-interview', icon: Brain },
    { name: 'Blog', href: '/blog', icon: ScrollText  },
    { name: 'Cheatsheet', href: '/cheatsheet', icon: FileText  },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              InterviewReady
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200"
                >
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.firstName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium hidden sm:block">{user.firstName + ' ' + user.lastName}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;