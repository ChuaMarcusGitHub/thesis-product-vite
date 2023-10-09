import { WEBSERVICE_METHOD } from "@modules/root/webservice/WebserviceTypes";
import { WebServiceURLs } from "@modules/root/webservice/WebserviceURLs";
import {
    fetchURL,
    fetchWebpage,
} from "@modules/root/webservice/WebserviceUtils";
import { PayloadAction } from "@reduxjs/toolkit";
import { env } from "process";
import {
    all,
    call,
    fork,
    put,
    putResolve,
    takeLeading,
} from "redux-saga/effects";
import {
    OnThisDaySummaryAction,
    setBirthArticles,
    setBriefArticle,
    setDeathArticles,
    setDetailedArticle,
    setEventArticles,
} from "../actions/OnThisDaySummaryActions";
import {
    IArticleBriefObject,
    ON_THIS_DAY_TOPICS,
} from "../type/OnThisDayCommonTypes";
import {
    IArticleBriefResponse,
    IOnThisDayResponse,
} from "../type/OnThisDayWebserviceTypes";
import {
    buildOnThisDayQuery,
    transformBriefArticleObject,
} from "./OnThisDaySummarySagaUtils";

function* initializeOnThisDay() {
    try {
        /* Create prequery url string for delegation to sub-tasks */
        const today = new Date(Date.now());
        const month = today.getMonth();
        const day = today.getDay();
        const preQueryParams = {
            type: ON_THIS_DAY_TOPICS.ALL,
            month: month,
            day: day,
        };

        /* Delegate to sub-task sagas for api query */
        const response: IOnThisDayResponse = yield call(
            fetchOnThisDayData,
            preQueryParams
        );
    } catch (e: unknown) {
        //Throw error here
        console.error(`Unable to initialize 'OnThisDay'! error:${e}`);
    }
}

function* fetchOnThisDayData(params: {
    type: ON_THIS_DAY_TOPICS;
    month: number;
    day: number;
}) {
    try {
        const completedQuery = buildOnThisDayQuery(
            params.type,
            params.day,
            params.month
        );
        const response: IOnThisDayResponse = yield call(
            fetchURL,
            completedQuery,
            null,
            WEBSERVICE_METHOD.GET,
            {
                Authorization: import.meta.env.VITE_WIKI_ACCESS_TOKEN,
                "Api-User-Agent": import.meta.env.VITE_WIKI_APP_AGENT,
            }
        );
        return response;
    } catch (e) {
        console.error("Error encountered at 'fetchOnThisDayData Saga method'");
    }
}

function* loadDetailedArticle(action: PayloadAction<string>) {
    try {
        const response: string = yield call(fetchWebpage, action.payload);
        console.info("response from loadSelect Article");
        console.info(response);

        if (response) yield putResolve(setDetailedArticle(response.toString()));
        else throw Error(`unable to load article ${action.payload}`);
    } catch (e) {
        console.error("Error in loadSelectedArticle");
        console.error(e);
    }
}

function* loadBriefArticle(action: PayloadAction<string>) {
    try {
        const response: IArticleBriefResponse = yield call(
            fetchURL,
            action.payload
        );

        if (response && response.query) {
            const briefArticle: IArticleBriefObject | null =
                transformBriefArticleObject(response.query);
            if (!briefArticle)
                throw Error("Error During Response Transformation!");

            // --- No problems, set to state
            yield putResolve(setBriefArticle(briefArticle));
        } else {
            throw Error("Error in retreiving query from Wikipedia Extract");
        }
    } catch (e) {
        console.error("Error Encountered in loadBriefArticle Saga method");
        console.error(e);
    }
}

// Watcher Method
function* watchOnThisDaySummarySaga() {
    yield takeLeading(OnThisDaySummaryAction.INIT, initializeOnThisDay);
    yield takeLeading(
        OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE,
        loadDetailedArticle
    );
    yield takeLeading(
        OnThisDaySummaryAction.LOAD_BRIEF_ARTICLE,
        loadBriefArticle
    );
}

const onThisDaySummarySaga = fork(watchOnThisDaySummarySaga);
export default onThisDaySummarySaga;
