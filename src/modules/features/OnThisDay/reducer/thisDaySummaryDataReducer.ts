import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import {
    initializeOnThisDay,
    OnThisDaySummaryAction,
    setBriefArticle,
    setDetailedArticle,
    setFeedArticles,
} from "../actions/OnThisDaySummaryActions";
import { IOnThisDaySummaryDataState } from "../type/OnThisDayCommonTypes";

const initialState: IOnThisDaySummaryDataState = {
    events: undefined,
    deaths: undefined,
    births: undefined,
    holidays: undefined,
    selected: undefined,
    selectedArticle: undefined,
};

type ThisDayActionType =
    | typeof initializeOnThisDay
    | typeof setFeedArticles
    | typeof setDetailedArticle
    | typeof setBriefArticle;

const thisDaySummaryDataReducer: Reducer<
    IOnThisDaySummaryDataState,
    ActionType<ThisDayActionType>
> = (state = initialState, action: ActionType<ThisDayActionType>) => {
    switch (action.type) {
        case OnThisDaySummaryAction.SET_FEED_ARTICLES:
            return {
                ...state,
                [action.payload.type]: action.payload.events,// [deaths]: {}
            }
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
