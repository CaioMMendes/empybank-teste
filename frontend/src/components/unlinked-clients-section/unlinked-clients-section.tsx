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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { PiArrowCircleRight } from "react-icons/pi";
import ClientRegister from "./client-register/client-register";
import { DataTable } from "../data-table";
import { toastError, toastSuccess } from "../toast";
import { Button } from "../ui/button";
import { columns } from "../columns-table";

const UnlinkedClientsSection = () => {
  const abortControllerRef = useRef(new AbortController());
  const { selectedAssistant } = useSelectedAssistantStore();
  const [rowSelection, setRowSelection] = useState({});
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

  //   useEffect(() => {
  //     if (isSuccess) {
  //       // console.log(unlinkedClientsData);
  //       console.log(
  //         searchClient(debounceSearch, unlinkedClientsData.data.client),
  //       );
  //     }
  //     //eslint-disable-next-line
  //   }, [debounceSearch]);

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
        "Ocorreu um erro ao tentar vincular os clientes",
      ),
  });

  function handleSuccessResponse(count: number | null | undefined) {
    if (count) {
      return toastSuccess(`${count} clientes vinculados com sucesso`);
    }
  }
  //   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     setSearchInput(e.target.value);
  //   };

  const handleLinkClientClick = () => {
    console.log(selectedAssistant);
    if (selectedAssistant === null) {
      return toastError("Selecione um assistente comercial");
    }
    mutate([
      selectedAssistant.id,
      [
        "618a65cd-aecd-4552-a60f-e795fc67fa8a",
        "36fb09cf-efb6-4598-99e8-4652a7f5d6ca",
      ],
    ]);
  };

  return (
    <div className="flex h-full min-h-[49.375rem] flex-col gap-4 rounded-[1.125rem] bg-layout-surface p-6">
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

      {/* search
      <InputIconContainer Icon={PiMagnifyingGlass}>
        <InputWithIcon
          placeholder="Buscar"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </InputIconContainer> */}
      {isSuccess && (
        <DataTable
          columns={columns}
          data={unlinkedClientsData.data.client}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          //   setGlobalFilter={setSearchInput}
          //   globalFilter={debounceSearch}
        />
      )}
    </div>
  );
};

export default UnlinkedClientsSection;
