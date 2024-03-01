//Libs
import dotenv from "dotenv";
import express from "express";
const cors = require("cors");

//Components
import { corsOptions } from "./config/cors-options";
import { clientRouter } from "./routes/client-route";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.use("/api/v1", clientRouter);

//error handler

export { app };
