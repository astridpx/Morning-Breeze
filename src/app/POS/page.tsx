"use client";

import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { Separator } from "@/components/ui/separator";
import Slim from "@/assets/items_img/slim_gallon.png";
import Rounded from "@/assets/items_img/rounded_gallon.png";
import POSItems from "./_components/POS-Table-Items";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import POSReceipt from "./_components/POS-Receipt";
import POSSearchUserModal from "./_components/POS-Modal-Search-User";
import { POSBTNHeader } from "./_components/POS-BTN-Header";
import { POSSelectCustomerBTN } from "./_components/POS-Select-Customer-BTN";
import POSModalReturnGallon from "./_components/POS-Modal-Return-Gallon";
import AddNewCustomerModal from "@/components/Add-Customer/Add-Customer-Modal";
import { PaymentModal } from "./_components/POS-Modal-Payment";
import { StaticImageData } from "next/image";
import { ItemsGallon } from "@/utils/Products-data/items";
import { ItemsBottle } from "@/utils/Products-data/items";
import { use } from "react";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";

interface PosItemProps {
  id?: string;
  type: string;
  price: number;
  img: StaticImageData;
}

const GetItems = async () => {
  const Data: PosItemProps[] = await ItemsGallon.map((data) => {
    return data;
  });
  return Data;
};
const GetItemsBottle = async () => {
  const Data: PosItemProps[] = await ItemsBottle.map((data) => {
    return data;
  });
  return Data;
};

const ItemsGet = GetItems();
const ItemsGetBottle = GetItemsBottle();

export default function POS_Page() {
  const { clearOrder } = POSPaymentModal();

  const items = use(ItemsGet);
  const items2 = use(ItemsGetBottle);

  return (
    <>
      <POSSearchUserModal />
      <POSModalReturnGallon />
      <AddNewCustomerModal />
      <PaymentModal />

      <PageWrapper>
        <section className="relative border p-2">
          {/* BTN HEADER */}
          <POSBTNHeader />
          <Separator />

          <div className="py-4 h-[50rem]">
            <div className="flex gap-x-4">
              {/* LEFT BOX */}
              <div className="border-2 w-[65%] h-max">
                {/* leftboc head */}
                <POSSelectCustomerBTN />

                <Separator />

                {/* TABS HERE */}
                <Tabs
                  defaultValue="gallon"
                  className="pt-2 "
                  onValueChange={() => clearOrder()}
                >
                  <TabsList className="flex justify-start">
                    <TabsTrigger value="gallon">Gallon</TabsTrigger>
                    <TabsTrigger value="bottle">Bottle</TabsTrigger>
                  </TabsList>

                  <div className="bg-slate-100 w-full">
                    <header className="h-8 grid grid-cols-8 gap-x-1 place-content-center text-center font-semibold bg-sky-300">
                      <h4 className="text-sm ">#</h4>
                      <h4 className="text-sm col-span-2">ITEM</h4>
                      <h4 className="text-sm">PRICE</h4>
                      <h4 className="text-sm">CLI-GAL</h4>
                      <h4 className="text-sm">WRS-GAL</h4>
                      {/* <h4 className="text-sm">FREE</h4> */}
                      <h4 className="text-sm">TOTAL</h4>
                      <h4 className="text-sm ">BUY</h4>
                    </header>
                    {/* Gallon TAB*/}
                    <TabsContent value="gallon">
                      {items.map((item) => {
                        return (
                          <>
                            <POSItems
                              key={item.id}
                              id={item.id}
                              type={item.type}
                              price={item.price}
                              img={item.img}
                            />
                          </>
                        );
                      })}
                    </TabsContent>

                    {/* BOTTLE TAB */}
                    <TabsContent value="bottle">
                      {items2.map((item: PosItemProps) => {
                        return (
                          <>
                            <POSItems
                              key={item.id}
                              id={item.id}
                              type={item.type}
                              price={item.price}
                              img={item.img}
                            />
                          </>
                        );
                      })}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Ribht box */}
              <div className="w-[35%] border">
                <POSReceipt />
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
