import { fork, takeLatest } from "redux-saga/effects";
import { DashboardActions } from "../actions/DashboardActions";


function* initializeDashboard(){

}

function* watchDashboardSaga() {
    yield takeLatest(DashboardActions.INIT, initializeDashboard);
}
/* Experiment with creating a dynamic reducer soon */
const dashboardSaga = fork(watchDashboardSaga);
export default dashboardSaga;