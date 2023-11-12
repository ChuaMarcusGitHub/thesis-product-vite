import { action } from "typesafe-actions";
import { ISetConfigPayload } from "../types/ConfigTypes";

export enum ConfigActions {
    INIT = "TemplateActions/INIT",
    SET_CONFIGS = "ConfigActions/SetConfig",
    UPDATE_NOTICE_REQ = "ConfigActions/UPDATE_NOTICE_REQ",
    SET_NOTICE_REQ = "ConfigActions/SET_NOTICE_REQ",
    INIT_NOTICE_CHECK = "ConfigActions/INIT_NOTICE_CHECK",
}

export const initializeNoticeCheck = () =>
    action(ConfigActions.INIT_NOTICE_CHECK);
export const updateNoticeRequired = (flag: boolean) =>
    action(ConfigActions.UPDATE_NOTICE_REQ, flag);
// Reducer Actions
export const setStoreNoticeRequied = (flag: boolean) =>
    action(ConfigActions.SET_NOTICE_REQ, flag);
export const setConfigs = (payload: ISetConfigPayload) =>
    action(ConfigActions.SET_CONFIGS, payload);
