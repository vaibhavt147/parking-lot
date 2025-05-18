import { Application } from "express";
import app from "./app";
import mongoose from "./database/mongoose";
import { config } from "./config";

export class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = app;
    this.port = config.port;
  }

  private async connectToDatabase(): Promise<void> {
    await mongoose.connect();
    console.log("Connected to MongoDB");
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public async start(): Promise<void> {
    await this.connectToDatabase();
    this.listen();
  }
}
