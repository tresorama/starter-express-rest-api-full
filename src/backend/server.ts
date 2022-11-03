import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import devErrorhandler from "errorhandler";
import { loggerPlain } from "@/middlewares/logger-plain.middleware";
import { notFound } from "@/middlewares/not-found.middleware";
import { clientErrorHandler } from "@/middlewares/client-error-handler.middleware";
import { router as userRouter } from "@/domains/user/user.router";
import { router as postRouter } from '@/domains/post/post.router';
import { IS_DEVELOPMENT } from '@/constants';

const app = express();

app.use(helmet());
app.use(cors());
app.use(loggerPlain("--------------------"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve('../')));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.get("/", (req, res) => {
  res.send("Hello from homepage!");
});

app.use(notFound);

if (IS_DEVELOPMENT) {
  app.use(devErrorhandler());
} else {
  app.use(clientErrorHandler);
}

export default app;
