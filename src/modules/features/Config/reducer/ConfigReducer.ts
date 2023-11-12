import { ActionType, Reducer } from "typesafe-actions";
import {
    ConfigActions,
    setConfigs,
    setStoreNoticeRequied,
} from "../actions/ConfigActions";
import { IConfigReducerState, LANG } from "../types/ConfigTypes";

const initialState: IConfigReducerState = {
    defaultFormat: "json",
    defaultLang: LANG.english,
    noticeRequired: false,
};

type ConfigActionType = typeof setConfigs | typeof setStoreNoticeRequied;
const configReducer: Reducer<
    IConfigReducerState,
    ActionType<ConfigActionType>
> = (state = initialState, action: ActionType<ConfigActionType>) => {
    switch (action.type) {
        case ConfigActions.SET_CONFIGS:
            return {
                ...state,
                defaultLang: action.payload.userLanguage,
            };
        case ConfigActions.SET_NOTICE_REQ:
            return {
                ...state,
                noticeRequired: action.payload,
            };
        default:
            return state;
    }
};

export default configReducer;
