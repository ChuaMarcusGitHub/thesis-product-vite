/*
    File that will combine all the sagas into a single application
*/
import { all } from "redux-saga/effects";

//Importing the saga here
import onThisDaySummarySaga from "@modules/features/OnThisDay/saga/OnThisDaySummarySaga";
import authSaga from "./authprovider/saga/AuthSaga";
import loginSaga from "../features/Login/saga/LoginSaga";
import analyticsSaga from "../features/Common/Analytics/sagas/AnalyticsSaga";

export default function* rootSaga() {
    yield all([onThisDaySummarySaga, authSaga, loginSaga, analyticsSaga]);
}
