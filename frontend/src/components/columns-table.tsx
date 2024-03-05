import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";

export type Payment = {
  code: string;
  name: string;
  network: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex w-[1.125rem] items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: () => <div className="w-16"> Código</div>,
    cell: ({ row }) => (
      <div className="flex w-full flex-1 capitalize">
        {row.getValue("code")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex w-full flex-1 items-center justify-start ">
        Parceiro
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-full flex-1 capitalize">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "network",
    header: () => <div className="w-16">Rede</div>,
    cell: ({ row }) => (
      <div className="flex w-full flex-1 text-right capitalize">
        {row.getValue("network")}
      </div>
    ),
  },
];
