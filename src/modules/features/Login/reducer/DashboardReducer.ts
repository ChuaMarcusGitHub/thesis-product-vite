import { ActionType, Reducer } from "typesafe-actions";
import { setterDashboard } from "../actions/DashboardActions";
import { IDashboardReducerState } from "../types/DashboardTypes";

const initialState: IDashboardReducerState = {
  placeholder: "",
};

type DashboardActionType = typeof setterDashboard;
const dashboardReducer: Reducer<
  IDashboardReducerState,
  ActionType<DashboardActionType>
> = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default dashboardReducer;
