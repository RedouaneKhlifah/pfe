import mongoose from "mongoose";
import getDotenv from "../utils/dotenv";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(getDotenv("MONGO_URI"));
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error: any) {
        console.log(error.message);
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
