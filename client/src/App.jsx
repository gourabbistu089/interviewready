import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
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

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const fetchTopics = async () => {
    let allTopics = [];
    try {
      const response = await axios.get(`${API_URL}/topics`);
      // console.log("response in app", response);
      if (response.data.success) {
        allTopics = response.data.topics || [];
        if (allTopics.length > 0) {
          dispatch(setTopics(allTopics));
        }
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };
  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let user = null;
      if (response?.data?.success) {
        user = response?.data?.user;
      }
      dispatch(setUser(user));
      console.log("response in app user", response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
   useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      await Promise.all([getUser(), fetchTopics()]);
      setLoading(false);
    };

    initializeApp();
  }, []);

  // Show loading screen
  if (loading) {
    return (
     <ApplicationLoader />
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <LoginPage />
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
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminPanelPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {/* <Footer /> */}
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
