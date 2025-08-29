import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  BookOpen,
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Loader2,
  BookOpenIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../constants';
const AiQuizPage = () => {
  const [topics, setTopics] = useState({});
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState(["easy", "medium"]);
  const [questionCount, setQuestionCount] = useState(10);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { topic, subtopic } = useParams();

  // Fetch available topics on component mount
  useEffect(() => {
    setSelectedTopic(topic);
    setSelectedSubtopic(subtopic);
  }, []);

  console.log(
    "selectedTopic, selectedSubtopic",
    selectedTopic,
    selectedSubtopic
  );

  const generateQuiz = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        API_URL+"/ai-quiz/generate-quiz",
        {
          topic: selectedTopic,
          subtopic: selectedSubtopic,
          difficulty,
          questionCount: parseInt(questionCount),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // attach token
          },
        }
      );

      console.log(response); // quiz data

      if (response.status !== 200) {
        throw new Error("Failed to generate quiz");
      }

      const quizData = await response.data;
      setQuiz(quizData);
      setCurrentQuestion(0);
      setUserAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error("Quiz generation error:", error);
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-slate-200 max-w-sm w-full mx-4">
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Crafting Your Quiz
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We're generating personalized questions just for you...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  AI Quiz Generator
                </h1>
                <p className="text-gray-500 mt-1">
                  Powered by advanced AI technology
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <p className="text-gray-700 font-medium flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                Get ready to challenge your knowledge with personalized
                questions!
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Topic Selection Display */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3"></div>
              Your Selected Topics
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
                  Main Topic
                </h3>
                <p className="text-2xl font-bold text-blue-800">
                  {selectedTopic || "Not selected"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <h3 className="text-sm font-medium text-purple-600 uppercase tracking-wide mb-2">
                  Subtopic
                </h3>
                <p className="text-2xl font-bold text-purple-800">
                  {selectedSubtopic || "Not selected"}
                </p>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <button
              onClick={generateQuiz}
              className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] shadow-lg ${"bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-200"}`}
            >
              <div className={`p-2 rounded-lg mr-3 `}>
                <BookOpenIcon className="w-6 h-6" />
              </div>
              Generate Your Personalized Quiz
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              This will create a customized quiz based on your selections
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Results
          </h2>
          <div className="text-6xl font-bold mb-4">
            <span
              className={
                percentage >= 70
                  ? "text-green-500"
                  : percentage >= 50
                  ? "text-yellow-500"
                  : "text-red-500"
              }
            >
              {percentage}%
            </span>
          </div>
          <p className="text-lg text-gray-600">
            You scored {score} out of {quiz.questions.length} questions
            correctly
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {quiz.questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-2">
                      {question.question}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Your answer:{" "}
                      <span
                        className={
                          isCorrect ? "text-green-600" : "text-red-600"
                        }
                      >
                        {userAnswer
                          ? `${userAnswer}: ${question.options[userAnswer]}`
                          : "Not answered"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 mb-2">
                        Correct answer:{" "}
                        <span className="text-green-600">
                          {question.correctAnswer}:{" "}
                          {question.options[question.correctAnswer]}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-gray-500 italic">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetQuiz}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Take Another Quiz
        </button>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {quiz.topic} - {quiz.subtopic}
          </h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestion + 1) / quiz.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQ.question}
        </h3>
        <div className="space-y-3">
          {Object.entries(currentQ.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswerSelect(currentQ.id, key)}
              className={`w-full p-4 text-left border-2 rounded-lg transition duration-200 ${
                userAnswers[currentQ.id] === key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-medium text-blue-600 mr-3">{key}.</span>
              <span className="text-gray-800">{value}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={!userAnswers[currentQ.id]}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center"
        >
          {currentQuestion === quiz.questions.length - 1
            ? "Finish Quiz"
            : "Next"}
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AiQuizPage;
