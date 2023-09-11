import Slim from "@/assets/items_img/slim_gallon.png";
import Image from "next/image";
import { Row } from "@tanstack/react-table";

// w   W
interface DataTableRowActionsProps<TData> {
  row: Row<TData & any>;
}

export function DataTableGallonColumn<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <>
      <div className="bg-green-200 min-w-[25rem]">
        <header className="grid grid-cols-4 font-semibold text-center bg-gray-200">
          <h4 className="col-span-2 ">Item</h4>
          <h4>Client</h4>
          <h4>WRS</h4>
        </header>
        <div className="grid grid-cols-4 text-center">
          <div className=" flex items-center gap-4 col-span-2 ">
            <Image src={Slim} alt="Slim" height={25} className="" />

            <p>SLim Gallon</p>
          </div>
          <h4>4</h4>
          <h4>7</h4>
        </div>
      </div>
    </>
  );
}
