import { IDashboardReducerState } from "@src/modules/features/Dashboard/types/DashboardTypes";
import { ActionType, Reducer } from "typesafe-actions";
import { setterDashboard } from "../actions/DashboardActions";


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
