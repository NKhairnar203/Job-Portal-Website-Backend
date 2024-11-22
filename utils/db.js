import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
          "mongodb+srv://nkhairnar543:owpq9KHjzs2Khnl3@cluster0.n28rl.mongodb.net/job-portal?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;