import { testSaga } from "redux-saga-test-plan";
import { LoginActions } from "../../actions/LoginActions";
import { testLoginSagaObj } from "../LoginSaga";

describe("LoginSaga Suite", () => {
    const OLD_ENV = process.env;

    const {
        watchLoginSaga,
        getUserStats,
        updateUserStats,
        userSignup,
        setupUserEntry,
    } = testLoginSagaObj;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });
    describe("watchSaga test", () => {
        test("WatchSaga Should be watching Sagas", () => {
            testSaga(watchLoginSaga)
                .next()
                .takeLatest(LoginActions.GET_USER_STATS, getUserStats)
                .next()
                .takeLatest(LoginActions.UPDATE_USER_STATS_DB, updateUserStats)
                .next()
                .takeLatest(LoginActions.USER_SIGNUP, userSignup)
                .next()
                .takeLatest(LoginActions.SETUP_USER_ENTRY, setupUserEntry);
        });
    });
});
