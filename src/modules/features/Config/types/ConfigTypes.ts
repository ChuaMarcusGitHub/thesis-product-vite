export interface IConfigReducerState {
    defaultFormat: string;
    defaultLang: string;
}

export interface ISetConfigPayload {
    userLanguage: string;
}

export enum LANG{
    english = "en",
    chinese = "cn"
}