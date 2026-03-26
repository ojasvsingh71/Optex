import mongoose from "mongoose";

export default async function connectDB() {
    const databaseUri = process.env.DATABASE;

    if (!databaseUri) {
        throw new Error("Missing DATABASE environment variable");
    }

    try {
        await mongoose.connect(databaseUri, {
            serverSelectionTimeoutMS: 10000
        });
        console.log("\nConnected to database!!!\n");
    } catch (error) {
        console.error("\nMongoDB connection failed.\n");
        console.error("Check DATABASE in Render Environment settings.");
        console.error("Expected format: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority");
        throw error;
    }
}