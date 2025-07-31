import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer= () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-12 lg:space-y-0">
          {/* Brand Section */}
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-blue-600 rounded-xl">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">InterviewReady</span>
            </Link>
            <p className="text-gray-600 text-lg leading-relaxed">
              Master your interview skills and land your dream job with confidence.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-16">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Platform</h3>
              <div className="space-y-3">
                <Link to="/questions" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Practice Questions
                </Link>
                <Link to="/mock-interview" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Mock Interview
                </Link>
                <Link to="/blog" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Support</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 InterviewReady. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Built for ambitious professionals
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;