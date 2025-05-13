import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "./database/mongoose";

const PORT = process.env.PORT;

async function main() {
  try {
    await mongoose.connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const start = main();

module.exports = start;
