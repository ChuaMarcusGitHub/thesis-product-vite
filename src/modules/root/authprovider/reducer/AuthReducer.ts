import { ActionType, Reducer } from "typesafe-actions";
import {
    AuthActions,
    clearSessionData,
    setSessionData,
} from "../actions/AuthActions";
import { IAuthReducerState } from "../types/AuthSessionTypes";
const initialState: IAuthReducerState = {
    sessionData: null,
};

type AuthActionType = typeof setSessionData | typeof clearSessionData;
const authReducer: Reducer<IAuthReducerState, ActionType<AuthActionType>> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case AuthActions.SET_SESSION_DATA:
            return {
                ...state,
                sessionData: action.payload || {},
            };
        case AuthActions.CLEAR_SESSION_DATA:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
