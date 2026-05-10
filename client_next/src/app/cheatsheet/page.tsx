'use client';

import React, { useState, useEffect } from 'react';
import {
  Copy, Check, Heart, ChevronRight, ChevronDown,
  Target, Zap, Brain, Code2, Loader2, PlayCircle,
} from 'lucide-react';
import { API_URL } from '@/constants';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface CheatsheetItem {
  concept: string;
  explanation: string;
  code: string;
  difficulty: string;
  tags?: string[];
}

interface CheatsheetSection {
  _id: string;
  title: string;
  items: CheatsheetItem[];
}

interface Cheatsheet {
  title: string;
  description: string;
  sections: CheatsheetSection[];
}

interface Language { id: string; name: string; label: string; }

const LANGUAGES: Language[] = [
  { id: 'javascript', name: 'JavaScript', label: 'JS'  },
  { id: 'typescript', name: 'TypeScript', label: 'TS'  },
  { id: 'python',     name: 'Python',     label: 'PY'  },
  { id: 'java',       name: 'Java',       label: 'JV'  },
  { id: 'cpp',        name: 'C++',        label: 'C++' },
  { id: 'c',          name: 'C',          label: 'C'   },
  { id: 'php',        name: 'PHP',        label: 'PHP' },
  { id: 'pandas',     name: 'Pandas',     label: 'PD'  },
  { id: 'numpy',      name: 'NumPy',      label: 'NP'  },
];

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const styles: Record<string, React.CSSProperties> = {
    beginner:     { background: 'rgba(74,222,158,0.08)', color: '#4ade9e', border: '0.5px solid rgba(74,222,158,0.2)' },
    intermediate: { background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '0.5px solid rgba(251,191,36,0.2)' },
    advanced:     { background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.2)' },
  };
  const icons: Record<string, React.ReactNode> = {
    beginner:     <Target className="w-3 h-3" />,
    intermediate: <Zap className="w-3 h-3" />,
    advanced:     <Brain className="w-3 h-3" />,
  };
  const key = difficulty?.toLowerCase() ?? 'beginner';
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={styles[key] ?? styles.beginner}>
      {icons[key]}
      {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
    </span>
  );
}

