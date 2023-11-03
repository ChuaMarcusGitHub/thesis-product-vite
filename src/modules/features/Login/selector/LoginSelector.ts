import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@src/modules/root/rootReducer";

const userDataRoot = (state: AppState) => state.userData;


// Selectors
export const getSignupErrors = createSelector(userDataRoot, (data) => data.signupErrors || []); 
export const getUserStats = createSelector(userDataRoot, (data) => data.userStats)
