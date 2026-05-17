# High-Level Design (HLD) — InterviewReady Platform

---

## 1. System Overview

InterviewReady is a full-stack technical interview preparation platform built as a monorepo. It serves three categories of users — **regular users** (interview prep), **admins** (content management), and **AI-driven features** (mock interviews, quizzes, chatbot).

**Live URL**: https://interviewready-xi.vercel.app

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│                                                                 │
│  ┌─────────────────────────┐   ┌────────────────────────────┐  │
│  │  client_next (Next.js)  │   │    admin (React + Vite)    │  │
│  │  Port: 3000             │   │    Port: 5174              │  │
│  │  Vercel (SSR + Static)  │   │    Vercel (Static)         │  │
│  └────────────┬────────────┘   └─────────────┬──────────────┘  │
└───────────────┼──────────────────────────────┼─────────────────┘
                │ HTTPS REST                    │ HTTPS REST
                │ Authorization: Bearer <JWT>   │ Authorization: Bearer <JWT>
                ▼                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                              │
│                                                                 │
│              server (Express.js) — Port: 5000                   │
│              Render.com / Vercel                                 │
│                                                                 │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│   │  Auth    │ │  Topics  │ │  Blogs   │ │  AI (Gemini)     │  │
│   │  Routes  │ │  Routes  │ │  Routes  │ │  Interview/Quiz  │  │
│   └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
          ┌─────────────┼───────────────┐
          ▼             ▼               ▼
   ┌────────────┐ ┌──────────┐  ┌───────────────┐
   │  MongoDB   │ │Cloudinary│  │ Google Gemini │
   │  Atlas     │ │  (CDN)   │  │  2.5-flash    │
   └────────────┘ └──────────┘  └───────────────┘
