const { GoogleGenAI } = require("@google/genai");

const express = require('express');
const auth = require("../middleware/auth");

const router = express.Router();

const  genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Quiz generation endpoint
router.post('/generate-quiz', auth, async (req, res) => {
  try {
    const { topic, subtopic, difficulty = "easy", questionCount = 10 } = req.body;

    // Validate input
    if (!topic || !subtopic) {
      return res.status(400).json({ 
        error: 'Topic and subtopic are required' 
      });
    }

    // Create detailed prompt for Gemini
    const prompt = `
Generate ${questionCount} multiple-choice questions for an interview preparation platform.

Topic: ${topic}
Subtopic: ${subtopic}
Difficulty: ${difficulty}

Requirements:
1. Each question should be interview-relevant and practical
2. Include 4 options (A, B, C, D) with only one correct answer
3. Provide brief explanations for the correct answers
4. Questions should test both theoretical knowledge and practical application
5. Vary difficulty within the ${difficulty} level

Format the response as a JSON array with this structure:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": {
      "A": "Option A text",
      "B": "Option B text", 
      "C": "Option C text",
      "D": "Option D text"
    },
    "correctAnswer": "A",
    "explanation": "Brief explanation of why this is correct",
    "difficulty": "${difficulty}"
  }
]

Generate questions now:`;

    // Call Gemini API
       const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
      });
    let text = response.text;

    // Clean and parse the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      console.log("text", text);
    let questions;
    try {
    //   questions = text;
       questions = JSON.parse(text);   // <-- parse string into array
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Failed to parse generated questions');
    }

    // Validate question structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid question format received');
    }

    // Add metadata
    const quizData = {
      topic,
      subtopic,
      difficulty,
      generatedAt: new Date().toISOString(),
      questions: questions.map((q, index) => ({
        ...q,
        id: index + 1
      }))
    };

    res.json(quizData);

  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: error.message 
    });
  }
});

module.exports = router;