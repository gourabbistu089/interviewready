import React from 'react';
import { motion } from 'framer-motion';


const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  gradient = false 
}) => {
  const baseClasses = gradient 
    ? 'bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm'
    : 'bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm';

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;