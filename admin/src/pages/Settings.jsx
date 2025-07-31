import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Database, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your account information and preferences',
      color: 'bg-blue-500'
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure notification preferences and alerts',
      color: 'bg-green-500'
    },
    {
      title: 'Data Management',
      icon: Database,
      description: 'Import/export data and manage backups',
      color: 'bg-yellow-500'
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Manage security settings and access controls',
      color: 'bg-red-500'
    },
    {
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel of your dashboard',
      color: 'bg-purple-500'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application settings and preferences</p>
      </motion.div>

      {/* Settings Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg ${section.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Settings */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-save forms</p>
              <p className="text-sm text-gray-500">Automatically save form progress</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark mode</p>
              <p className="text-sm text-gray-500">Use dark theme (coming soon)</p>
            </div>
            <input
              type="checkbox"
              disabled
              className="h-4 w-4 text-gray-400 border-gray-300 rounded"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;