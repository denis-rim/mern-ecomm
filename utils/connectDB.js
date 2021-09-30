import mongoose from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    // Use existing DB connection
    console.log("Using existing connection");
    return;
  }
  // Use ne database connection
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
