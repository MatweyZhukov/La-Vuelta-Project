//Services
import { requestToAPI } from ".";

//Types
import { IOrder, IOrderState } from "@/types/types";

export const serviceGetOrders = async (rejectWithValue: any) => {
  try {
    const response = await requestToAPI<IOrderState["orders"]>(
      "/orders",
      "get"
    );

    return response;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
};

export const servicePostUserOrder = async (
  rejectWithValue: any,
  userOrder: IOrder
) => {
  try {
    const response = await requestToAPI<IOrder>("/orders", "post", userOrder);

    return response;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
};
