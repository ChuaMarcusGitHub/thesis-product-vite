import { createSelector } from "reselect";
import { AppState } from "../rootReducer";
import { RouteActionTypes } from "./routeActions";


export interface RouteListState {
    routeList: string[];
}

const initialState: RouteListState = {
    routeList: [],
}

const routeReducer = (state: RouteListState = initialState, action: any) => {
    switch (action.type) {
        case RouteActionTypes.SET_ROUTE:
            return {
                ...state,
                routeList: [...state.routeList, action.payload],
            }
        default:
            return state;
    }
};
export default routeReducer;

const getRouteList = (state: AppState) => state.routes?.routeList;
export const routesListSelector = createSelector( [getRouteList], (data)=> data);