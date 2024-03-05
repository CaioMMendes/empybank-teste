//Libs
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
const cors = require("cors");

//Errors
import globalErrorHandler from "./middleware/error-handling";
import AppError from "./utils/appError";

//Components
import { corsOptions } from "./config/cors-options";
import { clientRouter } from "./routes/client-route";
import { assistantRouter } from "./routes/assistant-route";

dotenv.config();

const version = "/api/v1";

const app = express();

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.use(version, clientRouter);
app.use(version, assistantRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//error handler
app.use(globalErrorHandler);

export { app };
