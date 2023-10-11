import { action } from "typesafe-actions";
import { IArticleBriefObject, ISetFeedArticlePayload } from "../type/OnThisDayCommonTypes";

export enum OnThisDaySummaryAction {
    INIT = "OnThisDaySummaryAction/INIT",
    SET_FEED_ARTICLES = "OnThisDaySummaryAction/SET_FEED_ARTICLES",
    LOAD_BRIEF_ARTICLE = "OnThisDaySummaryAction/LOAD_BRIEF_ARTICLE",
    SET_BRIEF_ARTICLE = "OnThisDaySummaryAction/SET_BRIEF_ARTICLE",
    LOAD_DETAILED_ARTICLE = "OnThisDaySummaryAction/LOAD_DETAILED_ARTICLE",
    SET_DETAILED_ARTICLE = "OnThisDaySummaryAction/SET_DETAILED_ARTICLE",
}

// Initialization action
export const initializeOnThisDay = () => action(OnThisDaySummaryAction.INIT);

// Setter actions
export const setFeedArticles = (eventPayload: ISetFeedArticlePayload) =>
    action(OnThisDaySummaryAction.SET_FEED_ARTICLES, eventPayload);
// Detail Actions
export const loadBriefArticle = (payload: string) =>
    action(OnThisDaySummaryAction.LOAD_BRIEF_ARTICLE, payload);
export const setBriefArticle = (payload: IArticleBriefObject) =>
    action(OnThisDaySummaryAction.SET_BRIEF_ARTICLE, payload);
export const loadDetailedArticle = (payload: string) =>
    action(OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE, payload);
export const setDetailedArticle = (payload: string) =>
    action(OnThisDaySummaryAction.SET_DETAILED_ARTICLE, payload);
