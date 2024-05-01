import { log } from "console";
import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const connectDB = async (): Promise<void> => {
  if (connection.isConnected) {
    log("Already connected to DB...");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;

    log("Database connected... ", db.connection.host);
  } catch (error) {
    log("DB connection error... ", error);
    process.exit(1);
  }
};

export default connectDB;
