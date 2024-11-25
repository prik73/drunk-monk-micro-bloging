import express from 'express';
import path from "path";
const router = express.Router();
import OpenAI from "openai";
import dotenv from 'dotenv';


dotenv.config();
console.log("Loaded API Key:", process.env.OPENAI_API_KEY ? "Exists" : "Missing");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required for analysis." });
    }

    try {
        // Send the text to OpenAI's API for nuanced hate speech detection
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use gpt-4 if available for better performance
            messages: [
                {
                    role: "system",
                    content: `You are an AI designed to evaluate text for hate speech, abusive, or offensive content. 
                              Your analysis must account for nuances like language, intent, phrasing, sarcasm, and absurdity. 
                              Avoid flagging expressions of personal preference, satire, or harmless absurdity unless there is clear intent to harm, offend, or demean.`
                },
                {
                    role: "user",
                    content: `Analyze the following text: "${text}". 
                              Based on its context, intent, and phrasing, determine if it qualifies as hate speech, abusive, or offensive language. 
                              Respond with a JSON object:
                              - If the text is abusive, hateful, or harmful: { "flag": -1, "flaggedWords": ["word1", "word2"], "reason": "Explain why this is harmful." }.
                              - If the text is neutral, harmless, or absurd: { "flag": 0, "flaggedWords": [], "reason": "Explain why this is neutral or harmless." }.`
                },
            ],
            max_tokens: 150,
        });

        // Parse OpenAI's response
        const response = JSON.parse(completion.choices[0].message.content.trim());

        // Return the result to the frontend
        res.status(200).json(response);
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ error: "Failed to analyze text. Please try again later." });
    }
});

export default router;
