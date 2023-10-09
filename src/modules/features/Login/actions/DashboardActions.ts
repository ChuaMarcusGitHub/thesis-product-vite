import { action } from "typesafe-actions";


export enum DashboardActions{
    INIT = "DashboardActions/INIT",
    SETTER = "DashboardActions/SETTER",
}

export const initDashboard = () => action(DashboardActions.INIT);

// Placeholder
export const setterDashboard = () => action(DashboardActions.SETTER);