import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
