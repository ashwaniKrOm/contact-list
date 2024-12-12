import mongoose from "mongoose"

export const dbConnect = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://honey02112001:zLE9Lxjw0L4C9lV1@clustercontactlist.13wss.mongodb.net/contactListDB?retryWrites=true&w=majority&appName=ClusterContactList");
        console.log("db connected successfully");
    } catch (error) {
        console.log("Error in DB connection",error);
    }
} 