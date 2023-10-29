import { ActionType, Reducer } from "typesafe-actions";
import { LoginActions, setUserStats } from "../actions/LoginActions";
import { ILoginReducerState } from "../types/LoginActionPayloadTypes";

const initialState: ILoginReducerState = {
    placeholder: "",
    loginDetails: null,
    userStats: null,
};

type LoginActionType = typeof setUserStats;
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
        default:
            return state;
    }
};

export default loginReducer;
