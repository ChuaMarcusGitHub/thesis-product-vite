// import { WEBSERVICE_METHOD } from "@modules/root/webservice/WebserviceTypes";
// import { WebServiceURLs } from "@modules/root/webservice/WebserviceURLs";
import {
    fetchURL,
    fetchWebpage,
} from "@modules/root/webservice/WebserviceUtils";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    call,
    fork,
    put,
    putResolve,
    takeLeading,
} from "redux-saga/effects";
import {
    clearDetailedArticle,
    clearFeedArticles,
    OnThisDaySummaryAction,
    setBriefArticle,
    setDetailedArticle,
    setFeedArticles,
    setLoadState,
} from "../actions/OnThisDaySummaryActions";
import {
    IArticleBriefObject,
    IFetchEventsDataPayload,
    IFetchEventsPayload,
    ILoadArticleDetailPayload,
    ISetFeedArticlePayload,
    ON_THIS_DAY_TOPICS,
} from "../type/OnThisDayCommonTypes";
import {
    IArticleBriefResponse,
    IOnThisDayResponse,
} from "../type/OnThisDayWebserviceTypes";
import {
    buildBriefArticleQuery,
    buildFullArticleQuery,
    buildOnThisDayQuery,
    compileAllArticles,
    retrievePageId,
    transformBriefArticleObject,
    transformOtdFeedResponse,
} from "./OnThisDaySummarySagaUtils";

const WIKI_ACCESS_TOKEN = import.meta.env.VITE_WIKI_ACCESS_TOKEN;
const WIKI_APP_AGENT = import.meta.env.VITE_WIKI_APP_AGENT;
const isDev = import.meta.env.DEV;

function* initializeOnThisDay() {
    try {
        yield put(setLoadState(true));
        /* Create prequery url string for delegation to sub-tasks */
        const today = new Date(Date.now());
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
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
        if (!response) {
            // negative response - find case test
        } else {
            console.log(response);
            // Parse the information
            const allArticles: ISetFeedArticlePayload[] = [];
            for (const key in response) {
                const transformedData: ISetFeedArticlePayload =
                    transformOtdFeedResponse(key, response[key]);
                // extract data, yield put to storage
                if (transformedData.type !== ON_THIS_DAY_TOPICS.SELECTED) {
                    allArticles.push(transformedData);
                }
                yield put(setFeedArticles(transformedData));
            }
            // compile all the articles into a single tab
            const allArticleObj: ISetFeedArticlePayload =
                compileAllArticles(allArticles);

            yield put(setFeedArticles(allArticleObj));
        }
    } catch (e: unknown) {
        //Throw error here
        console.error(`Unable to initialize 'OnThisDay'! error:${e}`);
    } finally {
        yield put(setLoadState(false));
    }
}

function* fetchOnThisDayData(params: IFetchEventsDataPayload) {
    try {
        const completedQuery = buildOnThisDayQuery(
            params.type,
            params.day,
            params.month
        );
        console.log(`completed query:${completedQuery}`);
        let response: IOnThisDayResponse;
        if (isDev) {
            response = yield call(fetchURL, completedQuery);
        } else {
            response = yield call(
                fetchURL,
                completedQuery,
                undefined,
                undefined,
                {
                    headers: {
                        Authorization: WIKI_ACCESS_TOKEN,
                        "Api-User-Agent": WIKI_APP_AGENT,
                    },
                },
                undefined,
                ""
            );
        }
        return response;
    } catch (e) {
        console.error("Error encountered at 'fetchOnThisDayData Saga method'");
    }
}

function* fetchDayArticles(action: PayloadAction<IFetchEventsPayload>) {
    try {
        // trigger loadState
        yield put(setLoadState(true));
        //clear the current store
        yield put(clearFeedArticles());

        const {
            date: { month = 1, date = 1 },
        } = action.payload;

        const stringifiedMonth = (month + 1).toString().padStart(2, "0");
        const stringifiedDate = date.toString().padStart(2, "0");
        // let response: IOnThisDayResponse;

        // if (eventTypes.includes(ON_THIS_DAY_TOPICS.ALL)) {
        const response: IOnThisDayResponse = yield call(fetchOnThisDayData, {
            type: "all",
            month: stringifiedMonth,
            day: stringifiedDate,
        });
        // }
        // else {
        //     yield all(
        //         eventTypes.map((event) =>
        //             call(fetchOnThisDayData, {
        //                 type: event,
        //                 month: stringifiedMonth,
        //                 day: stringifiedDate,
        //             })
        //         )
        //     );
        // }
        // Parse the data
        if (!response) {
            // negative response - find case test
        } else {
            console.log(response);
            // Parse the information
            for (const key in response) {
                const transformedData: ISetFeedArticlePayload =
                    transformOtdFeedResponse(key, response[key]);
                // extract data, yield put to storage
                console.log(`Finished Parsing data: ${transformedData.type}`);
                console.log(transformedData);
                yield put(setFeedArticles(transformedData));
            }
        }
    } catch (e) {
        console.error("Error encountered in fetchDayArticles!");
        console.error(e);
    } finally {
        yield put(setLoadState(false));
    }
}
function* loadDetailedArticle(
    action: PayloadAction<ILoadArticleDetailPayload>
) {
    try {
        const { title = "", shouldClear = false } = action.payload;
        if (shouldClear) yield putResolve(clearDetailedArticle());

        const apiUrl: string = buildFullArticleQuery(title);
        let response: string;

        if (isDev) {
            response = yield call(fetchWebpage, apiUrl);
            // response = yield call(fetchWebpage, apiUrl);
        } else {
            response = yield call(
                fetchWebpage,
                apiUrl,
                undefined,
                undefined,
                undefined,
                ""
            );
        }
        if (response) {
            const pageId = retrievePageId(response);
            yield putResolve(
                setDetailedArticle({
                    pageId: pageId,
                    detailedArticle: response,
                })
            );
        } else throw Error(`unable to load article ${action.payload}`);
    } catch (e) {
        console.error("Error in loadSelectedArticle");
        console.error(e);
    }
}

function* loadBriefArticle(action: PayloadAction<string>) {
    try {
        const apiUrl: string = buildBriefArticleQuery(action.payload, "json");
        let response: IArticleBriefResponse;
        if (isDev) {
            response = yield call(fetchURL, apiUrl);
        } else {
            response = yield call(
                fetchURL,
                apiUrl,
                undefined,
                undefined,
                undefined,
                undefined,
                ""
            );
        }

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
    yield takeLeading(
        OnThisDaySummaryAction.FETCH_DATE_EVENTS,
        fetchDayArticles
    );
}

const onThisDaySummarySaga = fork(watchOnThisDaySummarySaga);
export default onThisDaySummarySaga;
