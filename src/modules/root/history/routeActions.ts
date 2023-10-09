import { action } from "typesafe-actions";

export enum RouteActionTypes {
    SET_ROUTE = "routeActions/SET_ROUTE",
}

export const setRoute = (path: string) => action(RouteActionTypes.SET_ROUTE, path);