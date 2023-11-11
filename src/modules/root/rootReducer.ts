/*
    File that will combine all the reducers into a single application
*/

import configReducer from "@modules/features/Config/reducer/ConfigReducer";
import OnThisDayRootReducer from "@modules/features/OnThisDay/reducer/OnThisDayReducer";
import { combineReducers } from "redux";
import loginReducer from "../features/Login/reducer/LoginReducer";
import toastReducer from "../features/Toast/reducer/ToastReducer";
import authReducer from "./authprovider/reducer/AuthReducer";

//import reducers here

const rootReducer = combineReducers({
    OnThisDay: OnThisDayRootReducer,
    userData: loginReducer,
    authSession: authReducer,
    config: configReducer,
    toast: toastReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
