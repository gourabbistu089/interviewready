// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import Cookies from 'js-cookie';
// import { toast } from 'react-hot-toast';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'user' | 'admin';
//   avatar?: string;
//   joinedDate: string;
//   stats: {
//     questionsCompleted: number;
//     mockInterviews: number;
//     studyStreak: number;
//     successRate: number;
//   };
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Dummy users for demonstration
// const dummyUsers = {
//   'user@demo.com': {
//     id: '1',
//     name: 'Alex Johnson',
//     email: 'user@demo.com',
//     role: 'user' as const,
//     avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
//     joinedDate: '2024-01-15',
//     stats: {
//       questionsCompleted: 47,
//       mockInterviews: 8,
//       studyStreak: 12,
//       successRate: 78
//     }
//   },
//   'admin@demo.com': {
//     id: '2',
//     name: 'Sarah Admin',
//     email: 'admin@demo.com',
//     role: 'admin' as const,
//     avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
//     joinedDate: '2023-12-01',
//     stats: {
//       questionsCompleted: 156,
//       mockInterviews: 25,
//       studyStreak: 45,
//       successRate: 92
//     }
//   }
// };

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // const token = Cookies.get('token');
//     // if (token) {
//     //   fetchUserInfo(token);
//     // } else {
//     //   setLoading(false);
//     // }
//   setUser(dummyUsers['admin@demo.com']);

//   }, []);

//   const fetchUserInfo = async (token: string) => {
//     try {
//       const userInfo = localStorage.getItem('userInfo');
//       if (userInfo) {
//         setUser(JSON.parse(userInfo));
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//       Cookies.remove('token');
//       setLoading(false);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       setLoading(true);
      
//       // Demo login - check if email exists in dummy users
//       const dummyUser = dummyUsers[email as keyof typeof dummyUsers];
      
//       if (!dummyUser) {
//         throw new Error('User not found');
//       }
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       Cookies.set('token', 'demo-token', { expires: 7 });
//       localStorage.setItem('userInfo', JSON.stringify(dummyUser));
//       setUser(dummyUser);
//       toast.success(`Welcome back, ${dummyUser.name}!`);
//     } catch (error) {
//       toast.error('Login failed. Try user@demo.com or admin@demo.com');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       setLoading(true);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const newUser = {
//         id: Date.now().toString(),
//         name: name,
//         email: email,
//         role: 'user' as const,
//         avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
//         joinedDate: new Date().toISOString().split('T')[0],
//         stats: {
//           questionsCompleted: 0,
//           mockInterviews: 0,
//           studyStreak: 0,
//           successRate: 0
//         }
//       };
      
//       Cookies.set('token', 'demo-token', { expires: 7 });
//       localStorage.setItem('userInfo', JSON.stringify(newUser));
//       setUser(newUser);
//       toast.success(`Welcome to InterviewReady, ${newUser.name}!`);
//     } catch (error) {
//       toast.error('Registration failed. Please try again.');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     Cookies.remove('token');
//     localStorage.removeItem('userInfo');
//     setUser(null);
//     toast.success('Logged out successfully!');
//   };

//   const value: AuthContextType = {
//     user,
//     login,
//     register,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };