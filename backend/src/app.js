import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/error.middlewares.js";
import requestIp from "request-ip";
import morganMiddleware from "./logger/morgan.logger.js";
import { initializeSocketIO } from "./socket/index.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(requestIp.mw());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(morganMiddleware);

// api routes
import { errorHandler } from "./middlewares/error.middlewares.js";

import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";

app.use("/api/v1/users", userRouter);
app.use("api/v1/chat-app/chats", chatRouter);
app.use("api/v1/chat-app/messages", messageRouter);

initializeSocketIO(io);

// common error handling middleware
app.use(errorHandler);

export { httpServer };
