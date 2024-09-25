const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Session = require("../models/Session");
const User = require("../models/User");
const generateQuestion = require("../utils/generateQuestion");

const upload = multer();

// Start a new session
router.post("/start", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const session = new Session({ user: user._id });
    const question = await generateQuestion("initial");
    session.interactions.push({
      question: question,
      answer: null,
    });
    await session.save();

    res.status(201).send({
      sessionId: session._id,
      question: question,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Chat with the bot
router.post("/chat", upload.none(), async (req, res) => {
  try {
    const { sessionId, answer } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).send("Session not found");
    }

    // Save the user's answer if provided
    if (answer) {
      session.interactions[session.interactions.length - 1].answer = answer;

      // Generate the next question based on the context of previous interactions
      const context = session.interactions
        .map((interaction) => `Q: ${interaction.question} A: ${interaction.answer}`)
        .join("\n");
      const nextQuestion = await generateQuestion(context);

      // Save the next question with a null answer to indicate waiting for user's response
      session.interactions.push({
        question: nextQuestion,
        answer: null,
      });

      await session.save();

      res.status(200).send({
        sessionId: session._id,
        question: nextQuestion,
      });
    } else {
      res.status(400).send("Answer is required");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get sessions by userId
router.get("/sessions/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const sessions = await Session.find({ user: userId });
    if (!sessions || sessions.length === 0) {
      return res.status(404).send("No sessions found for this user");
    }
    res.status(200).send(sessions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single session by sessionId
router.get("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Validate sessionId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).send("Invalid session ID");
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).send("Session not found");
    }
    res.status(200).send(session);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a session by sessionId
router.delete("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Validate sessionId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).send("Invalid session ID");
    }

    const session = await Session.findByIdAndDelete(sessionId);
    if (!session) {
      return res.status(404).send("Session not found");
    }
    res.status(200).send({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
