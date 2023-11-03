export const USERNAME_LENGTH_LIMIT = 20;
export enum SignInTabType {
    Login = "Login",
    SignUp = "SignUp",
}

export const activeTabIndex = {
    [SignInTabType.Login]: 0,
    [SignInTabType.SignUp]: 1,
};

export interface IErrorTypeChecklist {
    [error: string]: boolean; // [LoginErrorTypes]: true/false,
}
export enum LoginErrorTypes {
    INVALID_PASSWORD = "INVALID_PASSWORD",
    MISMATCH_PASSWORD = "MISMATCH_PASSWORD",
    MISSING_FIELDS = "MISSING_FIELDS",
    INVALID_EMAIL = "INVALID_EMAIL",
    USERNAME_TAKEN = "USERNAME_TAKEN",
    EMAIL_IN_USE = "EMAIL_IN_USE",
    INVALID_USERNAME = "INVALID_USERNAME",
}
export const signUpErrorMessage = {
    INVALID_PASSWORD:
        "(1) min length is 8 | (2) Upper and Lower case | (3) at least 1 numeric | (4) at least 1 symbol( !@#$%^&* )",
    MISMATCH_PASSWORD: "Passwords do not match!",
    MISSING_FIELDS: "Fill in all fields!",
    INVALID_EMAIL: "Please provide a valid email! Only '-' or '_' are allowed!",
    USERNAME_TAKEN: "Username has been taken!",
    EMAIL_IN_USE: "Email Already in Use!",
    INVALID_USERNAME: "6-20 char, only [ '-' , '_', '.' ] allowed! (Not at start)",
};

export enum passwordMatchResults {
    NOT_CONCLUSIVE = 0,
    MATCHES = 1,
    NOT_MATCHES = -1,
}
