import { ActionType, Reducer } from "typesafe-actions";
import {
    AuthActions,
    clearAuthError,
    clearSessionData,
    setAuthError,
    setSessionData,
} from "../actions/AuthActions";
import { IAuthReducerState } from "../types/AuthSessionTypes";
const initialState: IAuthReducerState = {
    sessionData: null,
    authError: null,
};

type AuthActionType =
    | typeof setSessionData
    | typeof clearSessionData
    | typeof setAuthError
    | typeof clearAuthError;
const authReducer: Reducer<IAuthReducerState, ActionType<AuthActionType>> = (
    state = initialState,
    action: ActionType<AuthActionType>
) => {
    switch (action.type) {
        case AuthActions.SET_SESSION_DATA:
            return {
                ...state,
                sessionData: action.payload || {},
            };
        case AuthActions.SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
            };
        case AuthActions.CLEAR_AUTH_ERROR:
            return {
                ...state,
                authError: null,
            };
        case AuthActions.CLEAR_SESSION_DATA:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
