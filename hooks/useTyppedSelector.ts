//Global
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

//Types
import { AppDispatch, RootState } from "@/GlobalRedux/store";

export const useTyppedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
