import { OpenAI } from "openai/client.js";
import dotenv from "dotenv";
import express from "express"
import user from "../models/prompt.model.js"
import assistantPrompt from "./ai.prompt.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.AI_KEY })

const chat = async (req, res) => {
    const { messages } = req.body;

    await user.create({ prompt: messages.map(m => m.content).join("\n") });
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
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