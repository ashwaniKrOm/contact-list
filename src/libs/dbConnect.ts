import mongoose from "mongoose"

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB URI is not defined in environment variables");
}
export const dbConnect = async ()=>{
    try {
        await mongoose.connect(uri);
        console.log("db connected successfully");
    } catch (error) {
        console.log("Error in DB connection",error);
    }
} 