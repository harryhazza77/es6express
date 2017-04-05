import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import appRouter from "./app/appRouter";
import apiRouter from "./api/apiRouter";
import config from "./shared/config/config";

const server = express();

server.set("layout", "shared/layout");
server.set("trust proxy", true);
server.set("views", path.join(__dirname, "app/views"));
server.set("view engine", "ejs");

server.use(bodyParser.json({ strict: false }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(expressLayouts);
server.use(helmet());
server.use(morgan("dev"));
server.use("/api", apiRouter);
server.use("/", appRouter);

export const run = () => {
    const port = config.get("PORT");
    server.listen(port);
    console.log(`listening on port ${port}`); //eslint-disable-line no-console
};

export default server;
