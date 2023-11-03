import {
    IErrorTypeChecklist,
    LoginErrorTypes,
    passwordMatchResults,
} from "../types/LoginComponentTypes";

export const validateEmailFormat = (input: string) => {
    if (!input) return false;
    const emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
    return !emailRegex.test(input);
};
export const validatePassword = (input: string) => {
    if (!input) return false;

    const passwordValidation: RegExp =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;

    return !passwordValidation.test(input);
};
export const validateUsername = (input: string) => {
    if (!input) return false;

    const usernameValidation: RegExp = /^[a-zA-Z0-9]{1}[-_.a-zA-Z0-9]{5,18}$/;

    return !usernameValidation.test(input);
};
export const matchPassword = (
    password: string,
    confirmPassword: string
): passwordMatchResults => {
    // Don't bother validating if either is empty
    if (!password || !confirmPassword)
        return passwordMatchResults.NOT_CONCLUSIVE;
    // compare password
    return password === confirmPassword
        ? passwordMatchResults.MATCHES
        : passwordMatchResults.NOT_MATCHES;
};

export const generateIsErrorCheckList = (): IErrorTypeChecklist => {
    let errorChecklist: IErrorTypeChecklist = {};
    for (const errorType of Object.keys(LoginErrorTypes)) {
        errorChecklist = {
            ...errorChecklist,
            [errorType]: false,
        };
    }
    return errorChecklist;
};

export const validateNoFormErrors = (
    checklist: IErrorTypeChecklist | null
): boolean => {
    if (!checklist) return false;

    for (const isError of Object.values(checklist)) {
        if (isError) return false;
    }
    return true;
};
