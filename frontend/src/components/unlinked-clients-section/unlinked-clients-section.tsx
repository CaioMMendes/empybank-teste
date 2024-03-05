//Libs
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { PiArrowCircleRight } from "react-icons/pi";

//Functions
import {
  GetUnlinkedDataResponse,
  getUnlinkedClient,
} from "@/fetch/client/get-unlinked-client";
import { LinkClientDataResponse, linkClient } from "@/fetch/client/link-client";
import {
  ErrorWithResponse,
  handleErrorResponse,
} from "@/fetch/handle-error-response";
import useSelectedAssistantStore from "@/stores/selected-assistant";
import { getIdByIndex } from "@/utils/get-ids-by-index";
import { getClientByIndex } from "@/utils/get-client-by-index";
import useNumberOfUnlinkedClientsChangedStore from "@/stores/number-unlinked-changed";
import { transformNumberToObject } from "@/utils/transform-number-to-object";
import useNumberOfLinkedClientsChangedStore from "@/stores/number-linked-changed";

//Components
import ClientRegister from "./client-register/client-register";
import { DataTable } from "../data-table";
import { toastError, toastSuccess } from "../toast";
import { Button } from "../ui/button";
import { columns } from "../columns-table";
import { Loading } from "../loading";

const UnlinkedClientsSection = () => {
  const abortControllerRef = useRef(new AbortController());
  const [rowSelection, setRowSelection] = useState({});
  const queryClient = useQueryClient();
  const { setNumberOfLinkedClientsChanged } =
    useNumberOfLinkedClientsChangedStore();
  const {
    numberOfUnlinkedClientsChanged,
    removeNumberOfUnlinkedClientsChanged,
  } = useNumberOfUnlinkedClientsChangedStore();
  const { selectedAssistant, linkSelectedAssistantClients } =
    useSelectedAssistantStore();
  const rowKeys = Object.keys(rowSelection);

  const {
    data: unlinkedClientsData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<GetUnlinkedDataResponse>({
    queryKey: ["getUnlinkedClients"],
    queryFn: () => getUnlinkedClient(),
  });

  const { mutate, isPending } = useMutation<
    LinkClientDataResponse,
    ErrorWithResponse,
    [string, string[]]
  >({
    mutationFn: ([assistantId, linkClients]) =>
      linkClient(assistantId, linkClients, abortControllerRef.current.signal),
    onSuccess: (data) => handleSuccessResponse(data?.data?.client.count),
    onError: (error) =>
      handleErrorResponse(
        error,
        "Ocorreu um erro ao tentar vincular o(s) cliente(s)",
      ),
  });

  useEffect(() => {
    const rowsSelected = transformNumberToObject(
      numberOfUnlinkedClientsChanged,
    );
    setRowSelection(rowsSelected);
    removeNumberOfUnlinkedClientsChanged();
    //eslint-disable-next-line
  }, [unlinkedClientsData]);

  function handleSuccessResponse(count: number | null | undefined) {
    if (count) {
      queryClient.invalidateQueries({ queryKey: ["getUnlinkedClients"] });
      const clients = getClientByIndex(
        rowKeys,
        unlinkedClientsData?.data.client,
      );
      setNumberOfLinkedClientsChanged(count);
      linkSelectedAssistantClients(clients);
      setRowSelection({});
      return toastSuccess(`${count} clientes vinculados com sucesso!`);
    }
  }

  const handleLinkClientClick = () => {
    if (selectedAssistant === null) {
      return toastError("Selecione um assistente comercial");
    }
    if (rowKeys.length === 0) {
      return toastError("Selecione os clientes a serem vinculados");
    }
    const clientIds = getIdByIndex(rowKeys, unlinkedClientsData?.data.client);
    if (clientIds.length > 0) {
      mutate([selectedAssistant.id, clientIds]);
    }
  };

  return (
    <div className="flex max-h-[49.3125rem] min-h-[49.3125rem] flex-col gap-4 overflow-hidden rounded-[1.125rem] bg-layout-surface p-6">
      {/* header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-4">
          <h2 className="flex flex-nowrap truncate">
            Clientes (Não vinculados)
          </h2>
          <span className="flex flex-nowrap items-center justify-center rounded-full px-3 text-sm text-primary ring-1 ring-interactive-secondary">
            {rowKeys.length || 0}
            {" / "}
            {unlinkedClientsData?.data.client.length || 0}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 ">
          <ClientRegister />
          <Button
            variant={"secondary"}
            className="flex items-center"
            onClick={handleLinkClientClick}
            disabled={isPending}
          >
            Vincular <PiArrowCircleRight size={15} />
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex h-full w-full items-start justify-center p-5">
          <Loading className="flex size-10 " />
        </div>
      )}

      {isError && (
        <h2 className="flex items-center text-base text-red-500">
          Ocorreu um erro ao tentar encontrar os clientes não vinculados
        </h2>
      )}
      {isSuccess && (
        <DataTable
          columns={columns}
          data={unlinkedClientsData.data.client}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      )}
    </div>
  );
};

export default UnlinkedClientsSection;
