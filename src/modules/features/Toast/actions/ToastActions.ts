import { UseToastOptions } from "@chakra-ui/react";
import { action } from "typesafe-actions";

export enum ToastActions {
    SET_TOAST_DATA = "MessageToastActions/SET_TOAST_DATA",
}

export const setToastData = (payload: Partial<UseToastOptions> | null) =>
    action(ToastActions.SET_TOAST_DATA, payload);
