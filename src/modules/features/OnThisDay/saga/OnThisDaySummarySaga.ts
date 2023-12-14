import {
    fetchURL,
    fetchWebpage,
} from "@modules/root/webservice/WebserviceUtils";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    all,
    call,
    fork,
    put,
    putResolve,
    select,
    takeEvery,
    takeLeading,
} from "redux-saga/effects";
import { analyticsInsertArticleData } from "@features/Common/Analytics/actions/AnalyticsActions";
import {
    clearBriefArticle,
    clearDetailedArticle,
    clearFeedArticles,
    OnThisDaySummaryAction,
    setBriefArticle,
    setDetailedArticle,
    setFeedArticles,
    setLoadState,
    setModalOpen,
    setModalProperties,
    updateReadListStore,
} from "../actions/OnThisDaySummaryActions";
import {
    ARTICLE_TYPE,
    IArticleBriefObject,
    IFetchEventsDataPayload,
    IFetchEventsPayload,
    ILoadArticleDetailPayload,
    IOtdCardPageData,
    IReadingCardData,
    IReadlistObject,
    ISetFeedArticlePayload,
    ON_THIS_DAY_TOPICS,
} from "../type/OnThisDayCommonTypes";
import {
    IArticleBriefResponse,
    IOnThisDayResponse,
    IAnalyticsDataArticlePayload,
    IArticleDetailResponse,
    OTD_ERROR_OBJECTS,
    OTD_ERROR_KEY,
    OTD_TOAST_MSG,
    OTD_MSG_OBJ,
    IReadlistCUDObject,
} from "../type/OnThisDayWebserviceTypes";
import {
    buildBriefArticleQuery,
    buildFullArticleQuery,
    buildFullArticleQueryByPageId,
    buildOnThisDayQuery,
    compileAllArticles,
    retrievePageId,
    transformBriefArticleObject,
    transformOtdFeedResponse,
} from "./OnThisDaySummarySagaUtils";
import { ISendArticleDataPayload } from "@features/Common/Analytics/types/AnalyticsPayloadTypes";
import {
    defaultModalProps,
    IContentDetailModalProps,
} from "../component/ContentComponent/ContentDetailModal";
import { getReadlist } from "../selector/OnThisDaySummarySelector";
import { supaFetchReadlist, supaUpdateReadList } from "./OTDSupabaseCalls";
import { getSessionUser } from "@src/modules/root/authprovider/selector/AuthSelector";
import { User } from "@supabase/supabase-js";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const WIKI_ACCESS_TOKEN = process.env.VITE_WIKI_ACCESS_TOKEN;
const WIKI_APP_AGENT = process.env.VITE_WIKI_APP_AGENT;
const isDev = process.env.DEV;

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
        toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.FETCH_ARTICLE]);
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
        console.error(
            "Error encountered at 'fetchOnThisDayData Saga method' :",
            e
        );
        toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.FETCH_ARTICLE]);
    }
}
function* loadUserReadlist(action: PayloadAction<string>) {
    try {
        // const userData: User = yield select(getSessionUser);
        const userData = action.payload;
        if (!userData) {
            return; // No watchlist because user not logged in
        }

        console.log("User detected - attempting login...");
        const readList: IReadlistCUDObject = yield call(
            supaFetchReadlist,
            userData
        );
        if (!readList) {
            // no readlist to transpose.
            return;
        }
        // readlist active
        console.log(readList);

        yield put(
            updateReadListStore(
                JSON.parse(JSON.stringify(readList.read_list_data))
            )
        );
    } catch (e) {
        console.error("Error Encountered at loadUserReadList:", e);
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
function* loadDetailedArticleByPageId(
    action: PayloadAction<ILoadArticleDetailPayload>
) {
    try {
        const { pageId = -1, shouldClear = false } = action.payload;
        if (shouldClear) yield putResolve(clearDetailedArticle());

        const apiUrl: string = buildFullArticleQueryByPageId(pageId);
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
        toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.LOAD_ARTICLE]);
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
        toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.LOAD_ARTICLE]);
    }
}

function* loadBriefArticle(action: PayloadAction<string>) {
    try {
        const title = action.payload || "";
        const apiUrl: string = buildBriefArticleQuery(title, "json");
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
            return briefArticle;
        } else {
            throw Error("Error in retreiving query from Wikipedia Extract");
        }
    } catch (e) {
        console.error("Error Encountered in loadBriefArticle Saga method");
        console.error(e);
        toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.LOAD_ARTICLE]);
    }
}

