import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Define validation schema
const envSchema = z.object({
  PORT: z.string().default("8080"),
  MONGO_URI: z.string().url({ message: "MONGO_URI must be a valid URL" }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// Validate and parse
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:\n", parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

// Final, type-safe config object
export const config = {
  port: parseInt(env.PORT, 10),
  mongoUri: env.MONGO_URI,
  nodeEnv: env.NODE_ENV,
};
