import mongoose from "mongoose";
import { config } from "../config";

class MongooseConnection {
  private static instance: MongooseConnection;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongooseConnection();
    }
    return this.instance;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(config.mongoUri);
      console.info("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error", error);
      process.exit(1);
    }
  }
}

export default MongooseConnection.getInstance();