export default function CheatsheetPage() {
  const router = useRouter();

  const [selectedLanguage,  setSelectedLanguage]  = useState('javascript');
  const [currentCheatsheet, setCurrentCheatsheet] = useState<Cheatsheet | null>(null);
  const [copiedCode,        setCopiedCode]        = useState('');
  const [favorites,         setFavorites]         = useState<Set<string>>(new Set());
  const [expandedSections,  setExpandedSections]  = useState<Set<string>>(new Set());
  const [loading,           setLoading]           = useState(true);
  const [error,             setError]             = useState('');

  const fetchCheatsheet = async (language: string) => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get<Cheatsheet>(`${API_URL}/cheatsheets/${language}`);
      if (!data) throw new Error('Failed to fetch cheatsheet');
      setCurrentCheatsheet(data);
      const firstSectionId = data.sections?.[0]?._id;
      setExpandedSections(new Set(firstSectionId ? [firstSectionId] : []));
    } catch (err) {
      setError((err as Error).message);
      setCurrentCheatsheet(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCheatsheet(selectedLanguage); }, [selectedLanguage]);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const toggleFavorite = (conceptId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(conceptId) ? next.delete(conceptId) : next.add(conceptId);
      return next;
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set<string>();
      if (!prev.has(sectionId)) next.add(sectionId);
      return next;
    });
  };

  const currentLang = LANGUAGES.find((l) => l.id === selectedLanguage);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Language Sidebar */}
        <div className="w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto" style={{ background: 'var(--bg-surface)', borderRight: '0.5px solid var(--border)' }}>
          <div className="p-5" style={{ borderBottom: '0.5px solid var(--border)' }}>
            <h2 className="text-base font-bold flex items-center gap-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
              <Code2 className="w-4 h-4" style={{ color: 'var(--accent)' }} />Cheatsheets
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Choose your interview focus</p>
          </div>
          <div className="p-3 space-y-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className="w-full text-left p-3 rounded-lg transition-colors duration-150 flex items-center justify-between"
                style={
                  selectedLanguage === lang.id
                    ? { background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)', color: 'var(--text-primary)' }
                    : { background: 'transparent', border: '0.5px solid transparent', color: 'var(--text-secondary)' }
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: selectedLanguage === lang.id ? 'var(--accent)' : 'var(--bg-elevated)',
                      color: selectedLanguage === lang.id ? '#080808' : 'var(--text-secondary)',
                      border: '0.5px solid var(--border)',
                    }}
                  >
                    {lang.label}
                  </div>
                  <span className="font-medium text-sm">{lang.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="min-h-full" style={{ background: 'var(--bg-base)' }}>
            {/* Header */}
            <div className="p-6" style={{ borderBottom: '0.5px solid var(--border)', background: 'var(--bg-surface)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ background: 'var(--accent)', color: '#080808' }}
                  >
                    {currentLang?.label}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
                      {currentCheatsheet?.title ?? `${currentLang?.name} Interview Guide`}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {currentCheatsheet?.description ?? `Master ${currentLang?.name} for your next technical interview`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!currentCheatsheet) return;
                    router.push(`/ai-quiz/${encodeURIComponent(currentCheatsheet.title)}/${encodeURIComponent(currentCheatsheet.description)}`);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ background: 'var(--accent)', color: '#080808' }}
                >
                  <PlayCircle size={16} />
                  Start Mock Interview
                </button>
              </div>
            </div>

            <div className="p-5">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" style={{ color: 'var(--accent)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading cheatsheet…</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="text-4xl mb-4">😕</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--danger)' }}>Something went wrong</div>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>{error}</p>
                  <button
                    onClick={() => fetchCheatsheet(selectedLanguage)}
                    className="px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: 'var(--accent)', color: '#080808' }}
                  >
                    Try Again
                  </button>
                </div>
              ) : !currentCheatsheet?.sections?.length ? (
                <div className="text-center py-20">
                  <Code2 className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No content available yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentCheatsheet.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
                      <button
                        onClick={() => toggleSection(section._id)}
                        className="w-full px-5 py-4 flex items-center justify-between transition-colors duration-150"
                        style={{ borderBottom: expandedSections.has(section._id) ? '0.5px solid var(--border)' : 'none' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                            style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
                          >
                            {String(sectionIdx + 1).padStart(2, '0')}
                          </div>
                          <div className="text-left">
                            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{section.items.length} concepts</p>
                          </div>
                        </div>
                        {expandedSections.has(section._id)
                          ? <ChevronDown  className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                          : <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                        }
                      </button>

                      {expandedSections.has(section._id) && (
                        <div className="p-4 space-y-4">
                          {section.items.map((item, itemIdx) => {
                            const conceptId = `${sectionIdx}-${itemIdx}`;
                            const isFavorite = favorites.has(conceptId);
                            return (
                              <div key={itemIdx} className="rounded-lg overflow-hidden" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                                <div className="px-5 py-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.concept}</h4>
                                        <DifficultyBadge difficulty={item.difficulty} />
                                      </div>
                                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.explanation}</p>
                                      {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                          {item.tags.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}>
                                              #{tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => toggleFavorite(conceptId)}
                                      className="p-2 rounded-lg ml-3 transition-colors duration-150"
                                      style={isFavorite
                                        ? { background: 'rgba(248,113,113,0.08)', color: 'var(--danger)', border: '0.5px solid rgba(248,113,113,0.2)' }
                                        : { background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }
                                      }
                                    >
                                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                    </button>
                                  </div>
                                </div>
                                <div className="relative" style={{ background: '#0a0a0a' }}>
                                  <button
                                    onClick={() => copyToClipboard(item.code, conceptId)}
                                    className="absolute top-3 right-3 z-10 p-2 rounded-lg transition-colors duration-150"
                                    style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                                  >
                                    {copiedCode === conceptId
                                      ? <Check className="w-3.5 h-3.5" style={{ color: 'var(--success)' }} />
                                      : <Copy  className="w-3.5 h-3.5" />
                                    }
                                  </button>
                                  <div className="p-5">
                                    <pre className="text-xs leading-relaxed font-mono overflow-x-auto" style={{ color: '#c9d1d9' }}>
                                      <code>{item.code}</code>
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
