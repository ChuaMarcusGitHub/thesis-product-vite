import { basicErrorTemplate } from "@features/Toast/type/ToastTypes";

export interface IDateObject {
    month: number;
    date: number;
}

export interface ITabCheckbox {
    type: string;
    isChecked: boolean;
}

export enum OTD_COMPONENT_ERRORS {
    LAST_CHECKBOX = "lastCheckbox",
}

export const OTDComponentErrorObject = {
    lastCheckbox: {
        ...basicErrorTemplate,
        title: "Cannot remove last filter!",
    },
};
