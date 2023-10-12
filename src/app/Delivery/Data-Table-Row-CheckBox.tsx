"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, Row } from "@tanstack/react-table";
import OrderDeliveryStore from "@/lib/zustand/DeliveryPage-store/Orders-store";

export interface DataCheckBox<TData> {
  table?: Table<TData & any>;
  row?: Row<TData & any>;
  field: any;
}

export function DataTableRowCheckBox<TData>({
  table,
  row,
  field,
}: DataCheckBox<TData>) {
  const {
    clearOrder,
    insertOrderItem,
    removeOrderItemById,
    insertOneItem,
    resetCheckBox,
  } = OrderDeliveryStore();

  return (
    <>
      <Checkbox
        checked={
          resetCheckBox === true
            ? false
            : table
            ? table.getIsAllPageRowsSelected()
            : row
            ? row.getIsSelected()
            : false
        }
        onCheckedChange={(value: any) => {
          if (table) {
            if (resetCheckBox) return table.toggleAllPageRowsSelected(false);

            table.toggleAllPageRowsSelected(!!value);
            const item = table?.options.data.map((d) => {
              return { id: d._id };
            });

            if (value === true) insertOrderItem(field, item);
            if (value === false) clearOrder(field);
          }

          if (row) {
            if (resetCheckBox) return row.toggleSelected(false);

            row.toggleSelected(!!value);
            const item = {
              id: row.original._id,
            };

            if (value === true) insertOneItem(field, item);
            if (value === false) removeOrderItemById(field, item.id);
          }
        }}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    </>
  );
}
