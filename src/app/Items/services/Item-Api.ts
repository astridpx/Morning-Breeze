import Axios from "axios";
import { IExpenses, IItems } from "../../../../typings";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

const x = {
  _id: "6513e5711184363d05a2036c",
  name: "Wilkins",
  category: "bottle",
  reorder: 0,
  pos_item: true,
  price: 50,
  buy_price: 150,
  stock_history: [],
  createdAt: "2023-09-27T08:18:57.273Z",
  updatedAt: "2023-09-27T08:18:57.273Z",
  __v: 0,
};

export const createItem = async (Data: any) => {
  const { data } = await axios.post("/api/items", {
    ...Data,
  });

  return data;
};

export const getAllItems = async () => {
  const { data } = await axios.get("/api/items");

  return data.data;
};

export const updateItem = async (Data: IItems, id: any) => {
  const { data } = await axios.put(
    `/api/items/
  ${id}`,
    {
      ...Data,
    }
  );

  return data;
};

export const deleteItem = async (id: any) => {
  const { data } = await axios.delete(`/api/items/${id}`);

  return data;
};
