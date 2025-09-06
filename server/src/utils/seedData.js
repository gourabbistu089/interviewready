const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const User = require('../models/Subtopic');
const Topic = require('../models/Topic');
const Question = require('../models/Question');
const Blog = require('../models/Blog');
const { MockInterview } = require('../models/MockInterview');
const connectDB = require('../config/database');

// Load environment variables
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Topic.deleteMany({});
    await Question.deleteMany({});
    await Blog.deleteMany({});
    await MockInterview.deleteMany({});

    console.log('Existing data cleared');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@interview-ready.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });

    console.log('Admin user created');

    // Create sample topics
    const topics = [
      {
        title: 'JavaScript Fundamentals',
        description: 'Core concepts of JavaScript programming language',
        category: 'Programming Languages',
        difficulty: 'Beginner',
        estimatedTime: 60,
        icon: 'javascript',
        color: '#F7DF1E',
        order: 1,
        tags: ['javascript', 'programming', 'fundamentals'],
        createdBy: adminUser._id
      },
      {
        title: 'React Development',
        description: 'Building user interfaces with React',
        category: 'Web Development',
        difficulty: 'Intermediate',
        estimatedTime: 90,
        icon: 'react',
        color: '#61DAFB',
        order: 2,
        tags: ['react', 'frontend', 'components'],
        createdBy: adminUser._id
      },
      {
        title: 'Data Structures',
        description: 'Arrays, linked lists, trees, and graphs',
        category: 'Data Structures',
        difficulty: 'Intermediate',
        estimatedTime: 120,
        icon: 'database',
        color: '#FF6B6B',
        order: 3,
        tags: ['data-structures', 'algorithms', 'computer-science'],
        createdBy: adminUser._id
      },
      {
        title: 'System Design',
        description: 'Designing scalable systems and architectures',
        category: 'System Design',
        difficulty: 'Advanced',
        estimatedTime: 150,
        icon: 'system',
        color: '#4ECDC4',
        order: 4,
        tags: ['system-design', 'architecture', 'scalability'],
        createdBy: adminUser._id
      }
    ];

    const createdTopics = await Topic.insertMany(topics);
    console.log('Sample topics created');

    // Create sample questions
    const questions = [
      {
        title: 'What is hoisting in JavaScript?',
        description: 'Explain the concept of hoisting in JavaScript with examples.',
        type: 'essay',
        difficulty: 'Medium',
        category: 'JavaScript',
        topicId: createdTopics[0]._id,
        explanation: 'Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during compilation.',
        hints: ['Think about variable declarations', 'Consider function declarations vs expressions'],
        tags: ['hoisting', 'javascript', 'variables'],
        timeLimit: 15,
        points: 15,
        createdBy: adminUser._id
      },
      {
        title: 'React State Management',
        description: 'How do you manage state in React applications?',
        type: 'essay',
        difficulty: 'Medium',
        category: 'React',
        topicId: createdTopics[1]._id,
        explanation: 'State in React can be managed using useState hook, useReducer, Context API, or external libraries like Redux.',
        hints: ['Consider local vs global state', 'Think about React hooks'],
        tags: ['react', 'state', 'hooks'],
        timeLimit: 20,
        points: 20,
        createdBy: adminUser._id
      },
      {
        title: 'Binary Search Implementation',
        description: 'Implement binary search algorithm in JavaScript.',
        type: 'coding',
        difficulty: 'Medium',
        category: 'Algorithms',
        topicId: createdTopics[2]._id,
        explanation: 'Binary search is an efficient algorithm for finding an item from a sorted list of items.',
        code: {
          starterCode: `function binarySearch(arr, target) {
  // Your implementation here
}`,
          solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
          language: 'javascript',
          testCases: [
            {
              input: '[1, 2, 3, 4, 5], 3',
              expectedOutput: '2',
              explanation: 'Element 3 is at index 2'
            }
          ]
        },
        tags: ['binary-search', 'algorithms', 'searching'],
        timeLimit: 30,
        points: 25,
        createdBy: adminUser._id
      }
    ];

    const createdQuestions = await Question.insertMany(questions);
    console.log('Sample questions created');

    // Create sample blogs
    const blogs = [
      {
        title: 'How to Ace Your Technical Interview',
        excerpt: 'Essential tips and strategies for succeeding in technical interviews.',
        content: `# How to Ace Your Technical Interview

Technical interviews can be challenging, but with the right preparation and mindset, you can succeed. Here are some essential tips:

## 1. Practice Coding Problems Daily
- Start with easy problems and gradually increase difficulty
- Focus on understanding patterns and algorithms
- Practice on platforms like LeetCode, HackerRank, or CodeSignal

## 2. Master the Fundamentals
- Data structures (arrays, linked lists, trees, graphs)
- Algorithms (sorting, searching, dynamic programming)
- Time and space complexity analysis

## 3. Communication is Key
- Think out loud during problem-solving
- Ask clarifying questions
- Explain your approach before coding

## 4. System Design Preparation
- Understand scalability concepts
- Learn about distributed systems
- Practice designing real-world systems

## 5. Mock Interviews
- Practice with friends or use online platforms
- Get comfortable with the interview format
- Learn from feedback

Remember, interviews are not just about getting the right answer—they're about demonstrating your problem-solving process and communication skills.`,
        author: adminUser._id,
        category: 'Interview Tips',
        tags: ['interview', 'technical', 'preparation', 'coding'],
        status: 'published',
        readTime: 5,
        featuredImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
      },
      {
        title: 'Understanding JavaScript Closures',
        excerpt: 'A deep dive into one of JavaScript\'s most powerful and confusing features.',
        content: `# Understanding JavaScript Closures

Closures are one of JavaScript's most powerful features, yet they often confuse developers. Let's break them down step by step.

## What is a Closure?

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

## Example

\`\`\`javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
\`\`\`

In this example, \`innerFunction\` has access to the \`x\` parameter even after \`outerFunction\` has finished executing.

## Common Use Cases

1. **Data Privacy**: Creating private variables
2. **Function Factories**: Creating specialized functions
3. **Event Handlers**: Maintaining state in callbacks
4. **Module Pattern**: Encapsulating code

## Best Practices

- Be mindful of memory leaks
- Use closures for data encapsulation
- Understand the scope chain
- Practice with real examples

Closures are fundamental to JavaScript and understanding them will make you a better developer.`,
        author: adminUser._id,
        category: 'Technical Insights',
        tags: ['javascript', 'closures', 'scope', 'functions'],
        status: 'published',
        readTime: 7,
        featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg'
      }
    ];

    const createdBlogs = await Blog.insertMany(blogs);
    console.log('Sample blogs created');

    // Create sample mock interview
    const mockInterview = await MockInterview.create({
      title: 'JavaScript Developer Interview',
      description: 'Comprehensive JavaScript interview covering fundamentals, ES6+, and practical problems.',
      type: 'technical',
      difficulty: 'Intermediate',
      duration: 60,
      questions: [
        {
          question: createdQuestions[0]._id,
          order: 1,
          timeAllocated: 15
        },
        {
          question: createdQuestions[1]._id,
          order: 2,
          timeAllocated: 20
        },
        {
          question: createdQuestions[2]._id,
          order: 3,
          timeAllocated: 25
        }
      ],
      instructions: 'This is a comprehensive JavaScript interview. Take your time to think through each question and explain your reasoning.',
      topics: [createdTopics[0]._id, createdTopics[1]._id],
      createdBy: adminUser._id
    });

    console.log('Sample mock interview created');

    console.log('✅ Seed data created successfully!');
    console.log('🔑 Admin credentials:');
    console.log('   Email: admin@interview-ready.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed function
// seedData();
