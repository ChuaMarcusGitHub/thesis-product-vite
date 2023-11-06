import { action } from "typesafe-actions";
import {
    ISendArticleDataPayload,
    ISendAnalyticsModalDataPayload,
} from "../types/AnalyticsPayloadTypes";

export enum AnalyticsActions {
    INSERT_ARTICLE_ANALYTICS = "AnalyticsActions/INSERT_ARTICLE_ANALYTICS",
    INSERT_MODAL_ANALYLTICS = "AnalyticsActions/INSERT_MODAL_ANALYLTICS",
}

// Analytics Actions
export const analyticsInsertArticleData = (payload: ISendArticleDataPayload) =>
    action(AnalyticsActions.INSERT_ARTICLE_ANALYTICS, payload);

export const analyticsInsertModalData = (
    payload: ISendAnalyticsModalDataPayload | null
) => action(AnalyticsActions.INSERT_MODAL_ANALYLTICS, payload);