function* triggerAnalyticsBeforeArticleLoadImp(
    action: PayloadAction<IAnalyticsDataArticlePayload>
) {
    try {
        const {
            descriptionLength,
            eventType,
            pageData,
            articleType = ARTICLE_TYPE.BRIEF,
            onCloseHandler,
        } = action.payload;

        if (!pageData) {
            throw "pageData missing! Unable to continue!";
        }
        // There is data, open modal
        yield put(setModalOpen(true));
        const { tid, title, pageId }: IOtdCardPageData = pageData;

        let response: IArticleBriefResponse | IArticleDetailResponse;

        if (articleType === ARTICLE_TYPE.BRIEF) {
            response = yield call(loadBriefArticle, {
                type: OnThisDaySummaryAction.LOAD_BRIEF_ARTICLE,
                payload: title,
            });
        } else {
            response = yield call(loadDetailedArticle, {
                type: OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE,
                payload: { title: title, shouldClear: false },
            });
        }

        if (response) {
            // Perform Analysis update
            const analyticsData: ISendArticleDataPayload = {
                articleTitle: title,
                tid: tid || "--",
                articleId: pageId || -255,
                descriptionLength: descriptionLength,
                eventType: eventType,
            };
            yield put(analyticsInsertArticleData(analyticsData));

            // Build modal Data
            const modalProps: IContentDetailModalProps = {
                pageData: pageData,
                onClose: onCloseHandler,
                articleType: articleType,
            };

            yield put(setModalProperties(modalProps));
        } else {
            throw Error("Error in retreiving query from Wikipedia Extract");
        }
    } catch (e) {
        console.error("Error Encountered in loadBriefArticle Saga method");
        console.error(e);
    }
}
function* clearModalPropsImpl() {
    try {
        yield all([
            put(clearBriefArticle()),
            put(setModalProperties(defaultModalProps)),
            put(setModalOpen(false)),
        ]);
    } catch (e) {
        console.error("Error encountered in clearModalPropsImpl!");
    }
}

function* addToReadListImp(action: PayloadAction<IReadingCardData>) {
    try {
        if (!action.payload) throw "Payload missing!";

        // Check for userId
        const currentUser: User = yield select(getSessionUser);
        if (!currentUser) {
            //Toast
            toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.NOT_AUTHED]);
            throw "User not Authed / Logged in!";
        }

        // User Logged in, attempt to load data from existing reducer
        const newPage: IReadingCardData = action.payload;
        let finalList: IReadlistObject = {};
        const existingList: IReadlistObject = yield select(getReadlist);

        // Add new items
        finalList = { ...existingList, [newPage.pageId]: newPage };
        const { success, errorMessage } = yield call(
            supaUpdateReadList,
            currentUser.id,
            finalList
        );
        if (errorMessage) {
            toast(OTD_ERROR_OBJECTS[OTD_ERROR_KEY.READLIST_FAIL]);
            throw errorMessage;
        } else if (success && !errorMessage) {
            toast(OTD_MSG_OBJ[OTD_TOAST_MSG.READLIST_SUCCESS]);
        }

        // Update readlist in store
        yield put(updateReadListStore(finalList));
    } catch (e) {
        console.error("Error encountered in addToReadListImp: ", e);
    }
}

function* removeFromReadListImpl(action: PayloadAction<number>) {
    try {
        const pageId = action.payload;
        if (!pageId) throw `Invalid payload! PageId: ${pageId}`;

        // Payload Active
        const readList: IReadlistObject = yield select(getReadlist);
        const userData: User = yield select(getSessionUser);
        if (!readList || !userData.id) {
            console.error("ReadList: ", readList);
            throw `Missing data! user_id: ${
                userData.id
            } | readList: ${JSON.stringify(readList)}`;
        }

        const newReadList = { ...readList };
        delete newReadList[pageId];

        //Update DB Readlist
        const { success, errorMessage } = yield call(
            supaUpdateReadList,
            userData.id,
            newReadList
        );
        if (!success || errorMessage)
            throw `Error in CRUD Transaction :${errorMessage}`;

        // success in CRUD
        toast(OTD_MSG_OBJ[OTD_TOAST_MSG.REMOVE_PAGE_SUCCESS]);
        // Update in store
        yield put(updateReadListStore(newReadList));
    } catch (e) {
        console.error("Error encountered in removeFromReadListImpl: ", e);
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
    yield takeLeading(
        OnThisDaySummaryAction.TRIGGER_ANALYTICS_WITH_ARTICLE,
        triggerAnalyticsBeforeArticleLoadImp
    );
    yield takeLeading(
        OnThisDaySummaryAction.CLEAR_MODAL_PROPS,
        clearModalPropsImpl
    );
    yield takeEvery(OnThisDaySummaryAction.ADD_TO_READLIST, addToReadListImp);
    yield takeEvery(
        OnThisDaySummaryAction.REMOVE_FROM_READLIST,
        removeFromReadListImpl
    );
    yield takeLeading(
        OnThisDaySummaryAction.FETCH_USER_READLIST,
        loadUserReadlist
    );
    yield takeLeading(
        OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE_PAGE_ID,
        loadDetailedArticleByPageId
    );
}
const otdSummarySagaTestObj = {
    initializeOnThisDay: initializeOnThisDay,
    fetchOnThisDayData: fetchOnThisDayData,
    loadUserReadlist: loadUserReadlist,
    fetchDayArticles: fetchDayArticles,
    loadBriefArticle: loadBriefArticle,
    loadDetailedArticleByPageId: loadDetailedArticleByPageId,
    loadDetailedArticle: loadDetailedArticle,
    triggerAnalyticsBeforeArticleLoad: triggerAnalyticsBeforeArticleLoadImp,
    clearModalProps: clearModalPropsImpl,
    addToReadList: addToReadListImp,
    removeFromReadList: removeFromReadListImpl,
    watchSummarySaga: watchOnThisDaySummarySaga,
};
export { otdSummarySagaTestObj };

const onThisDaySummarySaga = fork(watchOnThisDaySummarySaga);
export default onThisDaySummarySaga;
