import { action } from "typesafe-actions";
import { IContentDetailModalProps } from "../component/ContentComponent/ContentDetailModal";
import {
    IArticleBriefObject,
    IArticleDetailedPayload,
    IFetchEventsPayload,
    ILoadArticleDetailPayload,
    IOtdCardPageData,
    IReadlistObject,
    ISetFeedArticlePayload,
    IUpdateActiveTabPayload,
} from "../type/OnThisDayCommonTypes";
import { IAnalyticsDataArticlePayload } from "../type/OnThisDayWebserviceTypes";

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
    UPDATE_ACTIVE_TABS = "OnThisDaySummaryAction/UPDATE_ACTIVE_TABS",
    TRIGGER_ANALYTICS_WITH_ARTICLE = "OnThisDaySummaryAction/TRIGGER_ANALYTICS_WITH_ARTICLE",
    // Modal Props
    SET_MODAL_OPEN = "OnThisDaySummaryAction/SET_MODAL_OPEN",
    SET_MODAL_PROPS = "OnThisDaySummaryAction/SET_MODAL_PROPS",
    CLEAR_MODAL_PROPS = "OnThisDaySummaryAction/CLEAR_MODAL_PROPS",
    // Readlist
    FETCH_USER_READLIST = "OnThisDaySummaryAction/FETCH_USER_READLIST",
    ADD_TO_READLIST = "OnThisDaySummaryAction/ADD_TO_READLIST",
    UPDATE_READLIST_STORE = "OnThisDaySummaryAction/UPDATE_READLIST_STORE",
    REMOVE_FROM_READLIST = "OnThisDaySummaryAction/REMOVE_FROM_READLIST",
    CLEAR_READLIST = "OnThisDaySummaryAction/CLEAR_READLIST",
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
export const triggerAnalyticsWithArticle = (
    payload: IAnalyticsDataArticlePayload
) => action(OnThisDaySummaryAction.TRIGGER_ANALYTICS_WITH_ARTICLE, payload);
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
// Update Tab options
export const updateActiveTabs = (payload: IUpdateActiveTabPayload) =>
    action(OnThisDaySummaryAction.UPDATE_ACTIVE_TABS, payload);
// Modal Actions
export const setModalOpen = (isOpen: boolean) =>
    action(OnThisDaySummaryAction.SET_MODAL_OPEN, isOpen);
export const setModalProperties = (payload: IContentDetailModalProps) =>
    action(OnThisDaySummaryAction.SET_MODAL_PROPS, payload);
export const clearModalProps = () =>
    action(OnThisDaySummaryAction.CLEAR_MODAL_PROPS);
// Readlist Actions
export const fetchReadList = (userId: string) =>
    action(OnThisDaySummaryAction.FETCH_USER_READLIST, userId);
export const addToReadList = (payload: IOtdCardPageData) =>
    action(OnThisDaySummaryAction.ADD_TO_READLIST, payload);
export const updateReadListStore = (payload: IReadlistObject) =>
    action(OnThisDaySummaryAction.UPDATE_READLIST_STORE, payload);
export const removeFromReadList = (pageId: number) =>
    action(OnThisDaySummaryAction.REMOVE_FROM_READLIST, pageId);
export const clearReadList = () =>
    action(OnThisDaySummaryAction.CLEAR_READLIST);
