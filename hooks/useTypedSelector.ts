//Global
import { TypedUseSelectorHook, useSelector } from "react-redux";

//Types
import { RootState } from "@/redux/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
