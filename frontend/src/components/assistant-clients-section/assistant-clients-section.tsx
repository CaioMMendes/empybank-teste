// Libs
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PiArrowCircleLeft } from "react-icons/pi";

//Functions
import {
  ErrorWithResponse,
  handleErrorResponse,
} from "@/fetch/handle-error-response";
import {
  UnlinkClientDataResponse,
  unlinkClient,
} from "@/fetch/client/unlink-client";
import useNumberOfLinkedClientsChangedStore from "@/stores/number-linked-changed";
import useNumberOfUnlinkedClientsChangedStore from "@/stores/number-unlinked-changed";
import useSelectedAssistantStore from "@/stores/selected-assistant";
import { getClientByIndex } from "@/utils/get-client-by-index";
import { getIdByIndex } from "@/utils/get-ids-by-index";
import { transformNumberToObject } from "@/utils/transform-number-to-object";

//Components
import { columns } from "../columns-table";
import { DataTable } from "../data-table";
import { toastError, toastSuccess } from "../toast";
import { Button } from "../ui/button";

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
  const queryClient = useQueryClient();
  const [rowSelection, setRowSelection] = useState({});
  const { numberOfLinkedClientsChanged, removeNumberOfLinkedClientsChanged } =
    useNumberOfLinkedClientsChangedStore();
  const { setNumberOfUnlinkedClientsChanged } =
    useNumberOfUnlinkedClientsChangedStore();
  const { selectedAssistant, unlinkSelectedAssistantClients } =
    useSelectedAssistantStore();
  const rowKeys = Object.keys(rowSelection);

  useEffect(() => {
    const rowsSelected = transformNumberToObject(numberOfLinkedClientsChanged);
    setRowSelection(rowsSelected);
    removeNumberOfLinkedClientsChanged();
    //eslint-disable-next-line
  }, [selectedAssistant]);

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
        "Ocorreu um erro ao tentar desvincular o(s) cliente(s)",
      ),
  });

  function handleSuccessResponse(count: number | null | undefined) {
    if (count) {
      const clients = getClientByIndex(rowKeys, selectedAssistant?.Client);
      const ids = getIdByIndex(rowKeys, selectedAssistant?.Client);
      unlinkSelectedAssistantClients(ids);
      setNumberOfUnlinkedClientsChanged(count);
      queryClient.setQueryData(
        ["getUnlinkedClients"],
        (oldUnlinkedClients: ClientDataType) => {
          const oldAssistantData = oldUnlinkedClients?.data?.client;

          if (clients && oldAssistantData !== undefined) {
            const newData = [...clients, ...oldAssistantData];
            return {
              ...oldUnlinkedClients,
              data: { ...oldUnlinkedClients.data, client: newData },
            };
          }

          return oldUnlinkedClients;
        },
      );

      setRowSelection({});
      return toastSuccess(`${count} cliente(s) desvinculado(s) com sucesso!`);
    }
  }

  const handleUnlinkClients = () => {
    if (rowKeys.length === 0) {
      return toastError("Selecione os clientes a serem desvinculados.");
    }
    const clientIds = getIdByIndex(rowKeys, selectedAssistant?.Client);
    mutate(clientIds);
  };

  return (
    <div className="flex max-h-[49.3125rem] min-h-[49.3125rem] flex-col gap-4 overflow-hidden rounded-[1.125rem] bg-layout-surface p-6">
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
              "Selecione um assistente comercial"
            )}
          </h2>
          {selectedAssistant?.Client && (
            <span className="flex flex-nowrap items-center justify-center rounded-full px-3 text-sm text-primary ring-1 ring-interactive-secondary">
              {rowKeys?.length || 0}
              {" / "}
              {selectedAssistant?.Client.length || 0}
            </span>
          )}
        </div>

        {selectedAssistant?.Client && (
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
        )}
      </div>

      {/* Tabela */}
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
