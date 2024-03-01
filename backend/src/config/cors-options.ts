import { allowedOrigins } from "./allowed-origins";

export const corsOptions = {
  origin: allowedOrigins,
  optionsSucessStatus: 200,
  credentials: true,
};
