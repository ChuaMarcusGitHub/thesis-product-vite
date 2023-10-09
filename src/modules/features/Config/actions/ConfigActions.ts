import { action } from "typesafe-actions";
import { ISetConfigPayload } from "../types/ConfigTypes";

export enum ConfigActions {
    INIT = "TemplateActions/INIT",
    SET_CONFIGS = "ConfigActions/SetConfig"
}

export const setConfigs = (payload: ISetConfigPayload) => action(ConfigActions.SET_CONFIGS, payload);
