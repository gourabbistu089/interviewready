const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const auth = require("../middleware/auth");
const { generalChatPrompt } = require("../services/promptTemplates.js");
const ChatHistory = require("../models/ChatHistory.js");

const router = express.Router();

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

router.post("/chat", auth, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or create chat history for user
    let chat = await ChatHistory.findOne({ userId });

    if (!chat) {
      chat = await ChatHistory.create({
        userId,
        messages: []
      });
    }

    // Add user message
    chat.messages.push({
      sender: "user",
      text: message
    });

    // AI reply
    const prompt = generalChatPrompt({ message });
    console.log("prompt",prompt)
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt
    });
    console.log("Result",result)
    const botReply = result.text;

    // Add bot message
    chat.messages.push({
      sender: "bot",
      text: botReply
    });

    await chat.save();

    return res.json({
      reply: botReply,
      chatId: chat._id,
      messages: chat.messages,
    });

  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Failed to generate response" });
  }
});


module.exports = router;
