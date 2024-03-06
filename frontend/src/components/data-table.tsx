import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { InputIconContainer, InputWithIcon } from "./ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection: RowSelectionState | undefined;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowSelection,
  setRowSelection,
}: DataTableProps<TData, TValue>) {
  //   const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* search */}
      <InputIconContainer Icon={PiMagnifyingGlass}>
        <InputWithIcon
          placeholder="Buscar"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </InputIconContainer>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="  border-layout-surface !bg-layout-surface py-0 [&:has([role=checkbox])]:justify-center "
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="flex items-center gap-3  p-0 py-0 text-content-base [&:has([role=checkbox])]:justify-center  [&>*:nth-child(1)]:w-[1.125rem]  [&>*:nth-child(2)]:w-16 [&>*:nth-child(3)]:flex-1 [&>*:nth-child(4)]:w-16   "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="flex w-full flex-1 items-center !justify-start "
              >
                Não foi encontrado nenhum cliente.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
