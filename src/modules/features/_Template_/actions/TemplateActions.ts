import { action } from "typesafe-actions";

export enum TemplateActions {
    INIT = "TemplateActions/INIT",
    SETTER = "TemplateActions/SETTER",
}

export const initTemplate = () => action(TemplateActions.INIT);

// Placeholder
export const setterTemplate = () => action(TemplateActions.SETTER);
