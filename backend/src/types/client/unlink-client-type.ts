import { z } from "zod";

export const unlinkClientBody = z.array(
  z.string({ invalid_type_error: "O valor precisa ser uma string" }).trim()
);
