import { ITemplateReducerState } from "@modules/features/Dashboard/types/TemplateTypes";
import { ActionType, Reducer } from "typesafe-actions";
import { setterTemplate } from "../actions/TemplateActions";
;

const initialState: ITemplateReducerState = {
  placeholder: "",
};

type TemplateActionType = typeof setterTemplate;
const templateReducer: Reducer<
ITemplateReducerState,
  ActionType<TemplateActionType>
> = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default templateReducer;
