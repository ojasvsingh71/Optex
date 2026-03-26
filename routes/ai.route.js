import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express"
import user from "../models/prompt.model.js"
import assistantPrompt from "./ai.prompt.js";

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_APP_NAME || "Optex"
    }
})

const chat = async (req, res) => {
    const { messages } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({
            error: "Missing OPENROUTER_API_KEY"
        });
    }

    await user.create({ prompt: messages.map(m => m.content).join("\n") });
    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: assistantPrompt },
                ...messages
            ]
        })

        const reply = completion.choices[0].message.content;
        res.json({
            reply
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to get response :("
        });
    }
}

const router = express.Router();

router.post("/chat", chat);

export default router;