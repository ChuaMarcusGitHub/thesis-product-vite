import { PayloadAction } from "@reduxjs/toolkit";
import { getUserStats } from "@src/modules/features/Login/selector/LoginSelector";
import { getSessionUser } from "@src/modules/root/authprovider/selector/AuthSelector";
import { ICRUDResponse } from "@src/modules/root/authprovider/types/AuthSessionTypes";
import {
    generateAndStoreLocalUserId,
    getLocalUserId,
} from "@src/modules/root/authprovider/utils/AuthUtilFunctions";
import { User } from "@supabase/supabase-js";
import { all, call, fork, put, select, takeLeading } from "redux-saga/effects";

import { AnalyticsActions } from "../actions/AnalyticsActions";
import {
    ISendArticleDataPayload,
    IAnalyticsArticleDataPayload,
    ISendAnalyticsModalDataPayload,
    IAnalyticsModalDataPayload,
    IFetchUserIdData,
} from "../types/AnalyticsPayloadTypes";
import { IUserStats } from "@features/Login/types/LoginActionPayloadTypes";
import {
    supaInsertArticleData,
    supaInsertModalData,
} from "./AnalyticsSupabaseCalls";
import { supaUpdateUserStats } from "@src/modules/features/Login/saga/LoginSagaSupabaseCalls";
import { updateUserStats } from "@src/modules/features/Login/actions/LoginActions";
import { isEmpty } from "lodash";

function* insertArticleDataImpl(
    action: PayloadAction<ISendArticleDataPayload>
) {
    try {
        const articleData: ISendArticleDataPayload = action.payload;
        if (!Object.values(articleData).every((item) => item)) {
            console.error("Article Object: ", articleData);
            throw "Article Data insufficient!";
        }

        // All Article ready, get missing userId
        const userData: IFetchUserIdData = yield call(fetchUserIdData);

        const analyticsPayload: IAnalyticsArticleDataPayload = {
            userId: userData.userId,
            articleId: articleData.articleId,
            articleTitle: articleData.articleTitle,
            tid: articleData.tid,
            eventType: articleData.eventType,
            articleLength: articleData.descriptionLength,
        };

        const cudResponse: ICRUDResponse = yield call(
            supaInsertArticleData,
            analyticsPayload
        );
        if (cudResponse.errorMessage) throw cudResponse.errorMessage;
    } catch (e) {
        console.error("Error encountered at insertArticleDataImpl :", e);
    }
}

function* insertModalDataImpl(
    action: PayloadAction<ISendAnalyticsModalDataPayload>
) {
    try {
        const modalData: ISendAnalyticsModalDataPayload = action.payload;
        if (!modalData) {
            throw `Modal Data Invalid! : ${modalData}`;
        }
        if (!Object.values(modalData).every((item) => item)) {
            console.error("Modal Object: ", modalData);
            throw "Modal Data insufficient!";
        }

        // All Article ready, get missing userId
        const userData: IFetchUserIdData = yield call(fetchUserIdData);

        const analyticsPayload: IAnalyticsModalDataPayload = {
            userId: userData.userId,
            openedAt: modalData.openAt,
            closedAt: modalData.closeAt,
            articleId: modalData.articleId,
            articleTitle: modalData.articleTitle || "",
            articleType: modalData.articleType,
            timeSpentMS: modalData.timeSpentMS,
        };

        const callArray = [call(supaInsertModalData, analyticsPayload)];

        let newStats: IUserStats | undefined = undefined;
        //If user is logged in- log the stats
        if (userData.userAuthed) {
            const userStats: IUserStats = yield select(getUserStats);
            newStats = { ...userStats };
            ++newStats.articlesRead;
            newStats.timeSpent += modalData.timeSpentMS;
            callArray.push(call(supaUpdateUserStats, newStats));
        }

        const cudResponse: ICRUDResponse[] = yield all([...callArray]);
        if (!cudResponse.every((response) => response.success)) {
            const errorMsg = cudResponse.reduce(
                (errorMessage, currErr) =>
                    (errorMessage += `${currErr.errorMessage} |`),
                ""
            );
            throw `Error Performing Stats update! Error: ${errorMsg}`;
        }

        // Everything successful Update user Stats for viewing
        if (userData.userAuthed && !isEmpty(newStats)) {
            yield put(updateUserStats(newStats));
        }
    } catch (e) {
        console.error("Error encountered at insertArticleDataImpl :", e);
    }
}

function* fetchUserIdData() {
    try {
        let userId = "";
        let userAuthed = false;
        const userData: User = yield select(getSessionUser);
        // No user signed in
        if (userData) {
            userId = userData.id;
            userAuthed = true;
        } else {
            //generate and store new local user in browser
            const _localUser: string | null = getLocalUserId();
            if (!_localUser) userId = generateAndStoreLocalUserId();
            else userId = _localUser;
            // There is existing userId in userData
        }
        return { userId: userId, userAuthed: userAuthed };
    } catch (e) {
        console.error("Error encountered in fetchUserIdData: ", e);
    }
}

function* watchAnalyticsSaga() {
    try {
        yield takeLeading(
            AnalyticsActions.INSERT_ARTICLE_ANALYTICS,
            insertArticleDataImpl
        );
        yield takeLeading(
            AnalyticsActions.INSERT_MODAL_ANALYLTICS,
            insertModalDataImpl
        );
    } catch (e) {
        console.error("Error encountered at watchAnalyticsSaga: ", e);
    }
}

const analyticsSaga = fork(watchAnalyticsSaga);
export default analyticsSaga;
