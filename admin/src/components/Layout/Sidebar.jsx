import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Settings, 
  X,
  User,
  UserCog ,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Topics', href: '/topics', icon: BookOpen },
    { name: 'Subtopics', href: '/subtopics', icon: FileText },
    { name: 'Questions', href: '/questions', icon: HelpCircle },
    { name: 'Users', href: '/users', icon: UserCog  },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: -300 }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {/* <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
            // onClick={onClose}
          />
        )}
      </AnimatePresence> */}

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg lg:static lg:translate-x-0"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduAdmin</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <>
              <NavLink
                key={item.name}
                to={item.href}
                // onClick={onClose}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`mr-3 w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.name}
              </NavLink>

              </>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;