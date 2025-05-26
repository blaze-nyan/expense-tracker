import mongoose from "mongoose";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
if (!url) {
  throw new Error("Define the MONGODB_URI in .env");
}

export async function connect() {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      bufferCommands: false, // Disable mongoose buffering
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb is successfully connected ✅");
    });
    connection.on("error", (err) => {
      console.log("There is an error⚠️: " + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
