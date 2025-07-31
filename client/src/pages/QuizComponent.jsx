import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  BookOpen, 
  Home,
  Brain,
  Target,
  Trophy,
  Play,
  Star,
  Circle,
  CheckCircle2
} from 'lucide-react';

const QuizComponent = ({questionsData , quizeResource}) => {
  // console.log("questionsData in QuizComponent", questionsData);
  // console.log("quizeResource in QuizComponent", quizeResource);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questionsData[0]?.timeLimit * 60 || 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResults]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  console.log("answers in QuizComponent", answers);

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questionsData[currentQuestion + 1]?.timeLimit * 60 || 60);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(questionsData[currentQuestion - 1]?.timeLimit * 60 || 60);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleBackToStart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(questionsData[0]?.timeLimit * 60 || 60);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    let score = 0;
    let totalPoints = 0;
    questionsData.forEach((question, index) => {
      totalPoints += question.points;
      if (answers[index] === question.correctAnswer) {
        score += question.points;
      }
    });
    return { score, totalPoints };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(questionsData[0]?.timeLimit * 60 || 60);
    setQuizStarted(false);
    setShowExplanation(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getScoreGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50' };
  };

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{quizeResource?.title}</h1>
              <p className="text-gray-600">{quizeResource?.descriptionX || "Let's start the quiz!"}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Questions</span>
                </div>
                <span className="font-semibold text-gray-900">{questionsData.length}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700">Total Points</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {questionsData.reduce((sum, q) => sum + q.points, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Time</span>
                </div>
                <span className="font-semibold text-gray-900">Per Question</span>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const { score, totalPoints } = calculateScore();
    const percentage = Math.round((score / totalPoints) * 100);
    const grade = getScoreGrade(percentage);
    
    return (
      <div className="min-h-screen w-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 text-white p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Quiz Results</h1>
                <button
                  onClick={handleBackToStart}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Score */}
            <div className="p-8 text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 ${grade.bg} rounded-full mb-6`}>
                <div className={`text-2xl font-bold ${grade.color}`}>{grade.grade}</div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{percentage}%</h2>
              <p className="text-gray-600 mb-8">You scored {score} out of {totalPoints} points</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{Object.keys(answers).length}</div>
                  <div className="text-sm text-gray-600">Attempted</div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {questionsData.filter((q, i) => answers[i] === q.correctAnswer).length}
                  </div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake Quiz
                </button>
                <button
                  onClick={handleBackToStart}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const question = questionsData[currentQuestion];
  const currentAnswer = answers[currentQuestion];
  const progress = ((currentQuestion + 1) / questionsData.length) * 100;

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToStart}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <div className="text-center">
                <div className="text-gray-300 text-sm">Question {currentQuestion + 1} of {questionsData.length}</div>
                <div className="font-semibold">{question.title}</div>
              </div>
              <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {question.points} pts
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-8">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.type === 'true-false' ? (
                <>
                  <button
                    onClick={() => handleAnswer('true')}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      currentAnswer === 'true' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        currentAnswer === 'true' ? 'border-green-500 bg-green-500' : 'border-gray-300'
                      }`}>
                        {currentAnswer === 'true' && (
                          <CheckCircle2 className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                      <span className="font-medium">True</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAnswer('false')}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      currentAnswer === 'false' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        currentAnswer === 'false' ? 'border-red-500 bg-red-500' : 'border-gray-300'
                      }`}>
                        {currentAnswer === 'false' && (
                          <XCircle className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                      <span className="font-medium">False</span>
                    </div>
                  </button>
                </>
              ) : (
                question.options?.map((option, index) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.text)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        currentAnswer === option.text 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg border-2 mr-3 flex items-center justify-center ${
                          currentAnswer === option.text ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}>
                          <span className={`text-sm font-bold ${
                            currentAnswer === option.text ? 'text-white' : 'text-gray-600'
                          }`}>
                            {letters[index]}
                          </span>
                        </div>
                        <span className="font-medium">{option.text}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Explanation */}
            {currentAnswer && (
              <div className="mb-8">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {showExplanation ? 'Hide' : 'Show'} Explanation
                </button>
                
                {showExplanation && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {questionsData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentQuestion
                        ? 'bg-blue-600 w-4'
                        : answers[index]
                        ? 'bg-green-400'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentQuestion === questionsData.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;