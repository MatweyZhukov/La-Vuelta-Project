//Global
import { useDispatch } from "react-redux";

//Types
import { AppDispatch } from "@/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
