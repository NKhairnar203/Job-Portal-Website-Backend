import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const Connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Connected: ${Connect.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error(`MongoDB Error: ${error}`.bgRed.white);
  }
};


export default connectDB; 