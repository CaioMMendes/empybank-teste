//Libs
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";

//Functions
import {
  GetAllDataResponse,
  getAllAssistant,
} from "@/fetch/assistant/get-all-assistant";
import {
  GetUniqueDataResponse,
  getUniqueAssistant,
} from "@/fetch/assistant/get-unique-assistant";
import { handleErrorResponse } from "@/fetch/handle-error-response";
import useSelectedAssistantStore from "@/stores/selected-assistant";

//Components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ErrorWithResponse = {
  response: {
    data: {
      message: string;
    };
  };
} & Error;

const AssistantSelect = () => {
  const abortControllerRef = useRef(new AbortController());
  const { setSelectedAssistant } = useSelectedAssistantStore();

  const {
    data: assistantData,
    isLoading,
    isError,
  } = useQuery<GetAllDataResponse>({
    queryKey: ["getAllAssistant"],
    queryFn: () => getAllAssistant(),
  });

  const {
    mutate,
    isPending,
    isError: mutateIsError,
  } = useMutation<GetUniqueDataResponse, ErrorWithResponse, string>({
    mutationFn: (assistantId) =>
      getUniqueAssistant(assistantId, abortControllerRef.current.signal),
    onSuccess: (data) => handleSuccessResponse(data),
    onError: (error) =>
      handleErrorResponse(
        error,
        "Ocorreu um erro ao tentar encontrar os dados do assistente",
      ),
  });

  const handleSelectChange = (assistantId: string) => {
    mutate(assistantId);
  };

  function handleSuccessResponse(data: GetUniqueDataResponse) {
    const assistantWithClients = data?.data?.assistant ?? null;
    setSelectedAssistant(assistantWithClients);
  }

  return (
    <div className="flex w-full max-w-96 flex-col gap-1">
      <Select
        name="Select Commercial Assistant"
        defaultValue={undefined}
        onValueChange={handleSelectChange}
        disabled={isLoading || isError || isPending}
      >
        <SelectTrigger
          className="w-full flex-nowrap truncate rounded-xl p-3 text-base capitalize leading-none"
          name="Trigger Commercial Assistant"
        >
          <SelectValue placeholder={`Selecionar`} />
        </SelectTrigger>
        <SelectContent
          ref={(ref) => {
            if (!ref) return;
            ref.ontouchstart = (e) => {
              e.preventDefault();
            };
          }}
        >
          <SelectGroup className="max-h-80 ">
            {assistantData?.data?.assistant.map((assistant) => {
              return (
                <SelectItem
                  value={assistant.id}
                  key={assistant.id}
                  className="capitalize"
                >
                  {assistant.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isError && (
        <span className="text-sm text-red-500">
          Ocorreu um erro ao buscar os assistentes.
        </span>
      )}
      {mutateIsError && (
        <span className="text-sm text-red-500">
          Ocorreu um erro ao buscar os dados do assistente.
        </span>
      )}
    </div>
  );
};

export default AssistantSelect;
