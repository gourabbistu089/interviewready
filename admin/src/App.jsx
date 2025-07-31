import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import TopicsManagement from "./pages/TopicsManagement";
import SubtopicsManagement from "./pages/SubtopicsManagement";
import QuestionsManagement from "./pages/QuestionsManagement";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/topics"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TopicsManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/subtopics"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SubtopicsManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/questions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <QuestionsManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
}

export default App;
