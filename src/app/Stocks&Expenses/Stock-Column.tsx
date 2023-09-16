"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../typings";
import { DataTableRowActions } from "../Customer/data-table-row-action";
import { DataTableNameColumn } from "@/components/react-table/Data-Table-Name-Column";

export const StockColumns: ColumnDef<any>[] = [
  {
    header: "Item",
    accessorKey: "fullname",
  },
  {
    header: "Type",
    accessorKey: "Alias",
  },
  {
    header: "In",
    accessorKey: "Alias",
  },
  {
    header: "Out",
    accessorKey: "Alias",
  },
  {
    header: "OnHand",
    accessorKey: "Alias",
  },
  {
    header: "Worth",
    accessorKey: "Alias",
  },

  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
