//Global
import axios from "axios";

type RequestType = "get" | "post" | "put" | "delete";

export async function getDataFromApi<T>(url: string) {
  try {
    const response = await axios.get<T>(url);

    return await response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}

export async function requestToApiCart<T>(
  url: string,
  request: RequestType,
  body?: any
) {
  const response = await axios[request]<T>(url, body);

  return await response.data;
}
