'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Brain, CheckCircle, XCircle,
  RotateCcw, Loader2, BookOpenIcon, Code,
} from 'lucide-react';
import { Smile, Activity, Flame } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/constants';

interface QuizQuestion {
  id: string;
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
  code?: string;
}

interface Quiz {
  topic: string;
  subtopic: string;
  questions: QuizQuestion[];
}

export default function AiQuizPage() {
  const routeParams = useParams();

  const [selectedTopic,    setSelectedTopic]    = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [difficulty,       setDifficulty]       = useState('easy');
  const [questionCount]                          = useState(10);
  const [quiz,             setQuiz]             = useState<Quiz | null>(null);
  const [currentQuestion,  setCurrentQuestion]  = useState(0);
  const [userAnswers,      setUserAnswers]      = useState<Record<string, string>>({});
  const [showResults,      setShowResults]      = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [error,            setError]            = useState<string | null>(null);

  useEffect(() => {
    setSelectedTopic(decodeURIComponent(routeParams.topic as string));
    setSelectedSubtopic(decodeURIComponent(routeParams.subtopic as string));
  }, [routeParams.topic, routeParams.subtopic]);

  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    try {
      const response = await axios.post(
        `${API_URL}/ai-quiz/generate-quiz`,
        { topic: selectedTopic, subtopic: selectedSubtopic, difficulty, questionCount },
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
      );
      if (response.status !== 200) throw new Error('Failed to generate quiz');
      setQuiz(response.data);
      setCurrentQuestion(0);
      setUserAnswers({});
      setShowResults(false);
    } catch {
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (!quiz) return;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    return quiz.questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
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
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center p-8 rounded-xl max-w-sm w-full mx-4" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <div className="mb-6">
            <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
              <Loader2 className="w-7 h-7 animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Crafting Your Quiz</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>We&apos;re generating personalized questions just for you...</p>
          <div className="mt-5 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent)' }} />
            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent)', animationDelay: '0.1s' }} />
            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent)', animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <div className="flex items-center mb-5">
              <div className="p-2.5 rounded-xl mr-4" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                <Brain className="w-7 h-7" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>AI Quiz Generator</h1>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Powered by advanced AI technology</p>
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
              <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--accent)' }} />
                Get ready to challenge your knowledge with personalized questions!
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg p-4" style={{ background: 'rgba(248,113,113,0.05)', border: '0.5px solid rgba(248,113,113,0.2)' }}>
              <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{error}</p>
            </div>
          )}

          {/* Topics display */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-4 h-4 rounded-full" style={{ background: 'var(--accent)' }} />
              Your Selected Topics
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-5" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                <h3 className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Main Topic</h3>
                <p className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{selectedTopic || 'Not selected'}</p>
              </div>
              <div className="rounded-lg p-5" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                <h3 className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Subtopic</h3>
                <p className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{selectedSubtopic || 'Not selected'}</p>
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <div className="w-4 h-4 rounded-full" style={{ background: 'var(--warning)' }} />
              Select Difficulty Level
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {([
                { id: 'easy',   label: 'Easy',   icon: <Smile className="w-5 h-5" />,    activeColor: 'var(--success)', activeBg: 'rgba(74,222,158,0.08)', activeBorder: 'rgba(74,222,158,0.2)' },
                { id: 'medium', label: 'Medium', icon: <Activity className="w-5 h-5" />, activeColor: 'var(--warning)', activeBg: 'rgba(251,191,36,0.08)',   activeBorder: 'rgba(251,191,36,0.2)' },
                { id: 'hard',   label: 'Hard',   icon: <Flame className="w-5 h-5" />,    activeColor: 'var(--danger)',  activeBg: 'rgba(248,113,113,0.08)',  activeBorder: 'rgba(248,113,113,0.2)' },
              ] as const).map(({ id, label, icon, activeColor, activeBg, activeBorder }) => {
                const isActive = difficulty === id;
                return (
                  <button
                    key={id}
                    onClick={() => setDifficulty(id)}
                    className="p-4 rounded-xl font-medium text-sm transition-all duration-150"
                    style={isActive
                      ? { background: activeBg, border: `0.5px solid ${activeBorder}`, color: activeColor }
                      : { background: 'var(--bg-elevated)', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }
                    }
                  >
                    <div className="flex flex-col items-center gap-2">
                      {icon}
                      <span>{label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
              Selected: <span className="font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{difficulty}</span> level
            </p>
          </div>

          {/* Generate button */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <button
              onClick={generateQuiz}
              className="w-full py-3.5 px-8 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-3"
              style={{ background: 'var(--accent)', color: '#080808' }}
            >
              <BookOpenIcon className="w-5 h-5" />
              Generate Your Personalized Quiz
            </button>
            <p className="text-center text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>This will create a customized quiz based on your selections</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score      = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const scoreColor = percentage >= 70 ? 'var(--success)' : percentage >= 50 ? 'var(--warning)' : 'var(--danger)';

    return (
      <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl p-8 mb-6 text-center" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Quiz Results</h2>
            <div className="text-6xl font-bold mb-3" style={{ color: scoreColor, fontFamily: 'Syne, sans-serif' }}>{percentage}%</div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>You scored {score} out of {quiz.questions.length} questions correctly</p>
          </div>

          <div className="space-y-3 mb-6">
            {quiz.questions.map((question) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect  = userAnswer === question.correctAnswer;
              return (
                <div key={question.id} className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
                  <div className="flex items-start gap-3">
                    {isCorrect
                      ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
                      : <XCircle    className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--danger)' }} />
                    }
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{question.question}</p>
                      <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                        Your answer:{' '}
                        <span style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                          {userAnswer ? `${userAnswer}: ${question.options[userAnswer]}` : 'Not answered'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                          Correct answer:{' '}
                          <span style={{ color: 'var(--success)' }}>{question.correctAnswer}: {question.options[question.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-xs italic mt-2" style={{ color: 'var(--text-secondary)' }}>{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: 'var(--accent)', color: '#080808' }}
          >
            <RotateCcw className="w-4 h-4" />Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl p-6 mb-4" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{quiz.topic} — {quiz.subtopic}</h2>
            <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}>
              {currentQuestion + 1} / {quiz.questions.length}
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`, background: 'var(--accent)' }}
            />
          </div>
        </div>

        <div className="rounded-xl p-6 mb-4" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <h3 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{currentQ.question}</h3>
          {currentQ.code && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Code to analyze:</span>
              </div>
              <div className="rounded-lg p-5 overflow-x-auto" style={{ background: '#0a0a0a', border: '0.5px solid var(--border)' }}>
                <pre className="text-xs font-mono leading-relaxed" style={{ color: '#c9d1d9' }}><code>{currentQ.code}</code></pre>
              </div>
            </div>
          )}
          <div className="space-y-2.5">
            {Object.entries(currentQ.options).map(([key, value]) => {
              const isSelected = userAnswers[currentQ.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(currentQ.id, key)}
                  className="w-full p-4 text-left rounded-xl transition-all duration-150"
                  style={isSelected
                    ? { background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)', color: 'var(--text-primary)' }
                    : { background: 'var(--bg-elevated)', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }
                  }
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(226,226,226,0.15)'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <span className="font-bold mr-3 text-sm" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-secondary)' }}>{key}.</span>
                  <span className="text-sm">{value}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-30"
            style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={!userAnswers[currentQ.id]}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-30 flex items-center gap-1"
            style={{ background: 'var(--accent)', color: '#080808' }}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
