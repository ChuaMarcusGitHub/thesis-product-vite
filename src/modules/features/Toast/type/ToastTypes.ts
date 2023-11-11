import { UseToastOptions } from "@chakra-ui/react";

export enum TOAST_STATUS {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}
export const basicErrorTemplate: UseToastOptions = {
    status: TOAST_STATUS.ERROR,
    isClosable: true,
    duration: 5000,
    title: "Error",
};

export const basicSuccessTemplate: UseToastOptions = {
    status: TOAST_STATUS.SUCCESS,
    isClosable: true,
    duration: 3000,
    title: "Success"
}
export interface IToastReducerState {
    toastData: Partial<UseToastOptions> | null;
}

export enum COMMON_ERRORS {
    SUPABASE_FAIL = "supaFail",
    WEBSERVICE_FAIL = "webSvcFail",
}

export const CommonErrorObject = {
    supaFail: {
        ...basicErrorTemplate,
        title: "Unable to Fetch from Database!",
    },
    webSvcFail: {
        ...basicErrorTemplate,
        title: "Probelms calling service!",
    },
};
