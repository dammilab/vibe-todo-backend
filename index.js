require("dotenv").config();
if (!process.env.DYNO) {
  const dns = require("dns");
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRouter = require("./routers/todos");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-backend/todo";
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "null"
];
const corsOptions = {
  origin(origin, callback) {
    // Allow local file frontend (Origin: null) and common local dev ports.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS origin not allowed"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/", todoRouter);

app.get("/", (req, res) => {
  res.send("Todo backend server is running");
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("몽고디비 연결 성공했습니다."))
  .catch((error) => console.error("MongoDB 연결 실패:", error.message));
