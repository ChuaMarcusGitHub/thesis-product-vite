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
    setModalOpen,
    setModalProperties,
    updateActiveTabs,
} from "../actions/OnThisDaySummaryActions";
import { defaultModalProps } from "../component/ContentComponent/ContentDetailModal";

import { IOnThisDaySummaryDataState } from "../type/OnThisDayCommonTypes";

const initialState: IOnThisDaySummaryDataState = {
    all: undefined,
    events: undefined,
    deaths: undefined,
    births: undefined,
    holidays: undefined,
    selected: undefined,
    activeTabs: {
        all: true,
        deaths: true,
        births: true,
        events: true,
        holidays: true,
        selected: true,
    },
    selectedArticle: undefined,
    loadState: {
        isLoading: false,
    },
    modalProps: {
        data: defaultModalProps,
        isOpen: false,
    },
    readList: null,
};

type ThisDayActionType =
    | typeof initializeOnThisDay
    | typeof setFeedArticles
    | typeof clearFeedArticles
    | typeof setDetailedArticle
    | typeof setBriefArticle
    | typeof setLoadState
    | typeof clearBriefArticle
    | typeof clearDetailedArticle
    | typeof updateActiveTabs
    | typeof setModalProperties
    | typeof setModalOpen;

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
        case OnThisDaySummaryAction.UPDATE_ACTIVE_TABS:
            return {
                ...state,
                activeTabs: action.payload,
            };
        case OnThisDaySummaryAction.SET_MODAL_OPEN:
            return {
                ...state,
                modalProps: {
                    ...state.modalProps,
                    isOpen: action.payload,
                },
            };
        case OnThisDaySummaryAction.SET_MODAL_PROPS:
            return {
                ...state,
                modalProps: {
                    ...state.modalProps,
                    data: action.payload,
                },
            };
        default:
            return state;
    }
};

export default thisDaySummaryDataReducer;
