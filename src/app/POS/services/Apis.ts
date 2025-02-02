import axios from "axios";

export const getAllCustomers = async () => {
  const { data } = await axios.get("/api/customers");

  const newCustomer = data?.data?.map((user: any) => {
    const User = {
      fullname: `${user.first_name} ${user.last_name}`,
      new_address: user.isMain
        ? `${user.street} ${user.brgy} L-${user.city}`
        : user.address,
      ...user,
    };
    return User;
  });

  return newCustomer;
};

export const getAllItems = async () => {
  const { data } = await axios.get("/api/items");

  return data.data;
};

// CREATE TRANSACTION
export const createTransaction = async (Data: any) => {
  const { data } = await axios.post("/api/transaction", {
    ...Data,
  });

  return data;
};
//localhost:3000/api/gallons/651793b5fba28b68e5182463

export const returnGallon = async (Data: any, id: any) => {
  const { data } = await axios.put(`/api/gallons/${id}`, {
    ...Data,
  });

  return data;
};

// CREATE NOTIFICATION API
export const CreateNotif = async (Data: any) => {
  const { data } = await axios.post("/api/notifications", { ...Data });

  return data;
};

// LESSEN POS ITEM STOCK IF BUYED
export const stockOut = async (Data: any, id: any) => {
  const { data } = await axios.put(
    `/api/stocks/out/
    ${id}`,
    {
      ...Data,
    }
  );

  return data;
};
