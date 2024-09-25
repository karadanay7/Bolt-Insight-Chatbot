const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateQuestion(context) {
  const messages = [
    {
      role: "system",
      content:
        "You're an expert life coach. Introduce yourself to the user as an AI life coach. You will have a conversation with the user to find the best career path for them. You will ask one question, then the user will answer. You will have a conversation like this until you ask 10 questions. After that, you will generate the best career path for the user. Only ask questions, do not provide answers.",
    },
    {
      role: "user",
      content: context,
    },
  ];

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  return response.choices[0].message.content.trim();
}

module.exports = generateQuestion;
