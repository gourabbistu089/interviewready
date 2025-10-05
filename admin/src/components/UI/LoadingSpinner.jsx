import React from 'react';

const RippleSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex flex-col items-center space-y-8">
        {/* Main Ripple Effect */}
        <div className="relative w-28 h-28">
          {/* Outer ripple */}
          <div className="absolute inset-0 border-4 border-blue-200/70 rounded-full animate-ping"></div>
          
          {/* Middle ripple */}
          <div 
            className="absolute inset-4 border-4 border-blue-400/60 rounded-full animate-ping" 
            style={{animationDelay: '0.4s'}}
          ></div>
          
          {/* Inner ripple */}
          <div 
            className="absolute inset-8 border-4 border-blue-600/50 rounded-full animate-ping" 
            style={{animationDelay: '0.8s'}}
          ></div>
          
          {/* Core circle with glow */}
          <div className="absolute inset-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/40 animate-pulse"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-11 bg-white/30 rounded-full blur-sm"></div>
        </div>
        
        {/* Loading text with elegant animation */}
        <div className="text-slate-700 font-medium text-xl tracking-wide animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default RippleSpinner;