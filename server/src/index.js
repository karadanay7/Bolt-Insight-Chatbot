require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatbotRoutes = require("./routes/chatbot");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGODB_URI; // Replace with your MongoDB connection string

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/chatbot", chatbotRoutes);

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    seedData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

async function seedData() {
  try {
    const user = await User.findById("user123");
    if (!user) {
      const newUser = new User({
        _id: "user123",
        name: "John Doe", // Example field
        email: "john.doe@example.com", // Example field
      });

      console.log("Seeding user:", newUser);

      await newUser.save();
      console.log("User seeded successfully");
    } else {
      console.log("User already exists");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
