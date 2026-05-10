// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePicture: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  stats: {
    questionsCompleted: number;
    mockInterviews: number;
    blogsWritten: number;
    modulesCompleted: number;
  };
  activity: {
    latestBlog: Blog | null;
    latestSubtopic: Subtopic | null;
    latestInterviewSession: InterviewSession | null;
    latestQuestion: Question | null;
  };
  revisionQuestions: string[];
}

// ─── Topic / Subtopic ────────────────────────────────────────────────────────

export interface Subtopic {
  _id: string;
  title: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  videoUrl?: string;
  notesUrl?: string;
  handwrittenNotesUrl?: string;
  magicNotes?: string;
  questions?: Question[];
}

export interface Topic {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  count?: number;
  practiceTopics?: boolean;
  subTopics: Subtopic[];
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePicture: string;
}

export interface Comment {
  _id: string;
  author: BlogAuthor;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  readTime: number;
  views: number;
  likes: { user: string }[];
  comments: Comment[];
  author: BlogAuthor;
  publishedAt: string;
  createdAt: string;
  featured?: boolean;
}

// ─── Article ─────────────────────────────────────────────────────────────────

export interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  author: { name?: string };
  createdAt: string;
}

// ─── Question ────────────────────────────────────────────────────────────────

export interface Question {
  _id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  link?: string;
  platform?: string;
}

// ─── Interview Session ───────────────────────────────────────────────────────

export interface InterviewSession {
  _id: string;
  role: string;
  title?: string;
  endTime?: string;
}

// ─── Cheatsheet ──────────────────────────────────────────────────────────────

export interface CheatsheetItem {
  _id?: string;
  concept: string;
  explanation: string;
  code: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface CheatsheetSection {
  _id: string;
  title: string;
  items: CheatsheetItem[];
}

export interface Cheatsheet {
  _id: string;
  title: string;
  description: string;
  language: string;
  sections: CheatsheetSection[];
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  question: string;
  code?: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  topic: string;
  subtopic: string;
  questions: QuizQuestion[];
}

// ─── Redux State ─────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
}

export interface TopicState {
  topics: Topic[];
}

export interface BlogState {
  blogs: Blog[];
  blog: Blog | null;
  isLoading: boolean;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface BlogsResponse {
  success: boolean;
  blogs: Blog[];
  total?: number;
}

export interface TopicsResponse {
  success: boolean;
  topics: Topic[];
}
