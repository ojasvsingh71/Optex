import express from "express"
import dotenv from "dotenv"
import AIrouter from "./routes/ai.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors"

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", AIrouter);

app.get("/", (req, res) => {
    res.send("API running!!!");
})

app.listen(process.env.PORT, () => {
    console.log(`\nSever is running on http://localhost:${process.env.PORT}\n`);
})