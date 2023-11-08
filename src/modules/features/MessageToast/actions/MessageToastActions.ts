import { action } from "typesafe-actions";

export enum MessageToastActions {
    SET_TOAST_ACTIVE = "MessageToastActions/SET_TOAST_ACTIVE",
}

export const setToastActive = () =>
    action(MessageToastActions.SET_TOAST_ACTIVE);
