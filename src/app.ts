import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200);
  res.set("Server is running on desired port");
  res.send();
});

export default app;
