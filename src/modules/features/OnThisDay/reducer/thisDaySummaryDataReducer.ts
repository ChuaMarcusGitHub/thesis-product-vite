import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import {
    clearBriefArticle,
    clearDetailedArticle,
    clearFeedArticles,
    initializeOnThisDay,
    OnThisDaySummaryAction,
    setBriefArticle,
    setDetailedArticle,
    setFeedArticles,
    setLoadState,
} from "../actions/OnThisDaySummaryActions";
import { IOnThisDaySummaryDataState } from "../type/OnThisDayCommonTypes";

const initialState: IOnThisDaySummaryDataState = {
    all: undefined,
    events: undefined,
    deaths: undefined,
    births: undefined,
    holidays: undefined,
    selected: undefined,
    selectedArticle: undefined,
    loadState: {
        isLoading: false,
    },
};

type ThisDayActionType =
    | typeof initializeOnThisDay
    | typeof setFeedArticles
    | typeof clearFeedArticles
    | typeof setDetailedArticle
    | typeof setBriefArticle
    | typeof setLoadState
    | typeof clearBriefArticle
    | typeof clearDetailedArticle;

const thisDaySummaryDataReducer: Reducer<
    IOnThisDaySummaryDataState,
    ActionType<ThisDayActionType>
> = (state = initialState, action: ActionType<ThisDayActionType>) => {
    switch (action.type) {
        case OnThisDaySummaryAction.SET_FEED_ARTICLES:
            return {
                ...state,
                [action.payload.type]: action.payload.events, // [deaths]: {}
            };
        case OnThisDaySummaryAction.CLEAR_FEED_ARTICLES:
            return {
                ...state,
                events: undefined,
                deaths: undefined,
                births: undefined,
                holidays: undefined,
                selected: undefined,
                selectedArticle: undefined,
            };
        case OnThisDaySummaryAction.SET_LOAD_STATE:
            return {
                ...state,
                loadState: {
                    isLoading: action.payload,
                },
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
        case OnThisDaySummaryAction.CLEAR_BRIEF_ARTICLE:
            return {
                ...state,
                selectedArticle: {
                    ...state.selectedArticle,
                    brief: undefined,
                },
            };
        case OnThisDaySummaryAction.CLEAR_DETAILED_ARTICLE:
            return {
                ...state,
                selectedArticle: {
                    ...state.selectedArticle,
                    detailed: undefined,
                },
            };
        default:
            return state;
    }
};

export default thisDaySummaryDataReducer;
