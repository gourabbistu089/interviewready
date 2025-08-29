// backend/services/aiService.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

class AIInterviewService {
  constructor() {
    this.rolePrompts = {
      frontend: `
You are an interviewer. Ask **one easy-to-intermediate question** about React, JavaScript, CSS, HTML, or state management.
Use clear, simple language suitable for a mid-level candidate.
Do not include any explanations or notes — only return the question text.
`,

      backend: `
You are an interviewer. Ask **one easy-to-intermediate question** about Node.js, Express, databases, APIs, or security.
Use plain language and return **only the question**.
Do not include any explanation or comment after the question.
`,

      fullstack: `
You are an interviewer. Ask **one easy-to-intermediate question** about frontend-backend integration or full-stack project logic.
Use straightforward language and return **only the question**.
Do not include a reason or explanation after the question.
`,

      dsa: `
You are an interviewer. Ask **one easy-to-intermediate data structures and algorithms question** (like arrays, strings, linked lists).
Use simple language and return **only the question text**.
Do not include any notes, explanations, or comments after the question.
`,
    };
  }

  async generateQuestion(role, questionNumber = 1) {
    try {
      const prompt = `${this.rolePrompts[role]}

      Generate one easy-to-moderate level interview question for a ${role} developer.
Avoid advanced topics. Focus only on common real-world tasks or fundamentals.
Use short and simple wording. Do not use buzzwords or theoretical terms.
Return only the question text.
      
      Requirements:
      - Clear and specific question
      - Not too easy, not too hard
      - Practical and relevant to real work
      - Should allow for detailed answers
      
      Return only the question, no additional text.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
        config: {
          maxOutputTokens: 200,
          temperature: 0.7,
        },
      });
      // console.log("response in generateQuestion", response);

      return response.text;
    } catch (error) {
      console.error("Error generating question:", error);
      throw new Error("Failed to generate question");
    }
  }

  async evaluateAnswer(question, userAnswer, role) {
    try {
      const prompt = `You are evaluating a ${role} developer's interview answer.
      
      Question: "${question}"
      Candidate's Answer: "${userAnswer}"
      
      Evaluate this answer and provide:
      1. Score from 1-10 (be realistic, not too generous)
      2. Constructive feedback (2-3 sentences)
      3. One specific improvement tip
      4. What was good about the answer (if anything)
      
      Scoring criteria:
      - Technical accuracy (40%)
      - Completeness (30%)
      - Clarity of explanation (20%)
      - Best practices mentioned (10%)
      
      Respond in valid JSON format:
      {
        "score": number,
        "feedback": "string",
        "tip": "string",
        "positives": "string"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
        config: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });

      const responseText = response.text;
      // console.log("responseText", responseText);

      // Clean up the response to ensure it's valid JSON
      const cleanedResponse = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      console.log("cleanedResponse", cleanedResponse);
      try {
        const evaluationResult = JSON.parse(cleanedResponse);
        return evaluationResult;
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        // Fallback response if JSON parsing fails
        return {
          score: 5,
          feedback:
            "Unable to properly evaluate the answer due to parsing error.",
          tip: "Please provide more detailed technical explanations.",
          positives: "Thank you for attempting the question.",
        };
      }
    } catch (error) {
      console.error("Error evaluating answer:", error);
      throw new Error("Failed to evaluate answer");
    }
  }

  async generateFinalFeedback(questions, role, overallScore) {
    try {
      const questionsText = questions
        .map(
          (q, i) =>
            `Q${i + 1}: ${q.question}\nA: ${q.userAnswer}\nScore: ${q.score}/10`
        )
        .join("\n\n");

      const prompt = `You are an AI interview coach. Based on the following interview results for a ${role} developer, generate a professional and friendly final feedback summary.

Overall Score: ${overallScore}/10

Questions and Answers:
${questionsText}

Please provide the feedback in plain text only (no markdown, no bullets). Structure it clearly with numbered sections:

1. Overall Assessment (2-3 short sentences)
2. Key Strengths Identified
3. Areas for Improvement
4. Recommended Next Steps

Make the tone supportive, constructive, and easy to read. Avoid using complex language or formatting. Keep everything in plain, readable paragraphs.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
        config: {
          maxOutputTokens: 300,
          temperature: 0.5,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Error generating final feedback:", error);
      return "Thank you for completing the interview. Keep practicing and improving your skills!";
    }
  }

  // Additional helper method for streaming responses
  async generateQuestionStream(role, questionNumber = 1) {
    try {
      const prompt = `${this.rolePrompts[role]}
      
      Generate interview question #${questionNumber} for a ${role} developer position.
      Make it appropriate for a mid-level developer (2-4 years experience).
      
      Requirements:
      - Clear and specific question
      - Not too easy, not too hard
      - Practical and relevant to real work
      - Should allow for detailed answers
      
      Return only the question, no additional text.`;

      const response = await ai.models.generateContentStream({
        model: "gemini-2.0-flash-001",
        contents: prompt,
        config: {
          maxOutputTokens: 200,
          temperature: 0.7,
        },
      });

      let fullResponse = "";
      for await (const chunk of response) {
        fullResponse += chunk.text;
      }

      return fullResponse;
    } catch (error) {
      console.error("Error generating question stream:", error);
      throw new Error("Failed to generate question stream");
    }
  }

  // Method to generate multiple questions at once
  async generateMultipleQuestions(role, count = 5) {
    try {
      const questions = [];
      for (let i = 1; i <= count; i++) {
        const question = await this.generateQuestion(role, i);
        questions.push({
          id: i,
          question: question,
          role: role,
        });

        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return questions;
    } catch (error) {
      console.error("Error generating multiple questions:", error);
      throw new Error("Failed to generate multiple questions");
    }
  }

  // Method to get model info
  getModelInfo() {
    return {
      provider: "Google",
      model: "gemini-2.0-flash-001",
      sdk: "@google/genai",
      capabilities: [
        "text-generation",
        "streaming",
        "function-calling",
        "multimodal",
      ],
      maxTokens: 8192,
      features: ["gemini-2.0", "unified-api", "vertex-ai-support"],
    };
  }

  // Method to use different model
  async generateWithModel(modelName, prompt, config = {}) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          ...config,
        },
      });

      return response.text;
    } catch (error) {
      console.error(`Error with model ${modelName}:`, error);
      throw new Error(`Failed to generate content with model ${modelName}`);
    }
  }
}

module.exports = new AIInterviewService();
