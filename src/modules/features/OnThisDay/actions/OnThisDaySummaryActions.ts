import { action } from "typesafe-actions";
import { IArticleBriefObject, IOtdCardData } from "../type/OnThisDayCommonTypes";

export enum OnThisDaySummaryAction {
    INIT = "OnThisDaySummaryAction/INIT",
    SET_EVENT_ARTICLES = "OnThisDaySummaryAction/SET_EVENT_ARTICLES",
    SET_DEATH_ARTICLES = "OnThisDaySummaryAction/SET_DEATH_ARTICLES",
    SET_BIRTH_ARTICLES = "OnThisDaySummaryAction/SET_BIRTH_ARTICLES",
    LOAD_BRIEF_ARTICLE = "OnThisDaySummaryAction/LOAD_BRIEF_ARTICLE",
    SET_BRIEF_ARTICLE = "OnThisDaySummaryAction/SET_BRIEF_ARTICLE",
    LOAD_DETAILED_ARTICLE = "OnThisDaySummaryAction/LOAD_DETAILED_ARTICLE",
    SET_DETAILED_ARTICLE = "OnThisDaySummaryAction/SET_DETAILED_ARTICLE",
}

// Initialization action
export const initializeOnThisDay = () => action(OnThisDaySummaryAction.INIT);

// Setter actions
export const setEventArticles = (eventPayload: IOtdCardData) =>
    action(OnThisDaySummaryAction.SET_EVENT_ARTICLES, eventPayload);
export const setDeathArticles = (deathPayload: IOtdCardData) =>
    action(OnThisDaySummaryAction.SET_DEATH_ARTICLES, deathPayload);
export const setBirthArticles = (birthPayload: IOtdCardData) =>
    action(OnThisDaySummaryAction.SET_BIRTH_ARTICLES, birthPayload);

// Detail Actions
export const loadBriefArticle = (payload: string) =>
    action(OnThisDaySummaryAction.LOAD_BRIEF_ARTICLE, payload);
export const setBriefArticle = (payload: IArticleBriefObject) =>
    action(OnThisDaySummaryAction.SET_BRIEF_ARTICLE, payload);
export const loadDetailedArticle = (payload: string) =>
    action(OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE, payload);
export const setDetailedArticle = (payload: string) =>
    action(OnThisDaySummaryAction.SET_DETAILED_ARTICLE, payload);
