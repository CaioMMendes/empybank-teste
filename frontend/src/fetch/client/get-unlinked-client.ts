import { z } from "zod";
import fetchFunction from "../fetch-function";
import { clientFormSchema } from "@/components/client-register/types/client-form-schema";

type ClientFormData = z.infer<typeof clientFormSchema>;

export type GetUnlinkedClientResponse = {
  id: string;
  createdAt: Date;
  assistantId: null;
} & ClientFormData;

export type GetUnlinkedDataResponse = {
  data: {
    client: GetUnlinkedClientResponse[];
  };
};

export const getUnlinkedClient = async () => {
  const response: GetUnlinkedDataResponse = await fetchFunction({
    url: "/client/get",
  });
  return response;
};