```

---

## 3. Tech Stack

| Layer       | Technology                                  | Purpose                              |
|-------------|---------------------------------------------|--------------------------------------|
| Frontend    | Next.js 15, TypeScript, TailwindCSS v4      | User-facing app (SSR + Static)       |
| Admin Panel | React 19, Vite, TailwindCSS                 | Content management                   |
| Backend     | Node.js, Express.js (CommonJS)              | REST API server                      |
| Database    | MongoDB + Mongoose                          | Persistent data storage              |
| State Mgmt  | Redux Toolkit (client), Context API (admin) | Client-side state                    |
| Auth        | JWT (Bearer + httpOnly cookie)              | Authentication & authorization       |
| AI          | Google Gemini 2.5-flash (`@google/genai`)   | Interview questions, quiz, chatbot   |
| File Storage| Cloudinary                                  | Images (profiles, blogs, articles)   |
| Email       | Nodemailer + Gmail SMTP                     | Email verification                   |
| Deployment  | Vercel (frontend), Render (backend)         | Hosting                              |

---

## 4. Repository Structure (Monorepo)

```
/
├── client/           # React 19 + Vite (original, deployed to Vercel)
├── client_next/      # Next.js 15 + TypeScript (active migration)
├── admin/            # React 19 + Vite (admin panel)
├── server/           # Node.js + Express REST API
└── package.json      # Root — concurrently runs all services
```

---

## 5. Data Models

### 5.1 User
```
User {
  username         : String (unique)
  email            : String (unique)
  password         : String (bcrypt, min 6)
  firstName        : String
  lastName         : String
  fullName         : Virtual (computed)
  profilePicture   : String (Cloudinary URL)
  role             : 'user' | 'admin'
  isVerified       : Boolean (TTL 60s if false)
  isActive         : Boolean
  lastLogin        : Date
  stats {
    questionsCompleted : Number
    mockInterviews     : Number
    blogsWritten       : Number
    modulesCompleted   : Number
  }
  activity {
    latestBlog             : → Blog
    latestSubtopic         : → Subtopic
    latestInterviewSession : → InterviewSession
    latestQuestion         : → Question
  }
  revisionQuestions : [→ Question]
}
```

### 5.2 Topic → Subtopic Hierarchy
```
Topic {
  title          : String (unique)
  description    : String
  category       : enum [frontend, backend, fullstack, data-science,
                         data-structure, core, others]
  icon           : String
  color          : String (hex, default #3B82F6)
  difficulty     : enum [beginner, intermediate, advanced]
  subTopics      : [→ Subtopic]
  estimatedTime  : String
  prerequisites  : [→ Topic]
  practiceTopics : Boolean  ← separates Learning vs Practice
  isActive       : Boolean
  order          : Number
  createdBy      : → User (admin)
}

Subtopic {
  title          : String
  description    : String
  topicId        : → Topic
  tags           : [String]
  difficulty     : enum [easy, medium, hard]
  estimatedTime  : String
  order          : Number
  magicNotes     : String (AI-generated summary)
  content {
    youtubeLinks     : { url: String }
    notesLinks       : { url: String }
    handwrittenPDFs  : { url: String }
  }
  questions      : [→ Question]
  createdBy      : → User (admin)
}
```

### 5.3 Question
```
Question {
  title        : String
  question     : String
  type         : enum [coding, essay]
  difficulty   : enum [easy, medium, hard]
  topicId      : → Topic
  subtopicId   : → Subtopic
  topics       : [String]
  tags         : [String]
  company      : [String]
  frequency    : Number
  timeLimit    : Number (minutes)
  points       : Number
  isRevision   : Boolean
  isActive     : Boolean
  content {
    practiceLinks   : { url }
    youtubeLinks    : { url }
    notesLinks      : { url }
    handwrittenPDFs : { driveUrl }
  }
  createdBy    : → User (admin)
}
```

### 5.4 Blog
```
Blog {
  title          : String (unique)
  slug           : String (auto-generated)
  excerpt        : String (max 300)
  content        : String (HTML)
  featuredImage  : String (Cloudinary URL)
  author         : → User
  category       : enum [9 categories]
  tags           : [String]
  status         : enum [draft, published, archived]
  readTime       : Number (auto-calculated)
  views          : Number
  likes          : [{ user: → User, likedAt: Date }]
  comments       : [{ author: → User, content: String, createdAt: Date }]
  publishedAt    : Date
}
```

### 5.5 Article
```
Article {
  title    : String (unique)
  slug     : String (auto-generated, used for URL routing)
  category : String
  content  : String (Markdown)
  author   : → User (admin only)
}
```

### 5.6 Progress
```
Progress {
  userId              : → User
  topicId             : → Topic
  subtopicId          : → Subtopic
  completedSubtopics  : [→ Subtopic]
  completedQuestions  : [→ Question]
  isInterviewProgress : Boolean
  role                : String (for interview progress)
  totalSessions       : Number
  averageScore        : Number
  improvementTrend    : [{ score, date }]
  completed           : Boolean
}
```

### 5.7 InterviewSession (AI Interviews)
```
InterviewSession {
  userId       : → User
  role         : enum [frontend, backend, fullstack, dsa]
  startTime    : Date
  endTime      : Date
  status       : enum [ongoing, completed, abandoned]
  overallScore : Number (0–10)
  feedback     : String
  questions    : [{
    question   : String
    userAnswer : String
    aiResponse : String (feedback text)
    score      : Number (1–10)
    timestamp  : Date
  }]
}
```

### 5.8 ChatHistory
```
ChatHistory {
  userId   : → User
  messages : [{
    sender    : enum [user, bot]
    text      : String
    timestamp : Date
  }]
}
```

### 5.9 Cheatsheet
```
Cheatsheet {
  language    : String (unique — javascript, python, etc.)
  title       : String
  description : String
  sections    : [{
    title : String
    items : [{
      concept     : String
      code        : String
      explanation : String
      tags        : [String]
      difficulty  : enum [beginner, intermediate, advanced]
    }]
  }]
}
```

---

## 6. API Design

**Base path**: `/api`
**Auth header**: `Authorization: Bearer <JWT>` or `Cookie: token=<JWT>`

### 6.1 Auth Routes `/api/auth`
| Method | Path             | Auth  | Description                          |
|--------|------------------|-------|--------------------------------------|
| POST   | `/register`      | —     | Register new user, send verify email |
| GET    | `/verify/:token` | —     | Email verification                   |
| POST   | `/login`         | —     | Login → returns JWT                  |
| GET    | `/me`            | User  | Get current user                     |
| POST   | `/logout`        | User  | Clear token cookie                   |

### 6.2 User Routes `/api/users`
| Method | Path                        | Auth | Description                  |
|--------|-----------------------------|------|------------------------------|
| GET    | `/profile/:id?`             | User | Get user profile + stats     |
| PUT    | `/profile`                  | User | Update profile fields        |
| POST   | `/upload-profile-picture`   | User | Upload profile picture       |
| PUT    | `/change-password`          | User | Change password              |
| GET    | `/progress/:id?`            | User | Get user progress summary    |
| POST   | `/revision/:questionId`     | User | Toggle revision question     |
| DELETE | `/account`                  | User | Delete account               |

### 6.3 Topics Routes `/api/topics`
| Method | Path                    | Auth  | Description                  |
|--------|-------------------------|-------|------------------------------|
| GET    | `/`                     | —     | Get all topics (with filters)|
| GET    | `/subtopics`            | —     | Get all subtopics            |
| GET    | `/categories`           | —     | Get topic categories         |
| GET    | `/:id`                  | —     | Get single topic             |
| GET    | `/:topicId/subtopics`   | —     | Get subtopics of a topic     |
| POST   | `/`                     | Admin | Create topic                 |
| PUT    | `/:id`                  | Admin | Update topic                 |
| DELETE | `/:id`                  | Admin | Delete topic + cascade       |
| GET    | `/subtopics/:id`        | —     | Get single subtopic          |
| POST   | `/subtopics`            | Admin | Create subtopic              |
| PUT    | `/subtopics/:id`        | Admin | Update subtopic              |
| DELETE | `/subtopics/:id`        | Admin | Delete subtopic + cascade    |

### 6.4 Questions Routes `/api/questions`
| Method | Path                    | Auth  | Description                  |
|--------|-------------------------|-------|------------------------------|
| GET    | `/`                     | —     | Get questions (filtered)     |
| GET    | `/all`                  | —     | Get all questions            |
| GET    | `/random`               | —     | Get random questions         |
| GET    | `/:id`                  | —     | Get single question          |
| POST   | `/`                     | Admin | Create question              |
| PUT    | `/:id`                  | Admin | Update question              |
| DELETE | `/:id`                  | Admin | Delete question              |
| POST   | `/:id/save`             | User  | Toggle save question         |
| GET    | `/saved`                | User  | Get saved questions          |
| POST   | `/:questionId/submit`   | User  | Submit answer                |

### 6.5 Blogs Routes `/api/blogs`
| Method | Path                    | Auth | Description                   |
|--------|-------------------------|------|-------------------------------|
| GET    | `/`                     | —    | Get published blogs           |
| GET    | `/:id`                  | —    | Get blog by ID/slug           |
| POST   | `/`                     | User | Create blog (image upload)    |
| PUT    | `/:id`                  | User | Update own blog               |
| DELETE | `/:id`                  | User | Delete own blog               |
| POST   | `/:id/toggle-like`      | User | Like / unlike blog            |
| POST   | `/:id/add-comment`      | User | Add comment                   |
| PUT    | `/:id/views`            | User | Increment view count          |
| GET    | `/:id/comments`         | User | Get comments for blog         |
| PUT    | `/editor/image`         | —    | Upload inline editor image    |

### 6.6 Articles Routes `/api/articles`
| Method | Path             | Auth  | Description                   |
|--------|------------------|-------|-------------------------------|
| GET    | `/`              | Admin | Get all articles              |
| POST   | `/`              | Admin | Create article                |
| GET    | `/:slug`         | —     | Get article by slug           |
| PUT    | `/:id`           | Admin | Update article                |
| DELETE | `/:id`           | Admin | Delete article                |
| PUT    | `/editor/image`  | Admin | Upload inline editor image    |

### 6.7 Progress Routes `/api/progress`
| Method | Path                          | Auth | Description                    |
|--------|-------------------------------|------|--------------------------------|
| POST   | `/`                           | User | Update learning progress       |
| GET    | `/get-interview-progress`     | User | Get interview progress         |
| GET    | `/:topicId`                   | User | Get progress for a topic       |
| GET    | `/:subtopicId/questions`      | User | Get progress for subtopic      |

### 6.8 Mock Interview Routes `/api/interview`
| Method | Path           | Auth | Description                        |
|--------|----------------|------|------------------------------------|
| POST   | `/start`       | User | Start session, get Q1 from Gemini  |
| POST   | `/answer`      | User | Submit answer, get feedback + next |
| POST   | `/complete`    | User | End session, get final feedback    |
| GET    | `/history`     | User | Get past interview sessions        |
| GET    | `/:sessionId`  | User | Get session detail                 |

### 6.9 AI Quiz Routes `/api/ai-quiz`
| Method | Path              | Auth | Description                    |
|--------|-------------------|------|--------------------------------|
| POST   | `/generate-quiz`  | User | Generate MC quiz from Gemini   |

### 6.10 Chatbot Routes `/api/chatbot`
| Method | Path    | Auth | Description                    |
|--------|---------|------|--------------------------------|
| POST   | `/chat` | User | Send message, get AI reply     |

### 6.11 Admin Routes `/api/admin`
| Method | Path                   | Auth  | Description                  |
|--------|------------------------|-------|------------------------------|
| GET    | `/dashboard`           | Admin | Dashboard stats              |
| GET    | `/users`               | Admin | Get all users                |
| PUT    | `/users/:id`           | Admin | Update user                  |
| DELETE | `/users/:id`           | Admin | Delete user                  |
| GET    | `/health`              | Admin | System health check          |
| GET    | `/analytics/progress`  | Admin | User progress analytics      |

### 6.12 Cheatsheets Routes `/api/cheatsheets`
| Method | Path               | Auth | Description                    |
|--------|--------------------|------|--------------------------------|
| GET    | `/languages`       | —    | List all available languages   |
| GET    | `/:language`       | —    | Get cheatsheet by language     |
| GET    | `/search/:query`   | —    | Search cheatsheets             |
| POST   | `/`                | —    | Create cheatsheet (seeding)    |
| PUT    | `/:language`       | —    | Update cheatsheet              |
| DELETE | `/:language`       | —    | Delete cheatsheet              |

---

## 7. Authentication & Authorization

### 7.1 Flow

```
Registration
  │
  ▼
POST /api/auth/register
  → Validate input
  → Hash password (bcrypt, 10 rounds)
  → Create User (isVerified: false, TTL 60s)
  → Send email verification link
  │
  ▼
GET /api/auth/verify/:token
  → Verify JWT token
  → Set isVerified: true (disables TTL index)
  │
  ▼
POST /api/auth/login
  → Check credentials
  → Verify isVerified: true
  → Generate JWT (1 minute OR 30 days based on remember-me)
  → Set httpOnly cookie + return token in response body
  │
  ▼
Client stores token
  → localStorage["token"]
  → document.cookie["token"]  (for Next.js Edge middleware)
  │
  ▼
All API requests
  → Authorization: Bearer <token>
  → OR Cookie: token=<token>
```

### 7.2 Middleware Stack

```
Request
  │
  ▼
auth.js
  → Read token from Authorization header OR req.cookies.token
  → jwt.verify(token, JWT_SECRET)
  → User.findById(decoded.id).select('-password')
  → Check isVerified: true
  → Attach req.user
  │
  ▼ (admin routes only)
adminAuth.js
  → Extends auth.js
  → Check req.user.role === 'admin'
  → 403 Forbidden if not admin
```

### 7.3 Next.js Edge Middleware

```
middleware.ts (runs at Edge before SSR)
  │
  ▼
PROTECTED: /dashboard, /learning, /practice, /mock-interview,
           /blog, /create-blog, /update-blog, /create-article,
           /articles, /cheatsheet, /ai-quiz, /admin

OPEN:      /login, /register
  │
  ▼
Logic:
  → Protected + no token  → redirect /login
  → Open route + token    → redirect /dashboard
  → Everything else       → pass through
```

---

## 8. AI Integration

### 8.1 Google Gemini Service (`aiService.js`)

```
generateQuestion(role, questionNumber)
  Input  : role (frontend | backend | fullstack | dsa), question number
  Output : plain text question string

evaluateAnswer(question, userAnswer, role)
  Input  : question, answer, role
  Output : { score: 1–10, feedback, tip, positives }

generateFinalFeedback(questions, role, overallScore)
  Input  : all Q&A pairs, role, average score
  Output : detailed text — strengths, improvements, next steps

generateMultipleQuestions(role, count)
  Input  : role, count (small delays between calls to avoid rate limits)
  Output : String[]

generateQuizQuestions(topic, subtopic, difficulty, count)
  Input  : topic, subtopic, difficulty, count
  Output : [{ question, options: {A,B,C,D}, correctAnswer, explanation }]
```

### 8.2 Mock Interview Session Flow

```
POST /interview/start
  → Gemini generates Q1
  → Create InterviewSession { status: ongoing }
  → Return { sessionId, question, questionNumber: 1, totalQuestions: 5 }
  │
  ▼
POST /interview/answer  (repeat × 5)
  → Gemini evaluates answer → { score, feedback, tip, positives }
  → Store in session.questions[]
  → If questionNumber < 5 → Gemini generates next question
  → If questionNumber = 5 → isComplete: true
  │
  ▼
POST /interview/complete
  → Calculate overallScore (avg of all scores)
  → Gemini generates finalFeedback
  → Update session { status: completed, overallScore, feedback }
  → user.stats.mockInterviews++
  → user.activity.latestInterviewSession = sessionId
```

### 8.3 AI Quiz Flow

```
POST /api/ai-quiz/generate-quiz
  Body: { topic, subtopic, difficulty, questionCount }
  │
  ▼
Gemini prompt → generate N multiple-choice questions
  │
  ▼
Response: [{
  question     : String,
  options      : { A, B, C, D },
  correctAnswer: 'A' | 'B' | 'C' | 'D',
  explanation  : String
}]
```

---

## 9. File Upload Flow

```
Client: FormData with image file
  │
  ▼
multer middleware (memory storage, 10MB limit)
  │
  ▼
Controller: uploadOnCloudinary(file.buffer)
  → Stream buffer to Cloudinary
  → Return { secure_url }
  │
  ▼
Store Cloudinary URL in MongoDB document
```

**Used for**: Blog featured images · User profile pictures · Article inline images · Blog editor inline images

---

## 10. State Management

### 10.1 Next.js Client (Redux Toolkit)

```
Redux Store
├── auth
│   ├── user       : User | null
│   ├── token      : string | null
│   ├── isLoggedIn : boolean
│   └── loading    : boolean
│   Actions: login, logout, setUser, setLoading, updateProfilePicture
│
├── topics
│   └── topics : Topic[]
│   Actions: setTopics
│
└── blogs
    ├── blogs     : Blog[]
    ├── blog      : Blog | null
    └── isLoading : boolean
    Actions: setBlogs, setBlog, toggleLike, addComment
```

**AppInitializer.tsx** (runs on every page load):
- GET `/api/auth/me` → dispatch setUser
- GET `/api/topics` → dispatch setTopics
- Sync localStorage token → cookie (for Edge middleware)

### 10.2 Admin Panel (React Context)

```
AppContext
├── State : topics[], subtopics[], questions[], user, token, loading, error
├── CRUD  : addTopic / updateTopic / deleteTopic
│           addSubtopic / updateSubtopic / deleteSubtopic
│           addQuestion / updateQuestion / deleteQuestion
└── Init  : fetchTopics + fetchSubtopics + fetchQuestions on mount
```

---

## 11. Frontend Routes (Next.js App Router)

| Route                           | Protection | Description              |
|---------------------------------|------------|--------------------------|
| `/`                             | Public     | Landing page             |
| `/login`                        | Open only  | Login form               |
| `/register`                     | Open only  | Register form            |
| `/dashboard`                    | Protected  | User dashboard           |
| `/learning`                     | Protected  | Learning hub             |
| `/practice`                     | Protected  | DSA/SQL practice         |
| `/mock-interview`               | Protected  | AI mock interview        |
| `/blog`                         | Protected  | Blog listing             |
| `/blog/[id]`                    | Protected  | Blog detail              |
| `/create-blog`                  | Protected  | Create blog              |
| `/update-blog/[id]`             | Protected  | Edit blog                |
| `/articles/[slug]`              | Protected  | Article detail           |
| `/create-article`               | Protected  | Create article (admin)   |
| `/cheatsheet`                   | Protected  | Code cheatsheets         |
| `/ai-quiz/[topic]/[subtopic]`   | Protected  | AI quiz                  |
| `/admin`                        | Protected  | Admin panel              |

---

## 12. Admin Panel Routes

| Route        | Page                | Operations                              |
|--------------|---------------------|-----------------------------------------|
| `/`          | Login               | Email + password login                  |
| `/dashboard` | Dashboard           | Stats, charts, quick actions            |
| `/topics`    | Topic Management    | Create / Read / Update / Delete topics  |
| `/subtopics` | Subtopic Management | Create / Read / Update / Delete         |
| `/questions` | Question Management | Create / Read / Update / Delete         |
| `/users`     | User Management     | View all users, delete user             |

---

## 13. Key Business Flows

### 13.1 Learning Hub

```
/learning loads
  → Topics from Redux (fetched at app init)
  → Filter: practiceTopics = false
  │
User selects Topic
  → GET /api/progress/:topicId → fetch completed subtopics
  → Display subtopics table + progress bar
  │
User clicks subtopic
  → Shows video, notes, handwritten PDFs, magicNotes (AI summary)
  │
User marks subtopic complete
  → POST /api/progress { topicId, subtopicId }
  → Progress bar updates · user.stats.modulesCompleted++
```

### 13.2 Practice

```
/practice loads
  → Topics from Redux
  → Filter: practiceTopics = true
  │
User selects topic → subtopic
  → GET /api/questions?subtopicId=:id
  → Display questions table
  │
User opens question
  → External links: LeetCode / GFG / HackerRank
  → Option: mark for revision (POST /api/users/revision/:questionId)
  → Option: submit answer (POST /api/questions/:id/submit)
```

### 13.3 Blog CRUD

```
CREATE
  User fills form (title, excerpt, content, image, category, tags)
  → POST /api/blogs (multipart/form-data)
  → Server: Cloudinary upload → save blog doc
  → Auto-generate slug · Auto-calculate readTime

READ
  GET /api/blogs           → published blog listing
  GET /api/blogs/:id       → detail with author + comments populated

UPDATE
  PUT /api/blogs/:id       → auth check (owner only)
  → New image? → Cloudinary upload → recalculate readTime

DELETE
  DELETE /api/blogs/:id    → auth check (owner only)

SOCIAL
  POST /:id/toggle-like    → add/remove user from likes[]
  POST /:id/add-comment    → push to comments[]
  PUT  /:id/views          → increment views counter
```

### 13.4 Mock Interview

```
User selects role (frontend | backend | fullstack | dsa)
  │
POST /interview/start
  → Gemini → Q1 generated
  → Session created (status: ongoing)
  │
User types answer → POST /interview/answer
  → Gemini evaluates → score 1–10, feedback, tip, positives
  → Next question generated (if < 5 total)
  → Repeat 5 times
  │
POST /interview/complete
  → Overall score calculated (average)
  → Gemini → final detailed feedback
  → Session marked completed
  → Stats updated on User doc
```

---

## 14. Component Architecture (client_next)

```
app/layout.tsx
├── <Providers>          → Redux store wrapper
├── <AppInitializer>     → GET /auth/me + /topics on mount
├── <Header>             → Nav bar (auth-aware)
├── {children}           → Page content
├── <ChatbotLoader>      → dynamic(InterviewChatbot, { ssr: false })
└── <Toaster>            → react-hot-toast

SSR-disabled (ssr: false):
  BlogEditor             → PrimeReact Quill (window-dependent)
  ArticleEditor          → Toast UI Editor (window-dependent)
  InterviewChatbot       → window-dependent

Shared components:
  LearningResourceTable  → Subtopics table + progress tracking
  PracticeResourceTable  → Questions table
  QuestionModule         → Single question with answer input
  RoleSelection          → Interview role picker
  InterviewSession       → Interview Q&A + feedback UI
  MagicNotes             → AI-generated notes viewer
  DeleteModal            → Reusable confirm dialog
  Button / Card / LoadingSpinner / ApplicationLoader
```

---

## 15. SEO Architecture (client_next)

| Route                        | Type    | Notes                                          |
|------------------------------|---------|------------------------------------------------|
| `/`                          | Static  | og:title, og:description, canonical            |
| `/blog`                      | Static  | Blog listing metadata                          |
| `/blog/[id]`                 | Dynamic | Fetches blog title/excerpt for og tags         |
| `/articles/[slug]`           | Dynamic | Fetches article for metadata                   |
| `/ai-quiz/[topic]/[subtopic]`| Dynamic | robots: noindex (ephemeral sessions)           |
| `/dashboard`, `/admin`       | Static  | robots: noindex, nofollow (private pages)      |
| `/robots.txt`                | Route   | Allows public, disallows /dashboard /admin     |
| `/sitemap.xml`               | Dynamic | Static routes + dynamic blog/article URLs      |

---

## 16. Security Design

| Concern           | Implementation                                                    |
|-------------------|-------------------------------------------------------------------|
| Password storage  | bcrypt (10 salt rounds)                                           |
| Token storage     | httpOnly cookie + localStorage (synced for Edge middleware)       |
| Token expiry      | 1 min (no remember-me) / 30 days (remember-me)                   |
| Email verify      | JWT token in link · unverified user TTL = 60s                     |
| Route protection  | Express auth middleware + Next.js Edge middleware                 |
| Admin routes      | adminAuth checks role === 'admin'                                 |
| CORS              | Restricted to explicit origins (env vars)                         |
| File uploads      | Multer memory storage (10MB limit) → streamed to Cloudinary      |
| Security headers  | Helmet middleware on Express                                      |
| Rate limiting     | Gemini 429 errors caught globally and surfaced to user            |

---

## 17. Error Handling

```
Express Global Error Handler (app.js)
  ├── 429 Gemini quota  → { success: false, message: "AI quota exceeded" }
  └── Generic 500       → { success: false, message: error.message }

Client (Next.js)
  → axios try-catch
  → react-hot-toast for user-facing notifications
  → /not-found.tsx for 404 routes
```

**API Response Format**:
```json
// Success
{ "success": true, "data": {}, "message": "..." }

// Error
{ "success": false, "message": "...", "error": "..." }
```

---

## 18. Deployment Architecture

```
                     ┌──────────────────────────────┐
                     │           Vercel              │
                     │  client_next → interviewready │
                     │  admin       → admin panel    │
                     └──────────────┬────────────────┘
                                    │ HTTPS REST
                                    ▼
                     ┌──────────────────────────────┐
                     │   Render.com / Vercel        │
                     │   server (Express) :5000     │
                     └────┬────────────────┬────────┘
                          │                │
               ┌──────────┘                └──────────────┐
               ▼                                          ▼
  ┌─────────────────────┐               ┌──────────────────────────┐
  │   MongoDB Atlas     │               │  External APIs           │
  │   (managed cloud)   │               │  · Google Gemini 2.5     │
  └─────────────────────┘               │  · Cloudinary            │
                                        │  · Gmail SMTP            │
                                        └──────────────────────────┘
```

**Environment Variables**:

| Service      | Variables                                                                  |
|--------------|----------------------------------------------------------------------------|
| server       | MONGO_URI, JWT_SECRET, GOOGLE_API_KEY, CLOUDINARY_*, FRONTEND_URL, ADMIN_URL, MAIL_USER, MAIL_PASS |
| client_next  | NEXT_PUBLIC_BACKEND_URL                                                    |
| admin        | VITE_BACKEND_URL                                                           |

---

## 19. Limitations & Known Constraints

| Area              | Constraint                                                        |
|-------------------|-------------------------------------------------------------------|
| AI rate limits    | Gemini free tier → 429 errors under heavy load                    |
| Email verify TTL  | Unverified users expire in 60s — very short window                |
| React 19 compat   | `@toast-ui/react-editor` requires React 17 → `legacy-peer-deps`  |
| No real-time      | No WebSockets — polling/manual refresh for chat and interview     |
| No pagination     | Topics, subtopics, questions loaded entirely upfront              |
| Admin auth        | Admin panel uses only localStorage token (no Edge middleware)     |
| No client caching | No SWR/React Query — each page fetch is fresh                     |

---

## 20. Summary

InterviewReady is a **3-tier MERN-stack monorepo** where:

- **Users** interact with `client_next` (Next.js 15) for learning, practice, mock interviews, AI quiz, blog, and chatbot
- **Admins** use `admin` (React + Vite) to manage topics, subtopics, questions, and users
- **Server** (Express) is the single REST API serving both, protected by JWT middleware with role-based access
- **AI** (Google Gemini 2.5-flash) powers mock interviews, AI quiz generation, and the chatbot
- **MongoDB** holds all data with Mongoose schemas and cascading deletes
- **Cloudinary** handles all media uploads via server-side streaming (no disk storage)