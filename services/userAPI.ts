//Services
import { requestToAPI } from ".";

//Types
import { IUserState, INewObj, IUser } from "@/types/types";

export const serviceSetUsers = async (
  rejectWithValue: any,
  getState: () => { user: IUserState }
) => {
  try {
    const { userCart, id } = getState().user.currentUser;

    const newObj: INewObj = {
      userCart: userCart,
    };

    id && requestToAPI<IUser>(`/users/${id}`, "patch", newObj);

    return requestToAPI<IUserState["users"]>("/users", "get");
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
};

export const serviceAddUser = async (rejectWithValue: any, newUser: IUser) => {
  try {
    requestToAPI<IUser>("/users", "post", newUser);

    return newUser;
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
};

export const serviceSetUser = async (rejectWithValue: any, newUser: IUser) => {
  try {
    requestToAPI<IUserState>("/currentUser", "put", newUser);

    return newUser;
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
};

export const serviceResetUser = async (rejectWithValue: any) => {
  try {
    const newObj: IUserState["currentUser"] = {
      name: null,
      email: null,
      id: null,
      token: null,
      userCart: [],
    };

    const response = requestToAPI<IUserState>("currentUser", "put", newObj);

    return response;
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
};
