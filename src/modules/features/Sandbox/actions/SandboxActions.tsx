import { action } from "typesafe-actions";

export enum SandboxActionsType {
    INIT = "SandboxActions/INIT",
};

export const initSandbox = () => action(SandboxActionsType.INIT);
