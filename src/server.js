
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views")
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
      secret: "Hello!",
      resave: false,
      saveUninitialized: false, // 새로운 세션이 있는데 수정된 적이 없으면 초기화 되지 않은거임
      store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/cheotube" }),
    })
  );


app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
