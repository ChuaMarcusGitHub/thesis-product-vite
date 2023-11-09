import { ActionType, Reducer } from "typesafe-actions";
import { setToastData, ToastActions } from "../actions/ToastActions";
import { IToastReducerState } from "../type/ToastTypes";

const initialState: IToastReducerState = {
    toastData: null,
};
type ToastActionType = typeof setToastData;
const toastReducer: Reducer<IToastReducerState, ActionType<ToastActionType>> = (
    state = initialState,
    action: ActionType<ToastActionType>
) => {
    switch (action.type) {
        case ToastActions.SET_TOAST_DATA:
            return {
                ...state,
                toastData: action.payload,
            };
        default:
            return state;
    }
};

export default toastReducer;
