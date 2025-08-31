// import React, { useState, useEffect } from 'react';

// const ApplicationLoader = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         const newProgress = prev + Math.random() * 2.5 + 1;
//         if (newProgress >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return newProgress;
//       });
//     }, 90);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
      
//       {/* Subtle Background Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-50/60 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
//         <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '8s' }}></div>
//       </div>
//       <div className="text-center relative z-10">
        
//         {/* Large Spinner */}
//         <div className="mb-12 relative">
//           <div className="w-24 h-24 mx-auto relative">
//             {/* Outer glow ring */}
//             <div className="absolute inset-0 border-4 border-blue-100/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
            
//             {/* Base ring */}
//             <div className="absolute inset-0 border-4 border-gray-100/80 rounded-full"></div>
            
//             {/* Progress ring */}
//             <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-500/70 rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
            
//             {/* Inner ring */}
//             <div className="absolute inset-2 border-2 border-transparent border-t-indigo-500/60 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
            
//             {/* Center dot */}
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//           </div>
//         </div>

//         {/* Main Text */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
//             Loading your application
//           </h1>
//           <p className="text-gray-500 text-lg font-medium">
//             Please wait a moment...
//           </p>
//         </div>

//         {/* Progress */}
//         <div className="max-w-xs mx-auto">
//           <div className="h-1.5 bg-gray-100/80 rounded-full overflow-hidden mb-4 backdrop-blur-sm">
//             <div 
//               className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out relative"
//               style={{ width: `${Math.min(progress, 100)}%` }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
//             </div>
//           </div>
//           <div className="text-sm text-gray-500 font-semibold">
//             {Math.round(Math.min(progress, 100))}%
//           </div>
//         </div>

//         {/* Ready State */}
//         {progress >= 100 && (
//           <div className="mt-8 animate-fade-in">
//             <div className="bg-green-50/80 backdrop-blur-sm border border-green-100/50 rounded-2xl px-6 py-3 inline-block">
//               <div className="text-green-700 font-semibold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 Application ready
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ApplicationLoader;
import React from 'react';

const ApplicationLoader = ({ progress = 0, currentStep = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
      
      {/* Subtle Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-50/60 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '8s' }}></div>
      </div>
      
      <div className="text-center relative z-10">
        
        {/* Large Spinner */}
        <div className="mb-12 relative">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 border-4 border-blue-100/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
            
            {/* Base ring */}
            <div className="absolute inset-0 border-4 border-gray-100/80 rounded-full"></div>
            
            {/* Progress ring */}
            <div 
              className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-500/70 rounded-full transition-transform duration-300"
              style={{ 
                transform: `rotate(${progress * 3.6}deg)`,
                transformOrigin: 'center'
              }}
            ></div>
            
            {/* Inner ring */}
            <div className="absolute inset-2 border-2 border-transparent border-t-indigo-500/60 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
            
            {/* Center progress percentage */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-sm font-semibold text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
            Loading your application
          </h1>
          <p className="text-gray-500 text-lg font-medium min-h-[1.75rem]">
            {currentStep}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-100/80 rounded-full overflow-hidden mb-4 backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="text-sm text-gray-500 font-semibold">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Ready State */}
        {progress >= 100 && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-100/50 rounded-2xl px-6 py-3 inline-block">
              <div className="text-green-700 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Application ready
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ApplicationLoader;