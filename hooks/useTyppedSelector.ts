//Global
import { TypedUseSelectorHook, useSelector } from "react-redux";

//Types
import { RootState } from "@/GlobalRedux/store";

export const useTyppedSelector: TypedUseSelectorHook<RootState> = useSelector;
