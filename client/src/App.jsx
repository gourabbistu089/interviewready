
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage";
import LearningPage from "./pages/LearningPage";
import PracticePage from "./pages/PracticePage";
import MockInterviewPage from "./pages/MockInterviewPage";
import BlogPage from "./pages/BlogPage";
import AdminPanelPage from "./pages/AdminPanelPage.jsx";
import { useEffect } from "react";
import { setTopics } from "./redux/features/topicSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "./constants";
import { setUser } from "./redux/features/authSlice.js";
import OpenRoute from "./components/OpenRoute.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import Blog from "./pages/Blog.jsx";
import ApplicationLoader from "./components/ui/ApplicationLoader.jsx";
import AiQuizPage from "./pages/AiQuizPage.jsx";
import CheatsheetApp from "./pages/CheatsheetApp.jsx";
import InterviewChatbot from "./components/InterviewChatbot.jsx";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState('Initializing...');
  const[intialLoad,setInitialLoad] = React.useState(false);

  const fetchTopics = async () => {
    try {
      setCurrentStep('Loading topics...');
      const response = await axios.get(`${API_URL}/topics`);
      
      if (response.data.success) {
        const allTopics = response.data.topics || [];
        if (allTopics.length > 0) {
          dispatch(setTopics(allTopics));
        }
      }
      return true;
    } catch (error) {
      console.error("Error fetching topics:", error);
      return false;
    }
  };

  const getUser = async () => {
    try {
      setCurrentStep('Authenticating user...');
      const token = localStorage.getItem("token");
      
      if (!token) {
        dispatch(setUser(null));
        return true; // Not an error, just no user logged in
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      let user = null;
      if (response?.data?.success) {
        user = response?.data?.user;
      }
      dispatch(setUser(user));
      console.log("response in app user", response);
      return true;
    } catch (error) {
      console.error("Error fetching user:", error);
      // If token is invalid, clear it
      localStorage.removeItem("token");
      dispatch(setUser(null));
      return true; // Don't block app loading for auth errors
    }
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      setLoadingProgress(0);
      setCurrentStep('Starting application...');

      // Step 1: Initial setup
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingProgress(20);

      // Step 2: Get user data
      await getUser();
      setLoadingProgress(60);

      // Step 3: Fetch topics
      await fetchTopics();
      setLoadingProgress(90);

      // Step 4: Finalize
      setCurrentStep('Application ready!');
      setLoadingProgress(100);
      
      // Small delay to show completion
      // await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    token && initializeApp();
  }, [intialLoad]);

  // Show loading screen with real progress
  if (loading) {
    return (
      <ApplicationLoader 
        progress={loadingProgress} 
        currentStep={currentStep}
      />
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <InterviewChatbot/>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <LoginPage intialLoad={intialLoad} setInitialLoad={setInitialLoad} />
                </OpenRoute>
              }
            />
            <Route
              path="/register"
              element={
                <OpenRoute>
                  <RegisterPage />
                </OpenRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learning"
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/practice"
              element={
                <ProtectedRoute>
                  <PracticePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mock-interview"
              element={
                <ProtectedRoute>
                  <MockInterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cheatsheet"
              element={
                <ProtectedRoute>
                  <CheatsheetApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-blog"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-quiz/:topic/:subtopic"
              element={
                <ProtectedRoute>
                  <AiQuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminPanelPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#374151",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;