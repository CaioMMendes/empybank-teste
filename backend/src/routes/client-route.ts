import express from "express";
import { createClientController } from "../controller/client/create-client-controller";
const clientRouter = express.Router();

clientRouter.route("/client").get(createClientController);

export { clientRouter };
