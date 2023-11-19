import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
// import logger from "redux-logger";
import rootReducer from "../rootReducer";
import rootSaga from "../rootSaga";


//creating the middleware
const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];
// const middleWares = [sagaMiddleware, logger];

//Mounting the store
const store = configureStore({ 
    reducer: rootReducer,
    middleware: [...middleWares], 
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
