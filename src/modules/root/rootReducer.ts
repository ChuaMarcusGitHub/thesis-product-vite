/*
    File that will combine all the reducers into a single application
*/

import configReducer from "@modules/features/Config/reducer/ConfigReducer";
import OnThisDayRootReducer from "@modules/features/OnThisDay/reducer/OnThisDayReducer";
import sandboxReducer from "@modules/features/Sandbox/reducer/SandboxReducer";
import { combineReducers } from "redux";
import authReducer from "./authprovider/reducer/AuthReducer";
import routeReducer from "./history/routeReducer";

//import reducers here


const rootReducer = combineReducers({
    OnThisDay: OnThisDayRootReducer,
    routes: routeReducer,
    sandbox: sandboxReducer,
    authSession: authReducer,
    config: configReducer,

})

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
