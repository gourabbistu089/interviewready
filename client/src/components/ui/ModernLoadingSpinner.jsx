// import { motion } from "framer-motion";

// export default function ModernSpinner() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
//       {/* Ambient space background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)] opacity-60" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)] opacity-60" />
      
//       {/* Distant stars */}
//       <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-violet-300 rounded-full animate-pulse" />
//       <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
//       <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
//       <div className="relative z-10">
//         {/* Solar system container */}
//         <div className="relative flex items-center justify-center">
          
//           {/* Outer planet orbit */}
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 12,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             className="absolute w-40 h-40 border border-dashed border-slate-300/50 rounded-full"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.3, 1],
//                 opacity: [0.6, 1, 0.6]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="absolute -top-2 left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transform -translate-x-1/2"
//             >
//               <div className="absolute inset-0.5 bg-white/80 rounded-full" />
//               <div className="absolute inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
//             </motion.div>
//           </motion.div>

//           {/* Middle planet orbit */}
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             className="absolute w-28 h-28 border border-dashed border-slate-300/40 rounded-full"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.7, 1, 0.7]
//               }}
//               transition={{
//                 duration: 2.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 0.5
//               }}
//               className="absolute -top-1.5 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full shadow-lg transform -translate-x-1/2"
//             >
//               <div className="absolute inset-0.5 bg-white/80 rounded-full" />
//               <div className="absolute inset-1 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full" />
//             </motion.div>
//           </motion.div>

//           {/* Inner planet orbit */}
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             className="absolute w-20 h-20 border border-dashed border-slate-300/30 rounded-full"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.1, 1],
//                 opacity: [0.8, 1, 0.8]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 1
//               }}
//               className="absolute -top-1 left-1/2 w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full shadow-lg transform -translate-x-1/2"
//             >
//               <div className="absolute inset-0.5 bg-white/90 rounded-full" />
//             </motion.div>
//           </motion.div>

//           {/* Central sun */}
//           <motion.div
//             animate={{
//               rotate: 360,
//               scale: [1, 1.05, 1]
//             }}
//             transition={{
//               rotate: { duration: 10, repeat: Infinity, ease: "linear" },
//               scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
//             }}
//             className="relative w-12 h-12 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 shadow-2xl"
//           >
//             <div className="absolute inset-1 rounded-full bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200 shadow-inner" />
//             <motion.div
//               animate={{
//                 opacity: [0.6, 1, 0.6],
//                 scale: [0.9, 1.1, 0.9]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
//             />
//           </motion.div>

//           {/* Sun's corona glow */}
//           <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-yellow-300/40 via-orange-300/40 to-red-300/40 rounded-full blur-xl animate-pulse" />
//           <div className="absolute inset-2 w-8 h-8 bg-gradient-to-r from-yellow-200/30 via-orange-200/30 to-red-200/30 rounded-full blur-lg" />
//         </div>

//         {/* Mission control interface */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
//           className="mt-16 text-center"
//         >
//           <motion.h2
//             animate={{
//               opacity: [0.8, 1, 0.8]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             className="text-2xl font-light text-slate-700 tracking-wide mb-2"
//           >
//             Initializing System
//           </motion.h2>
          
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0, 0.7, 0] }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               delay: 2,
//               ease: "easeInOut"
//             }}
//             className="text-sm text-slate-500 font-medium mb-6"
//           >
//             Aligning orbital parameters...
//           </motion.p>

