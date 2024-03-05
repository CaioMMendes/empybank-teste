import {
  UnlinkClientDataResponse,
  unlinkClient,
} from "@/fetch/client/unlink-client";
import {
  ErrorWithResponse,
  handleErrorResponse,
} from "@/fetch/handle-error-response";
import { useDebounce } from "@/hooks/use-debounce";
import useSelectedAssistantStore from "@/stores/selected-assistant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PiArrowCircleLeft, PiMagnifyingGlass } from "react-icons/pi";
import { toastSuccess } from "../toast";
import { Button } from "../ui/button";
import { InputIconContainer, InputWithIcon } from "../ui/input";
import { DataTable } from "../data-table";
import { columns } from "../columns-table";

type ClientType = {
  id: string;
  code: string;
  name: string;
  network: string;
  createdAt: Date;
};

export type ClientDataType = {
  status: string;
  message: string;
  data:
    | {
        client: ClientType[];
      }
    | undefined;
};

const AssistantClientsSection = () => {
  const abortControllerRef = useRef(new AbortController());
  const [searchInput, setSearchInput] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const rowKeys = Object.keys(rowSelection);
  const queryClient = useQueryClient();
  const debounceSearch = useDebounce(searchInput);
  const { selectedAssistant } = useSelectedAssistantStore();
  useEffect(() => {
    // if (isSuccess) {
    // console.log(unlinkedClientsData);
    // console.log(searchClient(debounceSearch, unlinkedClientsData.data.client));
    // }
    //eslint-disable-next-line
  }, [debounceSearch]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const { mutate, isPending } = useMutation<
    UnlinkClientDataResponse,
    ErrorWithResponse,
    string[]
  >({
    mutationFn: (unlinkClients) =>
      unlinkClient(unlinkClients, abortControllerRef.current.signal),
    onSuccess: (data) => handleSuccessResponse(data?.data?.client.count),
    onError: (error) =>
      handleErrorResponse(
        error,
        "Ocorreu um erro ao tentar desvincular os clientes",
      ),
  });

  function handleSuccessResponse(count: number | null | undefined) {
    if (count) {
      const newClients = [
        {
          id: `${Date.now()}`,
          name: "dasdas",
          code: "dasdas",
          network: "dasdas",
          createdAt: "dasdas",
        },
      ];

      queryClient.setQueryData(
        ["getUnlinkedClients"],
        (oldUnlinkedClients: ClientDataType) => {
          const oldAssistantData = oldUnlinkedClients?.data?.client;

          if (newClients && oldAssistantData !== undefined) {
            const newData = [...newClients, ...oldAssistantData];
            //   newData.sort((a, b) => a.name.localeCompare(b.name));
            console.log(newData);
            return {
              ...oldUnlinkedClients,
              data: { ...oldUnlinkedClients.data, client: newData },
            };
          }
          return oldUnlinkedClients;
        },
      );

      return toastSuccess(`${count} clientes desvinculados com sucesso`);
    }
  }

  const handleUnlinkClients = () => {
    mutate([
      "618a65cd-aecd-4552-a60f-e795fc67fa8a",
      "36fb09cf-efb6-4598-99e8-4652a7f5d6ca",
    ]);
  };
  console.log(selectedAssistant);

  return (
    <div className="bg- flex flex-col gap-4 rounded-[1.125rem] bg-layout-surface p-6">
      {/* header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 ">
          <h2>
            {selectedAssistant?.name ? (
              <>
                Carteira do(a){" "}
                <span className="capitalize">{selectedAssistant?.name}</span>
              </>
            ) : (
              "Selecione um assistente"
            )}
          </h2>
          <span className="flex flex-nowrap items-center justify-center rounded-full px-3 text-sm text-primary ring-1 ring-interactive-secondary">
            {rowKeys?.length || 0}
            {" / "}
            {selectedAssistant?.Client.length || 0}
          </span>
        </div>
        <div className="flex w-fit items-center gap-2">
          <Button
            variant={"destructive"}
            className="rounded-lg leading-[150%] "
            onClick={handleUnlinkClients}
            disabled={isPending}
          >
            Desvincular
            <PiArrowCircleLeft size={15} />{" "}
          </Button>
        </div>
      </div>
      {/* search
      <InputIconContainer Icon={PiMagnifyingGlass}>
        <InputWithIcon
          placeholder="Buscar"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </InputIconContainer>
      {selectedAssistant &&
        selectedAssistant?.Client.map((client) => {
          return <p key={client.id}>{client.name}</p>;
        })} */}

      {selectedAssistant?.Client && (
        <DataTable
          columns={columns}
          data={selectedAssistant?.Client}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      )}
    </div>
  );
};

export default AssistantClientsSection;
