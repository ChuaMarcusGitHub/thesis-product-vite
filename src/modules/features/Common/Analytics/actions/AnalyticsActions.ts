import { action } from "typesafe-actions";

export enum AnalyticsActions {
    INSERT_ARTICLE_ANALYTICS = "AnalyticsActions/INSERT_ARTICLE_ANALYTICS",
    INSERT_MODAL_ANALYLTICS = "AnalyticsActions/INSERT_MODAL_ANALYLTICS",
}

// Analytics Actions
export const analyticsInsertArticleData = () => 
    action(AnalyticsActions.INSERT_ARTICLE_ANALYTICS)