//           {/* System status indicators */}
//           <div className="flex justify-center gap-4 mb-6">
//             {[
//               { color: 'from-violet-400 to-purple-500', delay: 0 },
//               { color: 'from-blue-400 to-indigo-500', delay: 0.3 },
//               { color: 'from-cyan-400 to-blue-500', delay: 0.6 }
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 animate={{
//                   opacity: [0.3, 1, 0.3],
//                   scale: [0.8, 1.2, 0.8]
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   delay: item.delay,
//                   ease: "easeInOut"
//                 }}
//                 className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}
//               />
//             ))}
//           </div>

//           {/* Orbital progress track */}
//           <div className="relative w-64 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
//             <motion.div
//               animate={{
//                 x: ['-100%', '100%']
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 rounded-full shadow-sm"
//             />
//           </div>

//           {/* Constellation dots */}
//           <div className="flex justify-center mt-6 gap-3">
//             {[0, 1, 2, 3, 4].map((i) => (
//               <motion.div
//                 key={i}
//                 animate={{
//                   opacity: [0.2, 1, 0.2],
//                   scale: [0.6, 1.4, 0.6],
//                   backgroundColor: [
//                     '#8b5cf6', 
//                     '#3b82f6', 
//                     '#06b6d4', 
//                     '#f59e0b',
//                     '#8b5cf6'
//                   ]
//                 }}
//                 transition={{
//                   duration: 2.5,
//                   repeat: Infinity,
//                   delay: i * 0.15,
//                   ease: "easeInOut"
//                 }}
//                 className="w-1.5 h-1.5 rounded-full shadow-sm"
//               />
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";

export default function AdvancedSolarSystemSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Advanced starfield background */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${2 + Math.random() * 4}px rgba(255, 255, 255, 0.8)`
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(139,92,246,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(59,130,246,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(6,182,212,0.08),transparent_70%)]" />
      
      <div className="relative z-10">
        {/* Advanced Solar System with orbital paths */}
        <div className="relative flex items-center justify-center mb-20">
          
          {/* Orbital paths - visible tracks */}
          <div className="absolute w-80 h-80 rounded-full border border-slate-700/30 shadow-inner" />
          <div className="absolute w-64 h-64 rounded-full border border-slate-600/40 shadow-inner" />
          <div className="absolute w-48 h-48 rounded-full border border-slate-500/50 shadow-inner" />
          <div className="absolute w-36 h-36 rounded-full border border-slate-400/60 shadow-inner" />
          <div className="absolute w-28 h-28 rounded-full border border-slate-300/70 shadow-inner" />
          
          {/* Orbital path glow effects */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 rounded-full"
          >
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-purple-400/50" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 rounded-full"
          >
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-blue-400/50" />
          </motion.div>

          {/* Pluto - Outermost dwarf planet */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-80 h-80 rounded-full"
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 8px rgba(139, 92, 246, 0.4)",
                    "0 0 15px rgba(139, 92, 246, 0.7)",
                    "0 0 8px rgba(139, 92, 246, 0.4)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300/60 to-indigo-300/60 rounded-full blur-sm" />
              </motion.div>
            </div>
          </motion.div>

          {/* Neptune - Ice giant */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-64 h-64 rounded-full"
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    "0 0 12px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.8)",
                    "0 0 12px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-xl"
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-300/80 to-cyan-300/80 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-md" />
              </motion.div>
            </div>
          </motion.div>

          {/* Saturn - Ringed planet */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-48 h-48 rounded-full"
          >
            <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 15px rgba(251, 191, 36, 0.5)",
                    "0 0 25px rgba(251, 191, 36, 0.8)",
                    "0 0 15px rgba(251, 191, 36, 0.5)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-5 h-5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full shadow-xl"
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-yellow-200/90 to-orange-200/90 rounded-full" />
                
                {/* Saturn's rings with particles */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full border border-yellow-300/60"
                >
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full"
                      style={{
                        transform: `rotate(${i * 30}deg) translateX(12px) rotate(-${i * 30}deg)`,
                        opacity: 0.6 + Math.random() * 0.4
                      }}
                    />
                  ))}
                </motion.div>
                
                <div className="absolute -inset-4 rounded-full border border-orange-300/40" />
                <div className="absolute -inset-5 rounded-full border border-yellow-200/30" />
              </motion.div>
            </div>
          </motion.div>

          {/* Jupiter - Gas giant */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-36 h-36 rounded-full"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 18px rgba(245, 158, 11, 0.5)",
                    "0 0 28px rgba(245, 158, 11, 0.8)",
                    "0 0 18px rgba(245, 158, 11, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-6 h-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-500 rounded-full shadow-xl"
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-orange-300/80 via-red-300/80 to-yellow-300/80 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/40 via-red-400/40 to-yellow-400/40 rounded-full blur-lg" />
                
                {/* Jupiter's Great Red Spot */}
                <div className="absolute top-1 left-1 w-1.5 h-1 bg-red-500 rounded-full opacity-80" />
              </motion.div>
            </div>
          </motion.div>

          {/* Earth - With realistic moon orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-28 h-28 rounded-full"
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 12px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.8)",
                    "0 0 12px rgba(6, 182, 212, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-4 h-4 bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 rounded-full shadow-xl"
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-300/70 via-green-300/70 to-blue-300/70 rounded-full" />
                
                {/* Earth's atmosphere glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/20 via-green-300/20 to-blue-300/20 rounded-full blur-sm" />
                
                {/* Moon with realistic orbit */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute w-8 h-8 rounded-full"
                >
                  <motion.div
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      boxShadow: [
                        "0 0 3px rgba(226, 232, 240, 0.6)",
                        "0 0 6px rgba(226, 232, 240, 0.9)",
                        "0 0 3px rgba(226, 232, 240, 0.6)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-0.5 left-1/2 w-1.5 h-1.5 bg-slate-200 rounded-full transform -translate-x-1/2 shadow-lg"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Advanced Sun - Central star with solar flares */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.03, 1]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-24 h-24 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 shadow-2xl"
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200 shadow-inner" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-white via-yellow-100 to-white shadow-inner" />
            
            {/* Solar flares */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 45, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-8 bg-gradient-to-t from-orange-400 via-yellow-300 to-transparent rounded-full"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  transformOrigin: 'bottom center',
                  top: '-16px',
                  left: '50%',
                  marginLeft: '-2px'
                }}
              />
            ))}
            
            {/* Solar corona layers */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-6 bg-gradient-to-r from-yellow-300/20 via-orange-300/20 to-red-300/20 rounded-full blur-xl"
            />
            <div className="absolute -inset-8 bg-gradient-to-r from-yellow-200/15 via-orange-200/15 to-red-200/15 rounded-full blur-2xl" />
            <div className="absolute -inset-10 bg-gradient-to-r from-yellow-100/10 via-orange-100/10 to-red-100/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Asteroid belt with moving particles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-56 h-56 rounded-full"
          >
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.9, 0.3],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 3 + i * 0.1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="absolute w-0.5 h-0.5 bg-slate-400 rounded-full shadow-sm"
                style={{
                  transform: `rotate(${i * 15}deg) translateX(${112 + Math.sin(i) * 8}px) rotate(-${i * 15}deg)`,
                  boxShadow: `0 0 2px rgba(148, 163, 184, 0.8)`
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Advanced System Initialization bubble */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 20px 40px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)",
                "0 25px 50px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.2)",
                "0 20px 40px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative inline-block px-12 py-6 bg-gradient-to-r from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-full border border-slate-700/50 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
            
            <motion.h2
              animate={{
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  "0 0 10px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 10px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative text-3xl font-light text-white tracking-wider"
            >
              System Initialization
            </motion.h2>
            
            {/* Particle effects around text */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  x: [0, (i % 2 === 0 ? 20 : -20), 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + Math.sin(i) * 20}%`
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}