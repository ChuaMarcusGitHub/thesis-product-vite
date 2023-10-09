import { ActionType, Reducer } from "typesafe-actions";
import { ConfigActions, setConfigs } from "../actions/ConfigActions";
import { IConfigReducerState, LANG } from "../types/ConfigTypes";

;

const initialState: IConfigReducerState = {
  defaultFormat: "json",
  defaultLang: LANG.english,

};

type ConfigActionType = typeof setConfigs;
const configReducer: Reducer<
IConfigReducerState,
  ActionType<ConfigActionType>
> = (state = initialState, action: any) => {
  switch (action.type) {
    case ConfigActions.SET_CONFIGS:
      return {
        ...state,
        defaultLang: action.payload.userLanguage
      }
    default:
      return state;
  }
};

export default configReducer;
