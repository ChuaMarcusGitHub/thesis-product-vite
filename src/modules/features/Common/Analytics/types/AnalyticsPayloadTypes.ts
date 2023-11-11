import { ARTICLE_TYPE } from "@src/modules/features/OnThisDay/type/OnThisDayCommonTypes";

// Payload for prepping data to send from component to saga
export interface ISendArticleDataPayload {
    articleTitle: string;
    articleId: number;
    tid: string;
    eventType?: string; // see ON_THIS_DAY_TOPICS (sans All)
    descriptionLength: number;
}
export interface IAnalyticsArticleDataPayload {
    userId: string;
    articleTitle: string;
    articleId: number;
    tid: string;
    eventType?: string;
    articleLength: number;
}

// Payload for prepping data to send from component to saga
export interface ISendAnalyticsModalDataPayload {
    articleTitle: string | null;
    articleId: number;
    articleType: ARTICLE_TYPE;
    openAt: string;
    closeAt: string;
    timeSpentMS: number;
}
export interface IFetchUserIdData{
    userId: string; //uid for session/user
    userAuthed: boolean; // if user is localstorage or logged in user
}
export interface IAnalyticsModalDataPayload {
    userId: string;
    articleTitle: string;
    articleId: number;
    articleType: ARTICLE_TYPE;
    openedAt: string;
    closedAt: string;
    timeSpentMS: number;
}
