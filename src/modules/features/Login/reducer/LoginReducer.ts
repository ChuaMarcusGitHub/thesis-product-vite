import { ActionType, Reducer } from "typesafe-actions";
import {
    LoginActions,
    setLoginDetails,
    setSignupErrors,
    setUserStats,
    clearUserStats,
} from "../actions/LoginActions";
import { ILoginReducerState } from "../types/LoginActionPayloadTypes";

const initialState: ILoginReducerState = {
    loginDetails: null,
    userStats: null,
    signupErrors: null,
};

type LoginActionType =
    | typeof setUserStats
    | typeof setSignupErrors
    | typeof setLoginDetails
    | typeof clearUserStats;
const loginReducer: Reducer<ILoginReducerState, ActionType<LoginActionType>> = (
    state = initialState,
    action: ActionType<LoginActionType>
) => {
    switch (action.type) {
        case LoginActions.SET_LOGIN_DETAILS:
            return {
                ...state,
                loginDetails: action.payload,
            };
        case LoginActions.SET_USER_STATS:
            return {
                ...state,
                userStats: action.payload,
            };
        case LoginActions.CLEAR_USER_STATS:
            return {
                ...state,
                userStats: null,
            };
        case LoginActions.SET_SIGNUP_ERRORS:
            return {
                ...state,
                signupErrors: action.payload,
            };
        default:
            return state;
    }
};

export default loginReducer;
