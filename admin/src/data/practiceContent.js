import { 
  Search, 
  Code, 
  Database, 
  FileText, 
  Filter,
  Star,
  CheckCircle,
  Clock,
  Play,
  Youtube,
  PenTool,
  ExternalLink,
  Bookmark,
  Building2,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Target,
  Award,
  Zap,
  Brain,
  Settings,
  BookOpen,
  List,
  TreePine,
  Network,
  Hash,
  Layers,
  GitBranch,
  Search as SearchIcon,
  ArrowRight
} from 'lucide-react';
export const practiceContent = {
    'dsa': {
      title: 'Data Structures & Algorithms',
      description: 'Master coding interview questions with comprehensive DSA problems from top companies',
      totalQuestions: 850,
      solved: 234,
      sections: {
        'arrays': {
          title: 'Arrays',
          icon: List,
          description: 'Array manipulation, searching, and sorting problems',
          count: 125,
          solved: 45,
          difficulty: { easy: 40, medium: 60, hard: 25 },
          questions: [
            {
              id: 1,
              title: 'Two Sum',
              difficulty: 'Easy',
              companies: ['Google', 'Amazon', 'Microsoft', 'Apple'],
              status: 'solved',
              bookmarked: true,
              frequency: 'Very High',
              acceptance: '49.8%',
              topics: ['Array', 'Hash Table'],
              resources: {
                youtube: 'https://youtube.com/watch?v=two-sum',
                blog: 'https://blog.example.com/two-sum',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/two-sum'
              }
            },
            {
              id: 2,
              title: 'Best Time to Buy and Sell Stock',
              difficulty: 'Easy',
              companies: ['Amazon', 'Google', 'Microsoft'],
              status: 'solved',
              bookmarked: true,
              frequency: 'High',
              acceptance: '54.1%',
              topics: ['Array', 'Dynamic Programming'],
              resources: {
                youtube: 'https://youtube.com/watch?v=stock-buy-sell',
                blog: 'https://blog.example.com/stock-buy-sell',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock'
              }
            },
            {
              id: 3,
              title: 'Container With Most Water',
              difficulty: 'Medium',
              companies: ['Amazon', 'Google', 'Apple'],
              status: 'attempted',
              bookmarked: false,
              frequency: 'Medium',
              acceptance: '54.5%',
              topics: ['Array', 'Two Pointers'],
              resources: {
                youtube: 'https://youtube.com/watch?v=container-water',
                blog: 'https://blog.example.com/container-water',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/container-with-most-water'
              }
            },
            {
              id: 4,
              title: 'Maximum Subarray',
              difficulty: 'Medium',
              companies: ['Microsoft', 'Amazon', 'Google'],
              status: 'not-started',
              bookmarked: false,
              frequency: 'High',
              acceptance: '47.1%',
              topics: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
              resources: {
                youtube: 'https://youtube.com/watch?v=max-subarray',
                blog: 'https://blog.example.com/max-subarray',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/maximum-subarray'
              }
            },
            {
              id: 5,
              title: 'Merge Intervals',
              difficulty: 'Medium',
              companies: ['Google', 'Facebook', 'Microsoft'],
              status: 'not-started',
              bookmarked: true,
              frequency: 'High',
              acceptance: '44.8%',
              topics: ['Array', 'Sorting'],
              resources: {
                youtube: 'https://youtube.com/watch?v=merge-intervals',
                blog: 'https://blog.example.com/merge-intervals',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/merge-intervals'
              }
            }
          ]
        },
        'strings': {
          title: 'Strings',
          icon: FileText,
          description: 'String manipulation and pattern matching problems',
          count: 89,
          solved: 23,
          difficulty: { easy: 25, medium: 45, hard: 19 },
          questions: [
            {
              id: 6,
              title: 'Longest Substring Without Repeating Characters',
              difficulty: 'Medium',
              companies: ['Amazon', 'Google', 'Microsoft'],
              status: 'solved',
              bookmarked: true,
              frequency: 'Very High',
              acceptance: '33.8%',
              topics: ['String', 'Hash Table', 'Sliding Window'],
              resources: {
                youtube: 'https://youtube.com/watch?v=longest-substring',
                blog: 'https://blog.example.com/longest-substring',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters'
              }
            },
            {
              id: 7,
              title: 'Valid Palindrome',
              difficulty: 'Easy',
              companies: ['Facebook', 'Amazon', 'Microsoft'],
              status: 'solved',
              bookmarked: false,
              frequency: 'Medium',
              acceptance: '44.7%',
              topics: ['String', 'Two Pointers'],
              resources: {
                youtube: 'https://youtube.com/watch?v=valid-palindrome',
                blog: 'https://blog.example.com/valid-palindrome',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/valid-palindrome'
              }
            },
            {
              id: 8,
              title: 'Group Anagrams',
              difficulty: 'Medium',
              companies: ['Amazon', 'Google', 'Uber'],
              status: 'not-started',
              bookmarked: false,
              frequency: 'Medium',
              acceptance: '67.3%',
              topics: ['String', 'Hash Table', 'Sorting'],
              resources: {
                youtube: 'https://youtube.com/watch?v=group-anagrams',
                blog: 'https://blog.example.com/group-anagrams',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/group-anagrams'
              }
            }
          ]
        },
        'linked-lists': {
          title: 'Linked Lists',
          icon: GitBranch,
          description: 'Linked list operations and manipulations',
          count: 78,
          solved: 34,
          difficulty: { easy: 20, medium: 40, hard: 18 },
          questions: [
            {
              id: 9,
              title: 'Reverse Linked List',
              difficulty: 'Easy',
              companies: ['Google', 'Amazon', 'Microsoft'],
              status: 'solved',
              bookmarked: true,
              frequency: 'Very High',
              acceptance: '70.3%',
              topics: ['Linked List', 'Recursion'],
              resources: {
                youtube: 'https://youtube.com/watch?v=reverse-linked-list',
                blog: 'https://blog.example.com/reverse-linked-list',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/reverse-linked-list'
              }
            },
            {
              id: 10,
              title: 'Merge Two Sorted Lists',
              difficulty: 'Easy',
              companies: ['Amazon', 'Google', 'Microsoft'],
              status: 'solved',
              bookmarked: false,
              frequency: 'High',
              acceptance: '59.3%',
              topics: ['Linked List', 'Recursion'],
              resources: {
                youtube: 'https://youtube.com/watch?v=merge-sorted-lists',
                blog: 'https://blog.example.com/merge-sorted-lists',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/merge-two-sorted-lists'
              }
            }
          ]
        },
        'trees': {
          title: 'Trees',
          icon: TreePine,
          description: 'Binary trees, BST, and tree traversal problems',
          count: 145,
          solved: 67,
          difficulty: { easy: 30, medium: 80, hard: 35 },
          questions: [
            {
              id: 11,
              title: 'Maximum Depth of Binary Tree',
              difficulty: 'Easy',
              companies: ['Google', 'Amazon', 'Microsoft'],
              status: 'solved',
              bookmarked: false,
              frequency: 'High',
              acceptance: '73.2%',
              topics: ['Tree', 'DFS', 'BFS'],
              resources: {
                youtube: 'https://youtube.com/watch?v=max-depth-tree',
                blog: 'https://blog.example.com/max-depth-tree',
                notes: 'available',
                leetcode: 'https://leetcode.com/problems/maximum-depth-of-binary-tree'
              }
            },
            {
              id: 12,
              title: 'Binary Tree Inorder Traversal',
              difficulty: 'Easy',
              companies: ['Microsoft', 'Amazon', 'Google'],
              status: 'solved',
              bookmarked: true,
              frequency: 'High',
              acceptance: '70.5%',
              topics: ['Tree', 'DFS', 'Stack'],
              resources: {
                youtube: 'https://youtube.com/watch?v=inorder-traversal',
                blog: 'https://blog.example.com/inorder-traversal',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/binary-tree-inorder-traversal'
              }
            }
          ]
        },
        'graphs': {
          title: 'Graphs',
          icon: Network,
          description: 'Graph algorithms, DFS, BFS, and shortest path problems',
          count: 98,
          solved: 25,
          difficulty: { easy: 15, medium: 50, hard: 33 },
          questions: [
            {
              id: 13,
              title: 'Number of Islands',
              difficulty: 'Medium',
              companies: ['Amazon', 'Google', 'Microsoft'],
              status: 'attempted',
              bookmarked: true,
              frequency: 'High',
              acceptance: '56.8%',
              topics: ['Graph', 'DFS', 'BFS'],
              resources: {
                youtube: 'https://youtube.com/watch?v=number-of-islands',
                blog: 'https://blog.example.com/number-of-islands',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/number-of-islands'
              }
            }
          ]
        },
        'dynamic-programming': {
          title: 'Dynamic Programming',
          icon: Zap,
          description: 'DP problems including memoization and tabulation',
          count: 112,
          solved: 31,
          difficulty: { easy: 15, medium: 60, hard: 37 },
          questions: [
            {
              id: 14,
              title: 'Climbing Stairs',
              difficulty: 'Easy',
              companies: ['Amazon', 'Google', 'Adobe'],
              status: 'solved',
              bookmarked: false,
              frequency: 'High',
              acceptance: '48.7%',
              topics: ['Dynamic Programming', 'Math'],
              resources: {
                youtube: 'https://youtube.com/watch?v=climbing-stairs',
                blog: 'https://blog.example.com/climbing-stairs',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/climbing-stairs'
              }
            }
          ]
        }
      }
    },
    'sql': {
      title: 'SQL Questions',
      description: 'Practice SQL queries and database problems from technical interviews',
      totalQuestions: 320,
      solved: 89,
      sections: {
        'basic-queries': {
          title: 'Basic Queries',
          icon: Database,
          description: 'SELECT, WHERE, ORDER BY, and basic SQL operations',
          count: 85,
          solved: 45,
          difficulty: { easy: 50, medium: 30, hard: 5 },
          questions: [
            {
              id: 15,
              title: 'Combine Two Tables',
              difficulty: 'Easy',
              companies: ['Amazon', 'Google', 'Microsoft'],
              status: 'solved',
              bookmarked: true,
              frequency: 'Medium',
              acceptance: '66.4%',
              topics: ['JOIN', 'LEFT JOIN'],
              resources: {
                youtube: 'https://youtube.com/watch?v=combine-tables',
                blog: 'https://blog.example.com/combine-tables',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/combine-two-tables'
              }
            }
          ]
        },
        'joins': {
          title: 'Joins & Relationships',
          icon: GitBranch,
          description: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, and complex relationships',
          count: 92,
          solved: 28,
          difficulty: { easy: 30, medium: 50, hard: 12 },
          questions: [
            {
              id: 16,
              title: 'Employees Earning More Than Their Managers',
              difficulty: 'Easy',
              companies: ['Facebook', 'Amazon', 'Google'],
              status: 'attempted',
              bookmarked: false,
              frequency: 'Medium',
              acceptance: '57.3%',
              topics: ['JOIN', 'Self Join'],
              resources: {
                youtube: 'https://youtube.com/watch?v=employees-managers',
                blog: 'https://blog.example.com/employees-managers',
                notes: 'Available',
                leetcode: 'https://leetcode.com/problems/employees-earning-more-than-their-managers'
              }
            }
          ]
        }
      }
    },
    'programming': {
      title: 'Programming Questions',
      description: 'Language-specific programming challenges and coding problems',
      totalQuestions: 450,
      solved: 156,
      sections: {
        'java-basics': {
          title: 'Java Programming',
          icon: Code,
          description: 'Object-oriented programming concepts and Java-specific problems',
          count: 125,
          solved: 67,
          difficulty: { easy: 40, medium: 60, hard: 25 },
          questions: [
            {
              id: 17,
              title: 'Implement ArrayList',
              difficulty: 'Medium',
              companies: ['Oracle', 'Amazon', 'Google'],
              status: 'solved',
              bookmarked: true,
              frequency: 'Medium',
              acceptance: '45.8%',
              topics: ['OOP', 'Collections', 'Generics'],
              resources: {
                youtube: 'https://youtube.com/watch?v=implement-arraylist',
                blog: 'https://blog.example.com/implement-arraylist',
                notes: 'Available',
                github: 'https://github.com/example/implement-arraylist'
              }
            }
          ]
        },
        'python-basics': {
          title: 'Python Programming',
          icon: Code,
          description: 'Python-specific concepts, decorators, and advanced features',
          count: 108,
          solved: 45,
          difficulty: { easy: 35, medium: 50, hard: 23 },
          questions: [
            {
              id: 18,
              title: 'Custom Decorator Implementation',
              difficulty: 'Hard',
              companies: ['Google', 'Netflix', 'Uber'],
              status: 'not-started',
              bookmarked: false,
              frequency: 'Low',
              acceptance: '32.4%',
              topics: ['Decorators', 'Functional Programming'],
              resources: {
                youtube: 'https://youtube.com/watch?v=custom-decorator',
                blog: 'https://blog.example.com/custom-decorator',
                notes: 'Available',
                github: 'https://github.com/example/custom-decorator'
              }
            }
          ]
        }
      }
    },
    'system-design': {
      title: 'System Design',
      description: 'System design concepts and architecture problems',
      totalQuestions: 120,
      solved: 34,
      sections: {
        'system-design-basics': {
          title: 'System Design Basics',
          icon: Settings,
          description: 'Scalability, load balancing, and system architecture',
          count: 60,
          solved: 20,
          difficulty: { easy: 10, medium: 30, hard: 20 },
          questions: [
            {
              id: 19,
              title: 'Design a URL Shortener',
              difficulty: 'Medium',
              companies: ['Google', 'Facebook', 'Amazon'],
              status: 'attempted',
              bookmarked: true,
              frequency: 'High',
              acceptance: '45.2%',
              topics: ['System Design', 'Database', 'Scalability'],
              resources: {
                youtube: 'https://youtube.com/watch?v=url-shortener',
                blog: 'https://blog.example.com/url-shortener',
                notes: 'Available',
                github: 'https://github.com/example/url-shortener'
              }
            }
          ]
        }
      }
    }
  };
