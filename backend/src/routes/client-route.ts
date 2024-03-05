import express from "express";

import { createClientController } from "../controller/client/create-client-controller";
import { getUnlinkedClientController } from "../controller/client/get-unlinked-client-controller";
import { linkClientController } from "../controller/client/link-client-controller";
import { unlinkClientController } from "../controller/client/unlink-client-controller";

const clientRouter = express.Router();

clientRouter.route("/client/create").post(createClientController);
clientRouter.route("/client/get").get(getUnlinkedClientController);
clientRouter.route("/client/link/:id").patch(linkClientController);
clientRouter.route("/client/unlink").patch(unlinkClientController);

export { clientRouter };
