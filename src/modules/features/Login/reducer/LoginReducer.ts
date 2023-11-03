import { ActionType, Reducer } from "typesafe-actions";
import {
    LoginActions,
    setSignupErrors,
    setUserStats,
} from "../actions/LoginActions";
import { ILoginReducerState } from "../types/LoginActionPayloadTypes";

const initialState: ILoginReducerState = {
    loginDetails: null,
    userStats: null,
    signupErrors: null,
};

type LoginActionType = typeof setUserStats | typeof setSignupErrors;
const loginReducer: Reducer<ILoginReducerState, ActionType<LoginActionType>> = (
    state = initialState,
    action: ActionType<LoginActionType>
) => {
    switch (action.type) {
        case LoginActions.SET_USER_STATS:
            return {
                ...state,
                userStats: action.payload,
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
