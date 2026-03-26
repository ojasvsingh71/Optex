import express from "express"
import dotenv from "dotenv"
import AIrouter from "./routes/ai.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2003;

app.use(express.json());
app.use(cors());

app.use("/", AIrouter);

app.get("/", (req, res) => {
    res.send("API running!!!");
})

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`\nServer is running on http://localhost:${PORT}\n`);
        });
    } catch (error) {
        console.error("Startup failed:", error.message);
        process.exit(1);
    }
}

startServer();