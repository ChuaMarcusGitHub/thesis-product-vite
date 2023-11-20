import { testSaga } from "redux-saga-test-plan";
import { OnThisDaySummaryAction } from "../../actions/OnThisDaySummaryActions";
import { otdSummarySagaTestObj } from "../OnThisDaySummarySaga";

describe("LoginSaga Suite", () => {
    const OLD_ENV = process.env;

    const {
        initializeOnThisDay,
        // fetchOnThisDayData,
        loadUserReadlist,
        fetchDayArticles,
        loadBriefArticle,
        loadDetailedArticleByPageId,
        loadDetailedArticle,
        triggerAnalyticsBeforeArticleLoad,
        clearModalProps,
        addToReadList,
        removeFromReadList,
        watchSummarySaga,
    } = otdSummarySagaTestObj;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });
    describe("watchSaga test", () => {
        test("WatchSaga Should be watching Sagas", () => {
            testSaga(watchSummarySaga)
                .next()
                .takeLeading(OnThisDaySummaryAction.INIT, initializeOnThisDay)
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE,
                    loadDetailedArticle
                )
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.LOAD_BRIEF_ARTICLE,
                    loadBriefArticle
                )
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.FETCH_DATE_EVENTS,
                    fetchDayArticles
                )
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.TRIGGER_ANALYTICS_WITH_ARTICLE,
                    triggerAnalyticsBeforeArticleLoad
                )
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.CLEAR_MODAL_PROPS,
                    clearModalProps
                )
                .next()
                .takeEvery(
                    OnThisDaySummaryAction.ADD_TO_READLIST,
                    addToReadList
                )
                .next()
                .takeEvery(
                    OnThisDaySummaryAction.REMOVE_FROM_READLIST,
                    removeFromReadList
                )
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.FETCH_USER_READLIST,
                    loadUserReadlist
                )
                .next()
                .takeLeading(
                    OnThisDaySummaryAction.LOAD_DETAILED_ARTICLE_PAGE_ID,
                    loadDetailedArticleByPageId
                )
                .next()
                .finish();
        });
    });
    
});
