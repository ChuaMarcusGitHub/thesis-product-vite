import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import {
    initializeOnThisDay,
    OnThisDaySummaryAction,
    setBirthArticles,
    setBriefArticle,
    setDeathArticles,
    setDetailedArticle,
    setEventArticles,
} from "../actions/OnThisDaySummaryActions";
import { IOnThisDaySummaryDataState } from "../type/OnThisDayCommonTypes";

const initialState: IOnThisDaySummaryDataState = {
    eventsArticles: undefined,
    deathArticles: undefined,
    birthArticles: undefined,
    selectedArticle: undefined,
};

type ThisDayActionType =
    | typeof initializeOnThisDay
    | typeof setEventArticles
    | typeof setDeathArticles
    | typeof setBirthArticles
    | typeof setDetailedArticle
    | typeof setBriefArticle;

const thisDaySummaryDataReducer: Reducer<
    IOnThisDaySummaryDataState,
    ActionType<ThisDayActionType>
> = (state = initialState, action: ActionType<ThisDayActionType>) => {
    switch (action.type) {
        case OnThisDaySummaryAction.SET_EVENT_ARTICLES:
            return {
                ...state,
                eventsArticles: action.payload,
            };
        case OnThisDaySummaryAction.SET_DEATH_ARTICLES:
            return {
                ...state,
                deathArticles: action.payload,
            };
        case OnThisDaySummaryAction.SET_BIRTH_ARTICLES:
            return {
                ...state,
                birthArticles: action.payload,
            };
        case OnThisDaySummaryAction.SET_DETAILED_ARTICLE:
            return {
                ...state,
                selectedArticle: {
                    ...state.selectedArticle,
                    detailed: action.payload,
                },
            };
        case OnThisDaySummaryAction.SET_BRIEF_ARTICLE:
            return {
                ...state,
                selectedArticle: {
                    ...state.selectedArticle,
                    brief: action.payload,
                },
            };
        default:
            return state;
    }
};

export default thisDaySummaryDataReducer;
