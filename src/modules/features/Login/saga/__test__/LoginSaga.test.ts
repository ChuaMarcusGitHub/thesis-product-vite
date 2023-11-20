import { IDatabaseCUDResponse } from "@src/modules/features/Common/Supabase/SupabaseCommonTypes";
import { signUpSession } from "@src/modules/root/authprovider/actions/AuthActions";
import { ICRUDResponse } from "@src/modules/root/authprovider/types/AuthSessionTypes";
import { testSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import {
    LoginActions,
    setSignupErrors,
    setUserStats,
} from "../../actions/LoginActions";
import {
    IDbUserStats,
    IUserDatabaseEntryPayload,
    IUserSignupPayload,
    IUserStats,
} from "../../types/LoginActionPayloadTypes";
import { LoginErrorTypes } from "../../types/LoginComponentTypes";
import { testLoginSagaObj } from "../LoginSaga";
import {
    supaGetEmailExist,
    supaGetUsernameExists,
    supaGetUserStats,
    supaUpdateUserStats,
    updateStatsUsername,
    updateUserSecUsername,
} from "../LoginSagaSupabaseCalls";
import { transformUserStats } from "../LoginSagaUtils";

describe("LoginSaga Suite", () => {
    const OLD_ENV = process.env;

    const {
        watchLoginSaga,
        getUserStats,
        updateUserStats,
        userSignup,
        setupUserEntry,
        handleSignupResponseArray,
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

    describe("getUserStats Test", () => {
        const mockUserId = "100--an123";
        const mockResponse: IDbUserStats = {
            username: "mockUser",
            user_id: mockUserId,
            articles_read: 0,
            time_spent: 999,
        };

        test("Invalid/Missing userId should throw error", () => {
            const invalidLoad = "";
            testSaga(getUserStats, {
                type: LoginActions.GET_USER_STATS,
                payload: invalidLoad,
            })
                .next(invalidLoad)
                .finish();
        });

        test("get invalid response should throw error", () => {
            const invalidResponse = null;

            testSaga(getUserStats, {
                type: LoginActions.GET_USER_STATS,
                payload: mockUserId,
            })
                .next()
                .call(supaGetUserStats, mockUserId)
                .next(invalidResponse)
                .finish();
        });

        test("get invalid response should store in state", () => {
            const transformedUserStats = transformUserStats(mockResponse);
            testSaga(getUserStats, {
                type: LoginActions.GET_USER_STATS,
                payload: mockUserId,
            })
                .next()
                .call(supaGetUserStats, mockUserId)
                .next(mockResponse)
                .put(setUserStats(transformedUserStats))
                .next(transformedUserStats)
                .finish();
        });
    });

    describe("updateUserStatsDb test suite", () => {
        const mockUpdateStats: IUserStats = {
            userId: "mock-is123-id",
            username: "mockUsername",
            articlesRead: 10,
            timeSpent: 281.11,
        };
        test("unSuccess should call not store value", () => {
            const invalidResponse: ICRUDResponse = {
                success: false,
                errorMessage: "mock error msg",
            };
            testSaga(updateUserStats, {
                type: LoginActions.UPDATE_USER_STATS_DB,
                payload: mockUpdateStats,
            })
                .next(mockUpdateStats)
                .call(supaUpdateUserStats, mockUpdateStats)
                .next(invalidResponse)
                .finish();
        });

        test("Success should call store value", () => {
            const mockResponse: ICRUDResponse = {
                success: true,
                errorMessage: "",
            };
            const truncMockStats: IUserStats = {
                articlesRead: 10,
                timeSpent: 281.11,
            };
            testSaga(updateUserStats, {
                type: LoginActions.UPDATE_USER_STATS_DB,
                payload: mockUpdateStats,
            })
                .next(mockUpdateStats)
                .call(supaUpdateUserStats, mockUpdateStats)
                .next(mockResponse)
                .put(setUserStats(truncMockStats))
                .next(truncMockStats)
                .finish();
        });
    });

    describe("userSignUp test suite", () => {
        test("userSignup should put error if password details missing", () => {
            const userPayload: IUserSignupPayload = {
                email: "mock@email.com",
                username: "mockUsername",
                password: "",
            };

            testSaga(userSignup, {
                type: LoginActions.USER_SIGNUP,
                payload: userPayload,
            })
                .next({ type: LoginActions.USER_SIGNUP, payload: userPayload })
                .putResolve(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]))
                .next(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]))
                .finish();
        });
        test("userSignup should put error if email details missing", () => {
            const userPayload: IUserSignupPayload = {
                email: "",
                username: "mockUsername",
                password: "mockPassword",
            };

            testSaga(userSignup, {
                type: LoginActions.USER_SIGNUP,
                payload: userPayload,
            })
                .next({ type: LoginActions.USER_SIGNUP, payload: userPayload })
                .putResolve(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]))
                .next(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]))
                .finish();
        });
        test("userSignup should put error if username details missing", () => {
            const userPayload: IUserSignupPayload = {
                email: "mock@email.com",
                username: "",
                password: "mockPassword",
            };

            testSaga(userSignup, {
                type: LoginActions.USER_SIGNUP,
                payload: userPayload,
            })
                .next({ type: LoginActions.USER_SIGNUP, payload: userPayload })
                .putResolve(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]))
                .next(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]))
                .finish();
        });
        test("userSignup should put call handleSignupResponse Array if both Reponses have error", () => {
            const userPayload: IUserSignupPayload = {
                email: "mock@email.com",
                username: "mockUsername",
                password: "mockPassword",
            };

            const mockResponseArray = [true, true];

            testSaga(userSignup, {
                type: LoginActions.USER_SIGNUP,
                payload: userPayload,
            })
                .next({ type: LoginActions.USER_SIGNUP, payload: userPayload })
                .all([
                    call(supaGetUsernameExists, userPayload.username),
                    call(supaGetEmailExist, userPayload.email),
                ])
                .next(mockResponseArray)
                .call(handleSignupResponseArray, mockResponseArray)
                .next()
                .finish();
        });
        test("userSignup should put call handleSignupResponse Array if either Reponses have error", () => {
            const userPayload: IUserSignupPayload = {
                email: "mock@email.com",
                username: "mockUsername",
                password: "mockPassword",
            };

            const mockResponseArray = [false, true];

            testSaga(userSignup, {
                type: LoginActions.USER_SIGNUP,
                payload: userPayload,
            })
                .next({ type: LoginActions.USER_SIGNUP, payload: userPayload })
                .all([
                    call(supaGetUsernameExists, userPayload.username),
                    call(supaGetEmailExist, userPayload.email),
                ])
                .next(mockResponseArray)
                .call(handleSignupResponseArray, mockResponseArray)
                .next()
                .finish();
        });
        test("userSignup should put call handleSignupResponse Array if either Reponses have error", () => {
            const userPayload: IUserSignupPayload = {
                email: "mock@email.com",
                username: "mockUsername",
                password: "mockPassword",
            };

            const mockResponseArray = [false, false];

            testSaga(userSignup, {
                type: LoginActions.USER_SIGNUP,
                payload: userPayload,
            })
                .next({ type: LoginActions.USER_SIGNUP, payload: userPayload })
                .all([
                    call(supaGetUsernameExists, userPayload.username),
                    call(supaGetEmailExist, userPayload.email),
                ])
                .next(mockResponseArray)
                .putResolve(signUpSession(userPayload))
                .next()
                .finish();
        });
    });

    describe("handleSignupResponseArray TestSuite", () => {
        test("handleSignupArray should push error if user taken error is true", () => {
            const mockResponseArray = [true, false];
            const mockErrorList = [LoginErrorTypes.USERNAME_TAKEN];
            testSaga(handleSignupResponseArray, mockResponseArray)
                .next(mockResponseArray)
                .put(setSignupErrors(mockErrorList))
                .next(mockErrorList)
                .finish();
        });
        test("handleSignupArray should push error if email taken error is true", () => {
            const mockResponseArray = [false, true];
            const mockErrorList = [LoginErrorTypes.EMAIL_IN_USE];
            testSaga(handleSignupResponseArray, mockResponseArray)
                .next(mockResponseArray)
                .put(setSignupErrors(mockErrorList))
                .next(mockErrorList)
                .finish();
        });

        test("handleSignupArray should push errors if both user and email taken error is true", () => {
            const mockResponseArray = [true, true];
            const mockErrorList = [
                LoginErrorTypes.USERNAME_TAKEN,
                LoginErrorTypes.EMAIL_IN_USE,
            ];
            testSaga(handleSignupResponseArray, mockResponseArray)
                .next(mockResponseArray)
                .put(setSignupErrors(mockErrorList))
                .next(mockErrorList)
                .finish();
        });
    });

    describe("setupUserEntry test suite", () => {
        const userPayload: IUserDatabaseEntryPayload = {
            email: "mock@email.com",
            username: "mockUsername",
            uid: "mockUid",
        };

        test("no setup if userEntry is missing email", () => {
            const mockMissingEmail: IUserDatabaseEntryPayload = {
                ...userPayload,
                email: "",
            };
            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: mockMissingEmail,
            })
                .next(userPayload)
                .finish();
        });
        test("no setup if userEntry is missing username", () => {
            const mockMissingUser: IUserDatabaseEntryPayload = {
                ...userPayload,
                username: "",
            };
            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: mockMissingUser,
            })
                .next(mockMissingUser)
                .finish();
        });
        test("no setup if userEntry is missing uid", () => {
            const mockMissingUid: IUserDatabaseEntryPayload = {
                ...userPayload,
                uid: "",
            };
            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: mockMissingUid,
            })
                .next(mockMissingUid)
                .finish();
        });
        test("if any CRUDResponse invalid_fail_stats, don't proceed", () => {
            const { uid = "", username = "" } = userPayload;
            const response: IDatabaseCUDResponse[] = [
                { success: false, errorMessage: "Failure 1" },
                { success: true, errorMessage: "" },
            ];
            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: userPayload,
            })
                .next(userPayload)
                .all([
                    call(updateStatsUsername, uid, username),
                    call(updateUserSecUsername, uid, username),
                ])
                .next(response)
                .finish();
        });
        test("if any CRUDResponse invalid_failUser, don't proceed", () => {
            const { uid = "", username = "" } = userPayload;
            const response: IDatabaseCUDResponse[] = [
                { success: true, errorMessage: "" },
                { success: false, errorMessage: "Failure 2" },
            ];
            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: userPayload,
            })
                .next(userPayload)
                .all([
                    call(updateStatsUsername, uid, username),
                    call(updateUserSecUsername, uid, username),
                ])
                .next(response)
                .finish();
        });

        test("if any CRUDResponse fails at fetch stats, dont proceed", () => {
            const { uid = "", username = "" } = userPayload;
            const response: IDatabaseCUDResponse[] = [
                { success: true, errorMessage: "" },
                { success: true, errorMessage: "" },
            ];

            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: userPayload,
            })
                .next(userPayload)
                .all([
                    call(updateStatsUsername, uid, username),
                    call(updateUserSecUsername, uid, username),
                ])
                .next(response)
                .call(supaGetUserStats, uid)
                .next(null)
                .finish();
        });

        test("Happy flow - userstats get updated to store once acc creation is success", () => {
            const { uid = "", username = "" } = userPayload;
            const response: IDatabaseCUDResponse[] = [
                { success: true, errorMessage: "" },
                { success: true, errorMessage: "" },
            ];
            const mockUserStats: IDbUserStats = {
                articles_read: 10,
                time_spent: 88.8,
            };
            testSaga(setupUserEntry, {
                type: LoginActions.SETUP_USER_ENTRY,
                payload: userPayload,
            })
                .next(userPayload)
                .all([
                    call(updateStatsUsername, uid, username),
                    call(updateUserSecUsername, uid, username),
                ])
                .next(response)
                .call(supaGetUserStats, uid)
                .next(mockUserStats)
                .put(setUserStats(transformUserStats(mockUserStats)))
                .finish();
        });
    });
});
