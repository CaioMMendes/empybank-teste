import { z } from "zod";

export const linkClientBody = z.array(
  z.string({ invalid_type_error: "O valor precisa ser uma string" }).trim()
);
