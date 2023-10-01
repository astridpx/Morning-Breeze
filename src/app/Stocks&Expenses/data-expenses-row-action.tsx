"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Row } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "../../../typings";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ItemsPageModalStore } from "@/lib/zustand/ItemsPage-store/Modals";
import { deleteExpenses } from "./services/Expenses-Api";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & any>;
}

export function ExpensesDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const [expenseId, setExpenseId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const notify = () => toast.loading("Loading...");
  const { toggleEditItemModal } = ItemsPageModalStore();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => deleteExpenses(expenseId),
    onMutate: () => {
      setIsOpen(false);
      LoadingToast("Deleting expenses...");
    },
    onSuccess: async (data: any) => {
      DissmissToast();
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
      SuccessToast(data?.message);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={async () => await mutateAsync()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <HiOutlineDotsHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              // setEditData(row?.original);
              // setEditUserId(row?.original?._id);

              toggleEditItemModal(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <AlertDialogTrigger
            className="w-full"
            onClick={() => {
              setExpenseId(row?.original?._id);
              setIsOpen(true);
            }}
          >
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  );
}
