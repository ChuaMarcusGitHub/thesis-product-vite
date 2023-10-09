
import { combineReducers } from "redux";
import thisDaySummaryDataReducer from "@features/OnThisDay/reducer/thisDaySummaryDataReducer";


const OnThisDayRootReducer = combineReducers({
    summaryData: thisDaySummaryDataReducer,
})

export default OnThisDayRootReducer;