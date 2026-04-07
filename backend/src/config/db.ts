  import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        const mongoURI = process.env.MONGO_URI
        if(!mongoURI) { 
            throw new Error("MONGO_URI not defined in the environment")
        }
        await mongoose.connect(mongoURI)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("Error connecting to MOngoDB", error)
        process.exit(1) // exit with failure
    }
}