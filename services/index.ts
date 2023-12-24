//Global
import axios from "axios";

//Types
import { RequestType } from "@/types/types";

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function requestToAPI<T>(
  url: string,
  method: RequestType,
  body?: any
) {
  const { data } = await $host[method]<T>(url, body);

  return data;
}
