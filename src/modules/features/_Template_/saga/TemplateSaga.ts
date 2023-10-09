import { fork, takeLatest } from "redux-saga/effects";
import { TemplateActions } from "../actions/TemplateActions";


function* initializeTemplate(){

}

function* watchTemplateSaga() {
    yield takeLatest(TemplateActions.INIT, initializeTemplate);
}
/* Experiment with creating a dynamic reducer soon */
const templateSaga = fork(watchTemplateSaga);
export default templateSaga;