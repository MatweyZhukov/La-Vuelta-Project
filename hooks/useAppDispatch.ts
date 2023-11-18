//Global
import { useDispatch } from "react-redux";

//Types
import { AppDispatch } from "@/GlobalRedux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
