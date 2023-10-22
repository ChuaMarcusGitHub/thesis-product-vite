import { action } from "typesafe-actions";
import {
    IArticleBriefObject,
    IArticleDetailedPayload,
    IFetchEventsPayload,
    ILoadArticleDetailPayload,
    ISetFeedArticlePayload,
} from "../type/OnThisDayCommonTypes";

export enum OnThisDaySummaryAction {
    INIT = "OnThisDaySummaryAction/INIT",
    FETCH_DATE_EVENTS = "OnThisDaySummaryAction/FETCH_DATE_EVENTS",
    SET_LOAD_STATE = "OnThisDaySummaryAction/SET_LOAD_STATE",
    SET_FEED_ARTICLES = "OnThisDaySummaryAction/SET_FEED_ARTICLES",
    CLEAR_FEED_ARTICLES = "OnThisDaySummaryAction/CLEAR_FEED_ARTICLES",
    LOAD_BRIEF_ARTICLE = "OnThisDaySummaryAction/LOAD_BRIEF_ARTICLE",
    SET_BRIEF_ARTICLE = "OnThisDaySummaryAction/SET_BRIEF_ARTICLE",
    CLEAR_BRIEF_ARTICLE = "OnThisDaySummaryAction/CLEAR_BRIEF_ARTICLE",
    LOAD_DETAILED_ARTICLE = "OnThisDaySummaryAction/LOAD_DETAILED_ARTICLE",
    SET_DETAILED_ARTICLE = "OnThisDaySummaryAction/SET_DETAILED_ARTICLE",
    CLEAR_DETAILED_ARTICLE = "OnThisDaySummaryAction/CLEAR_DETAILED_ARTICLE",
}

// Initialization action
export const initializeOnThisDay = () => action(OnThisDaySummaryAction.INIT);
// Fetch Actions
export const fetchEventsFromDay = (payload: IFetchEventsPayload) =>
    action(OnThisDaySummaryAction.FETCH_DATE_EVENTS, payload);
// Setter actions
export const setLoadState = (newState: boolean) =>
    action(OnThisDaySummaryAction.SET_LOAD_STATE, newState);
export const setFeedArticles = (eventPayload: ISetFeedArticlePayload) =>
    action(OnThisDaySummaryAction.SET_FEED_ARTICLES, eventPayload);
export const clearFeedArticles = () =>
    action(OnThisDaySummaryAction.CLEAR_FEED_ARTICLES);
// Detail Actions
export const loadBriefArticle = (payload: string) =>
    action(OnThisDaySummaryAction.LOAD_BRIEF_ARTICLE, payload);
export const setBriefArticle = (payload: IArticleBriefObject) =>
    action(OnThisDaySummaryAction.SET_BRIEF_ARTICLE, payload);
export const clearBriefArticle = () =>
    action(OnThisDaySummaryAction.CLEAR_BRIEF_ARTICLE);
export const loadDetailedArticle = (payload: ILoadArticleDetailPayload) =>
    action(OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE, payload);
export const setDetailedArticle = (payload: IArticleDetailedPayload) =>
    action(OnThisDaySummaryAction.SET_DETAILED_ARTICLE, payload);
export const clearDetailedArticle = () =>
    action(OnThisDaySummaryAction.CLEAR_DETAILED_ARTICLE);
