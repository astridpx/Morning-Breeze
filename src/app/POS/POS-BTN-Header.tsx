"use client";

import { Button } from "@/components/ui/button";
import { BiSearchAlt2, BiHistory, BiUserPlus } from "react-icons/bi";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";

export function POSBTNHeader() {
  const { toggleShowSelect } = POSBTNHeaderStore();

  return (
    <>
      <div className="w-full py-2 mb-2  flex gap-2">
        <Button
          className="h-max w-40 p-2 flex gap-x-1"
          onClick={() => toggleShowSelect(true)}
        >
          <span>
            <BiSearchAlt2 size={20} />
          </span>
          Customer
        </Button>
        <Button className="h-max w-40 p-2 flex gap-x-2 bg-yellow-500 hover:bg-yellow-500">
          <span>
            <BiHistory size={20} />
          </span>
          Return Gallon
        </Button>
        <Button className="h-max w-40 p-2 flex gap-x-2 bg-green-500 hover:bg-green-500">
          <span>
            <BiUserPlus size={20} />
          </span>
          New Customer
        </Button>
      </div>
    </>
  );
}
