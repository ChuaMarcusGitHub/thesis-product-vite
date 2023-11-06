import supabaseClient from "@src/clientfolder/supabaseClient";
import {
    CRUD_OP,
    SUPABASE_TABLES,
} from "@features/Common/Supabase/SupabaseCommonTypes";
import { handleCUDRsponseStatus } from "@features/Common/Supabase/SupabaseCommonUtils";
import {
    IAnalyticsArticleDataPayload,
    IAnalyticsModalDataPayload,
} from "../types/AnalyticsPayloadTypes";

const FILE_LOC_ERR_STRING = "Error encountered in AnalyticsSupabase Calls |";
export const supaInsertArticleData = async (
    articleData: IAnalyticsArticleDataPayload
) => {
    try {
        console.log("INSERTING ARTICLE DATA TO ARTICLE_ENTRY :", articleData)
        const { status: responseStatus, statusText } = await supabaseClient
            .from(SUPABASE_TABLES.ARTICLE_ENTRY)
            .insert({
                user_id: articleData.userId,
                article_id: articleData.articleId,
                article_title: articleData.articleTitle,
                event_type: articleData.eventType,
                tid: articleData.tid,
                article_length: articleData.articleLength,
            });

        return handleCUDRsponseStatus(
            CRUD_OP.INSERT,
            responseStatus,
            statusText
        );
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING} supaInsertArticleData`);
    }
};

export const supaInsertModalData = async (
    modalData: IAnalyticsModalDataPayload
) => {
    try {
        const { status: responseStatus, statusText } = await supabaseClient
            .from(SUPABASE_TABLES.MODAL_STATS)
            .insert({
                user_id: modalData.userId,
                opened_at: modalData.openedAt,
                closed_at: modalData.closedAt,
                time_spent_ms: modalData.timeSpentMS,
                article_type: modalData.articleType,
                article_id: modalData.articleId,
                article_title: modalData.articleTitle,
            });

        return handleCUDRsponseStatus(
            CRUD_OP.INSERT,
            responseStatus,
            statusText
        );
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING} supaInsertModalData`);
    }
};
