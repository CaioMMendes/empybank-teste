import express from "express";
import { createAssistantController } from "../controller/assistant/create-assistant-controller";
import { getAllAssistantController } from "../controller/assistant/get-all-assistant-controller";
import { getUniqueAssistantController } from "../controller/assistant/get-unique-assistant-controller";

const assistantRouter = express.Router();

assistantRouter.route("/assistant/create").post(createAssistantController);
assistantRouter.route("/assistant/get/:id").get(getUniqueAssistantController);
assistantRouter.route("/assistant/get").get(getAllAssistantController);

export { assistantRouter };
